

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const ANIMATION_DURATION_SECONDS = 15
const GRID_HEIGHT_RATIO = 3
const GRID_WIDTH_RATIO = 6
const GRID_START_OFFSET_RATIO = -0.5
const GRID_X_OFFSET_RATIO = -2
const PERSPECTIVE_PX = 200

const VERTEX_SHADER = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_angle;
uniform float u_cell_size;

const float perspectivePx = 200.0;
const float gridHeightRatio = 3.0;
const float gridWidthRatio = 6.0;
const float gridStartOffsetRatio = -0.5;
const float gridXOffsetRatio = -2.0;
const float animationDuration = 15.0;

void main() {
  float angle = radians(clamp(u_angle, 1.0, 89.0));

  vec2 screen = vec2(
    gl_FragCoord.x - u_resolution.x * 0.5,
    u_resolution.y * 0.5 - gl_FragCoord.y
  );

  vec3 rayOrigin = vec3(0.0, 0.0, perspectivePx);
  vec3 rayDirection = normalize(vec3(screen, -perspectivePx));

  vec3 planeXAxis = vec3(1.0, 0.0, 0.0);
  vec3 planeYAxis = vec3(0.0, cos(angle), sin(angle));
  vec3 planeNormal = normalize(cross(planeXAxis, planeYAxis));

  float denominator = dot(rayDirection, planeNormal);

  if (abs(denominator) < 0.0001) {
    discard;
  }

  float distanceToPlane = dot(-rayOrigin, planeNormal) / denominator;

  if (distanceToPlane <= 0.0) {
    discard;
  }

  vec3 hitPoint = rayOrigin + rayDirection * distanceToPlane;

  float localX = hitPoint.x;
  float localY = dot(hitPoint, planeYAxis);

  float gridWidth = u_resolution.x * gridWidthRatio;
  float gridHeight = u_resolution.y * gridHeightRatio;

  float gridLeft =
    (-0.5 * u_resolution.x) +
    (gridXOffsetRatio * u_resolution.x);

  float gridTop =
    (-0.5 * u_resolution.y) +
    (gridStartOffsetRatio * gridHeight);

  vec2 planePosition = vec2(
    localX - gridLeft,
    localY - gridTop
  );

  if (
    planePosition.x < 0.0 ||
    planePosition.y < 0.0 ||
    planePosition.x > gridWidth ||
    planePosition.y > gridHeight
  ) {
    discard;
  }

  float cellSize = max(u_cell_size, 1.0);

  float scrollSpeed =
    (gridHeight * 0.5) / animationDuration;

  float scrollOffset = u_time * scrollSpeed;

  vec2 patternPosition = vec2(
    planePosition.x,
    planePosition.y - scrollOffset
  );

  vec2 wrapped = mod(patternPosition, cellSize);

  vec2 derivatives = max(
    fwidth(patternPosition),
    vec2(0.0001)
  );

  float lineWidth = 0.9;

  float verticalLine =
    1.0 - smoothstep(
      lineWidth,
      lineWidth + derivatives.x * 2.0,
      wrapped.x
    );

  float horizontalLine =
    1.0 - smoothstep(
      lineWidth,
      lineWidth + derivatives.y * 2.0,
      wrapped.y
    );

  float line = max(verticalLine, horizontalLine);

  float distanceFade = smoothstep(
    0.0,
    0.5,
    planePosition.y / gridHeight
  );

  float alpha = line * 0.85 * distanceFade;

  if (alpha <= 0.001) {
    discard;
  }

  vec3 purple = vec3(0.78, 0.27, 0.97);

  gl_FragColor = vec4(purple * alpha, alpha);
}
`

interface RetroGridProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  angle?: number
  cellSize?: number
  opacity?: number
  lightLineColor?: string
  darkLineColor?: string
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type)

  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    VERTEX_SHADER
  )

  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    FRAGMENT_SHADER
  )

  if (!vertexShader || !fragmentShader) return null

  const program = gl.createProgram()

  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }

  return program
}

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 65,
  opacity = 0.85,
  style,
  ...props
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [webglReady, setWebglReady] = useState(false)

  const angleRef = useRef(angle)
  const cellSizeRef = useRef(cellSize)

  useEffect(() => {
    angleRef.current = angle
    cellSizeRef.current = cellSize
  }, [angle, cellSize])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) return

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    })

    if (!gl || !gl.getExtension("OES_standard_derivatives")) {
      setWebglReady(false)
      return
    }

    const program = createProgram(gl)

    if (!program) return

    const buffer = gl.createBuffer()

    if (!buffer) return

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        3, -1,
        -1, 3,
      ]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(
      program,
      "a_position"
    )

    const resolutionLocation = gl.getUniformLocation(
      program,
      "u_resolution"
    )

    const timeLocation = gl.getUniformLocation(
      program,
      "u_time"
    )

    const angleLocation = gl.getUniformLocation(
      program,
      "u_angle"
    )

    const cellSizeLocation = gl.getUniformLocation(
      program,
      "u_cell_size"
    )

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )

    let animationFrame = 0
    let width = 0
    let height = 0
    let visible = true

    const resize = () => {
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
      )

      width = container.clientWidth
      height = container.clientHeight

      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      )

      draw(performance.now())
    }

    const draw = (timestamp: number) => {
      if (!width || !height) return

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
      )

      gl.useProgram(program)

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

      gl.enableVertexAttribArray(positionLocation)

      gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      )

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
      )

      gl.uniform1f(
        timeLocation,
        reducedMotion.matches ? 0 : timestamp / 1000
      )

      gl.uniform1f(
        angleLocation,
        angleRef.current
      )

      gl.uniform1f(
        cellSizeLocation,
        cellSizeRef.current * pixelRatio
      )

      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const animate = (timestamp: number) => {
      draw(timestamp)

      if (!reducedMotion.matches && visible) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const startAnimation = () => {
      cancelAnimationFrame(animationFrame)

      if (!reducedMotion.matches && visible) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting

        if (visible) {
          startAnimation()
        } else {
          cancelAnimationFrame(animationFrame)
        }
      }
    )

    intersectionObserver.observe(container)

    const handleMotionChange = () => {
      startAnimation()
    }

    reducedMotion.addEventListener(
      "change",
      handleMotionChange
    )

    resize()

    setWebglReady(true)
    startAnimation()

    return () => {
      cancelAnimationFrame(animationFrame)

      resizeObserver.disconnect()
      intersectionObserver.disconnect()

      reducedMotion.removeEventListener(
        "change",
        handleMotionChange
      )

      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  const gridStyles: CSSProperties = {
    ...style,
    opacity,
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 size-full overflow-hidden",
        className
      )}
      style={{
        background: "#080510",
        ...gridStyles,
      }}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 48%,
              rgba(199, 85, 247, 0.20) 0%,
              rgba(117, 37, 184, 0.13) 35%,
              transparent 72%
            )
          `,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              #080510 0%,
              transparent 30%,
              transparent 65%,
              rgba(8, 5, 16, 0.25) 100%
            )
          `,
        }}
      />

      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 size-full",
          webglReady ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to top,
              #080510 0%,
              rgba(8, 5, 16, 0.65) 25%,
              transparent 90%
            )
          `,
        }}
      />
    </div>
  )
}

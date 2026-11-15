
import { useEffect, useRef } from "react";
import "./GreenShader.css";

export default function GreenShader() {
  const shaderRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const shader = shaderRef.current;

      if (!shader) return;

      const rect = shader.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      shader.style.setProperty("--mouse-x", `${x}%`);
      shader.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="green-shader" ref={shaderRef} aria-hidden="true">
      <div className="shader-orb shader-orb-one" />
      <div className="shader-orb shader-orb-two" />
      <div className="shader-orb shader-orb-three" />
      <div className="shader-mouse-glow" />
      <div className="shader-noise" />
    </div>
  );
}

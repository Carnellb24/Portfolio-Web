
import { lazy, Suspense } from "react";
import "./App.css";

import CRTWarp from "./component/CRTWarp";
import Shuffle from "./component/Shuffle";
import BubbleMenu from "./component/BubbleMenu";
import DecryptedText from "./component/DecryptedText";
import BorderGlow from "./component/BorderGlow";
import LetterGlitch from "./component/LetterGlitch";
import AboutFeatures from "./component/AboutFeatures";
import { RetroGrid } from "@/components/ui/retro-grid";
import StatsDashboard from "./component/StatsDashboard";
import ContactSection from "./component/ContactSection";
import Footer from "./component/Footer";

// Load heavier interactive components only when needed.
const Lanyard = lazy(() => import("./component/Lanyard"));
const DiscCascadeCarousel = lazy(
  () => import("./component/DiscCascadeCarousel")
);

function App() {
  return (
    <main>
      <section className="hero" id="home">
        {/* Background */}
        <div className="hero-background">
          <CRTWarp
            color="#c755f7"
            backgroundColor="#08080f"
            speed={0.5}
            curvature={0.25}
            scanlineStrength={0.6}
            bloom={1.5}
            mouseReact={false}
            changeOnClick={false}
          />
        </div>

        {/* Navigation */}
        <BubbleMenu
          logo={null}
          items={[
            {
              label: "START",
              href: "#home",
              ariaLabel: "Go to Home",
              rotation: -8,
              hoverStyles: {
                bgColor: "#c755f7",
                textColor: "#ffffff",
              },
            },
            {
              label: "PLAYER",
              href: "#about",
              ariaLabel: "Go to About",
              rotation: 8,
              hoverStyles: {
                bgColor: "#F5A623",
                textColor: "#ffffff",
              },
            },
            {
              label: "BUILDS",
              href: "#projects",
              ariaLabel: "Go to Projects",
              rotation: -8,
              hoverStyles: {
                bgColor: "#E5C84B",
                textColor: "#ffffff",
              },
            },
            {
              label: "STATS",
              href: "#skills",
              ariaLabel: "Go to Skills",
              rotation: 8,
              hoverStyles: {
                bgColor: "#39B96B",
                textColor: "#ffffff",
              },
            },
            {
              label: "CONNECT",
              href: "#contact",
              ariaLabel: "Go to Contact",
              rotation: -8,
              hoverStyles: {
                bgColor: "#398BE8",
                textColor: "#ffffff",
              },
            },
          ]}
          menuBg="#171322"
          menuContentColor="#ffffff"
          useFixedPosition={true}
          animationDuration={0.5}
          staggerDelay={0.12}
        />

        {/* Lanyard */}
        <div className="hero-lanyard">
          <Suspense fallback={null}>
            <Lanyard
              frontImage="/images/lanyard-front.png"
              orientation="portrait"
              imageFit="contain"
              size={0.7}
            />
          </Suspense>
        </div>

        {/* Hero text and BorderGlow frame */}
        <div className="hero-content">
          <BorderGlow
            className="hero-text-card"
            glowColor="280 90 70"
            backgroundColor="#100B1A"
            borderRadius={18}
            glowRadius={25}
            glowIntensity={1.2}
            animated={true}
            colors={["#c755f7", "#8b5cf6", "#c755f7"]}
            fillOpacity={0.15}
          >
            <div className="hero-text-inner">
              <h1>
                <Shuffle
                  text="Carnell Butler"
                  tag="span"
                  textAlign="center"
                  effect="blur"
                  shuffleDirection="up"
                  duration={1.5}
                  animationMode="center"
                  shuffleTimes={14}
                  ease="expo.out"
                  stagger={0.06}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover
                  hoverRadius={0}
                  motionBlur={false}
                  respectReducedMotion={false}
                  maxDelay={0}
                  scrambleCharset="0123456789#%&*+=?"
                  loop={false}
                  loopDelay={0}
                />
              </h1>

              <p>
                <DecryptedText
                  text="I'm a software engineering student and creative builder with a passion for technology, game design, and bringing ideas to life through code."
                  animateOn="view"
                  revealDirection="start"
                  speed={40}
                  maxIterations={12}
                  sequential
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*"
                  className="dycrypted-char"
                  encryptedClassName="encrypted-char"
                  parentClassName="decrypted-text"
                  scrambleColor="#ffffff"
                />
              </p>

              <a href="#about" className="explore-button">
                <span>PRESS START</span>
              </a>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* ABOUT / PLAYER SECTION */}
      <section className="about" id="about">
        <div className="about-background">
          <LetterGlitch
            glitchColors={["#F5A623", "#A5A5B2"]}
            baseColor="#08080f"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            fontSize={16}
            density={0.9}
            speed={1}
            smooth
            interactive={false}
          />
        </div>

        <div className="about-content">
          <AboutFeatures />
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects" id="projects">
        <RetroGrid
          angle={65}
          cellSize={65}
          opacity={0.8}
          lightLineColor="#C755F7"
          darkLineColor="#C755F7"
        />

        <div className="projects-content">
          <Suspense fallback={null}>
            <DiscCascadeCarousel
              items={[
                {
                  title: "JobSwipe",
                  githubUrl: "https://github.com/Carnellb24/Jobswipe",
                  pattern: "sunburst",
                  palette: ["#241044", "#C755F7", "#F5A623"],
                  credits: [
                    {
                      label: "FOCUS",
                      value: "Job Discovery & Matching",
                    },
                    {
                      label: "STACK",
                      value: "Python / Streamlit / SQLite",
                    },
                    {
                      label: "STATUS",
                      value: "In Development",
                    },
                  ],
                },
                {
                  title: "EndpointAPI",
                  githubUrl: "https://github.com/Carnellb24/EndpointAPI",
                  pattern: "eclipse",
                  palette: ["#101C35", "#55A6F7", "#B8D9FF"],
                  credits: [
                    {
                      label: "FOCUS",
                      value: "Python API Testing Framework",
                    },
                    {
                      label: "STACK",
                      value: "Python / pytest / Requests",
                    },
                    {
                      label: "STATUS",
                      value: "In Development",
                    },
                  ],
                },
                {
                  title: "WebFly",
                  githubUrl: "https://github.com/Carnellb24/Webfly",
                  pattern: "horizon",
                  palette: ["#142D29", "#55D6A5", "#F5D77A"],
                  credits: [
                    {
                      label: "FOCUS",
                      value: "Browser Automation & Testing",
                    },
                    {
                      label: "STACK",
                      value: "Python / Playwright / pytest",
                    },
                    {
                      label: "STATUS",
                      value: "In Development",
                    },
                  ],
                },
                {
                  title: "DataGuard",
                  githubUrl: "https://github.com/Carnellb24/DataGuard",
                  pattern: "rings",
                  palette: ["#32152D", "#E66BAA", "#FFC5DC"],
                  credits: [
                    {
                      label: "FOCUS",
                      value: "Database Validation Pipeline",
                    },
                    {
                      label: "STACK",
                      value: "Python / PostgreSQL / SQL / pytest",
                    },
                    {
                      label: "STATUS",
                      value: "In Development",
                    },
                  ],
                },
              ]}
              height="100vh"
              discSize="clamp(260px, 48vw, 560px)"
              defaultIndex={0}
              details={true}
              reviews={false}
              controls={true}
              autoplay={0}
              spin={24}
              brand="Project Gallary"
              background="transparent"
              color="#F5EFFB"
              serif='"Instrument Serif", Georgia, serif'
              sans='"Inter", sans-serif'
              display='"Oswald", Impact, sans-serif'
              hint="DRAG TO EXPLORE"
            />
          </Suspense>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills">
        <StatsDashboard />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}

export default App;

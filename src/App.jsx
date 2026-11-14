import "./App.css";
import CRTWarp from "./component/CRTWarp";
import Shuffle from './component/Shuffle';
import Lanyard from "./component/Lanyard";
import BubbleMenu from "./component/BubbleMenu";
import DecryptedText from "./component/DecryptedText";
import BorderGlow from "./component/BorderGlow";
import LetterGlitch from "./component/LetterGlitch";
import ProfileCard from "./component/ProfileCard";
import AboutFeatures from "./component/AboutFeatures";

function App() {
  return (
    <main>
      <section className="hero" id="home">
        {/*Backgroud will go here*/}
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
          logo={
            <span className="nav-logo">
              CARNELL BUTLER
            </span>
          }
          items={[
            {
              label: "START",
              href: "#home",
              ariaLabel: "Go to Home",
              rotation: -8,
              hoverStyles: {
                bgColor: "#c755f7",
                textColor: "#ffffff"
              }
            },
            {
              label: "PLAYER",
              href: "#about",
              ariaLabel: "Go to About",
              rotation: 8,
              hoverStyles: {
                bgColor: "#F5A623",
                textColor: "#ffffff"
              }
            },
            {
              label: "BUILDS",
              href: "#projects",
              ariaLabel: "Go to Projects",
              rotation: -8,
              hoverStyles: {
                bgColor: "#E5C84B",
                textColor: "#ffffff"
              }
            },
            {
              label: "STATS",
              href: "#skills",
              ariaLabel: "Go to Skills",
              rotation: 8,
              hoverStyles: {
                bgColor: "#39B96B",
                textColor: "#ffffff"
              }
            },
            {
              label: "CONNECT",
              href: "#contact",
              ariaLabel: "Go to Contact",
              rotation: -8,
              hoverStyles: {
                bgColor: "#398BE8",
                textColor: "#ffffff"
              }
            }
          ]}
          menuBg="#171322"
          menuContentColor="#ffffff"
          useFixedPosition={true}
          animationDuration={0.5}
          staggerDelay={0.12}
        />

        {/*Lanyard left side alignment code */}
        <div className="hero-lanyard">
          <Lanyard
            frontImage="/images/lanyard-front.png"
            orientation="portrait"
            imageFit="contain"
            size={0.7}
          />
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
        {/* Letter Glitch Background */}
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
        {/* About Content */}
        <div className="about-content">
          <AboutFeatures />
        </div>
      </section>
    </main>
  );
}

export default App;

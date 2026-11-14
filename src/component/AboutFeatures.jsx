
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./AboutFeatures.css";

const FEATURES = [
  {
    number: "01",
    title: "SOFTWARE ENGINEERING",
    description:
      "Building applications, solving problems, and turning ideas into functional software.",
    detail: "I enjoy developing practical solutions and continuously expanding my programming skills.",
    icon: "⌘",
  },
  {
    number: "02",
    title: "GAME DESIGN",
    description:
      "Creating interactive experiences, mechanics, stories, and immersive worlds.",
    detail: "From tabletop adventures to digital experiences, I love designing worlds people can explore.",
    icon: "✦",
  },
  {
    number: "03",
    title: "CREATIVE DEVELOPMENT",
    description:
      "Combining creativity and technology to bring original ideas to life.",
    detail: "I enjoy experimenting with new concepts and building projects that reflect my imagination.",
    icon: "◈",
  },
  {
    number: "04",
    title: "TECHNOLOGY",
    description:
      "Exploring new tools, emerging technologies, and different ways to build.",
    detail: "I'm always curious about how technology works and how it can be used to solve real problems.",
    icon: "⌁",
  },
  {
    number: "05",
    title: "MY JOURNEY",
    description:
      "Growing as a developer through learning, experimentation, and hands-on projects.",
    detail: "Every project is an opportunity to learn something new and become a better engineer.",
    icon: "↗",
  },
  {
    number: "06",
    title: "BEYOND THE CODE",
    description:
      "The interests, hobbies, and experiences that shape who I am as a creator.",
    detail: "I draw inspiration from games, storytelling, design, and the world around me.",
    icon: "◎",
  },
];

function AboutFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  const active = FEATURES[activeFeature];

  return (
    <section className="about-features">
      <div className="about-features-header">
        <span className="about-eyebrow">GET TO KNOW ME / 001</span>

        <h2>BEYOND THE CODE.</h2>

        <p>
          A little about what I create, what I enjoy,
          and what drives me to keep building.
        </p>
      </div>

      <div className="about-feature-layout">
        <div className="about-feature-grid">
          {FEATURES.map((feature, index) => (
            <motion.button
              key={feature.number}
              className={`about-feature ${
                activeFeature === index ? "active" : ""
              }`}
              onMouseEnter={() => setActiveFeature(index)}
              onFocus={() => setActiveFeature(index)}
              onClick={() => setActiveFeature(index)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="feature-number">
                {feature.number}
              </span>

              <span className="feature-icon">
                {feature.icon}
              </span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="feature-arrow">↗</span>
            </motion.button>
          ))}
        </div>

        <div className="about-feature-detail" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.number}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <span className="detail-number">
                FEATURE / {active.number}
              </span>

              <h3>{active.title}</h3>

              <p>{active.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default AboutFeatures;


import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactSection.css";

const projectTypes = [
  "Web Development",
  "Backend / API",
  "Automation",
  "Testing",
  "Collaboration",
  "Other",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const toggleProjectType = (type) => {
    const selectedTypes = formData.title
      ? formData.title.split(", ")
      : [];

    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((item) => item !== type)
      : [...selectedTypes, type];

    setFormData((previous) => ({
      ...previous,
      title: updatedTypes.join(", "),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        title: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-intro">
          <span className="contact-eyebrow">
            PLAYER CONNECTION // 005
          </span>

          <h2>
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span>TOGETHER.</span>
          </h2>

          <p>
            Have a project in mind, want to collaborate, or
            just want to connect? Send me a message. I'd love
            to hear what you're working on.
          </p>

          <div className="contact-email">
            <span>EMAIL ME DIRECTLY</span>
            <a href="mailto:carnellbutler.projects@gmail.com">
              carnellbutler.projects@gmail.com
            </a>
          </div>

          <div className="contact-socials">
            <span>FIND ME ONLINE</span>

            <div className="contact-social-links">
              <a
                href="https://github.com/Carnellb24"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <div className="contact-form-heading">
            <span>TRANSMISSION TERMINAL</span>
            <p>Send a message directly to my inbox.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="contact-name">YOUR NAME</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-email">YOUR EMAIL</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>WHAT ARE YOU REACHING OUT ABOUT?</label>

            <div className="contact-project-types">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={
                    formData.title.split(", ").includes(type)
                      ? "project-type active"
                      : "project-type"
                  }
                  onClick={() => toggleProjectType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <label htmlFor="contact-message">YOUR MESSAGE</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me a little about what you have in mind..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />

            <button
              className="contact-submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "SENDING..."
                : "SEND MESSAGE ↗"}
            </button>

            {status === "success" && (
              <p className="contact-status success">
                Message sent successfully! I'll be in touch.
              </p>
            )}

            {status === "error" && (
              <p className="contact-status error">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

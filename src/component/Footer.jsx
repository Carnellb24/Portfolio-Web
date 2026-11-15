
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>SEE YA.</h2>
            <p>BUILDING ONE PROJECT AT A TIME.</p>
          </div>

          <div className="footer-availability">
            <span className="availability-dot"></span>
            OPEN TO OPPORTUNITIES
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-links">
          <div className="footer-link-group">
            <h3>NAVIGATION</h3>
            <div className="footer-link-list">
              <a href="#home">START</a>
              <a href="#about">ABOUT</a>
              <a href="#projects">BUILDS</a>
              <a href="#skills">STATS</a>
              <a href="#contact">CONNECT</a>
            </div>
          </div>

          <div className="footer-link-group">
            <h3>ELSEWHERE</h3>
            <div className="footer-link-list">
              <a
                href="https://github.com/Carnellb24"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB ↗
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN ↗
              </a>
              <a href="mailto:carnellbutler.projects@gmail.com">
                EMAIL ↗
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>© {currentYear} CARNELL BUTLER. ALL RIGHTS RESERVED.</p>

          <a href="#home" className="back-to-top">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

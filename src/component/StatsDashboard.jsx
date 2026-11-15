
import "./StatsDashboard.css";
import GreenShader from "./GreenShader";

const stats = [
  {
    icon: "01",
    label: "FEATURED PROJECTS",
    value: "04",
    detail: "Independent software builds",
  },
  {
    icon: "02",
    label: "PRIMARY LANGUAGE",
    value: "PYTHON",
    detail: "Backend development",
  },
  {
    icon: "03",
    label: "DEVELOPMENT FOCUS",
    value: "BACKEND",
    detail: "APIs, automation & data",
  },
  {
    icon: "04",
    label: "CORE TOOLING",
    value: "PYTEST",
    detail: "SQL · Playwright · Requests",
  },
];

export default function StatsDashboard() {
  return (
    <section className="stats-dashboard">
        <GreenShader />
      <div className="stats-header">
        <span className="stats-eyebrow">PLAYER PROFILE // 001</span>

        <h2>PLAYER STATS</h2>

        <p>
          A snapshot of my development work, tools, and current focus.
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <div className="stat-card-top">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-indicator">◆</span>
            </div>

            <span className="stat-label">{stat.label}</span>

            <h3 className="stat-value">{stat.value}</h3>

            <p className="stat-detail">{stat.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

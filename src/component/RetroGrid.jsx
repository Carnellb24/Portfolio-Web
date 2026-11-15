import "./RetroGrid.css";

export default function RetroGrid() {
  return (
    <div className="retro-grid">
      <div className="retro-grid__sky" />
      <div className="retro-grid__glow" />

      <div className="retro-grid__perspective">
        <div className="retro-grid__plane" />
      </div>

      <div className="retro-grid__fade" />
    </div>
  );
}

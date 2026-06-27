import { useMemo } from "react";

function genParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * -20,
    driftX: (Math.random() - 0.5) * 40,
    driftY: (Math.random() - 0.5) * 40,
  }));
}

export default function Particles({ count = 25 }) {
  const particles = useMemo(() => genParticles(count), [count]);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--dx": `${p.driftX}px`,
            "--dy": `${p.driftY}px`,
          }}
        />
      ))}
    </div>
  );
}

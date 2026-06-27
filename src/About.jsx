import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

function RedactedLine({ text }) {
  return <span className="about__redacted">{text}</span>;
}

const FIELDS = [
  { label: "SUBJECT", value: "Michael OMale" },
  { label: "ROLE", value: "Frontend Developer" },
  { label: "LOCATION", value: "Nigeria — Remote Ready" },
  { label: "STATUS", value: "Available for deployment" },
  { label: "CLEARANCE", value: "React · CSS · JS · HTML · Figma" },
];

const STATS = [
  { value: 2, suffix: "+", label: "Years building" },
  { value: 7, suffix: "+", label: "Projects shipped" },
  { value: 100, suffix: "%", label: "No dark patterns" },
  { value: 0, suffix: "", label: "Boring sites made" },
];

const TIMELINE = [
  { year: "2023", title: "Started Learning", desc: "Began with HTML, CSS, and JS fundamentals. Built first landing pages." },
  { year: "2024", title: "First Freelance Project", desc: "Shipped a full landing page for a local business. Discovered React." },
  { year: "2025", title: "Portfolio OS", desc: "Built the first version of this portfolio. Started taking UI seriously." },
  { year: "2026", title: "7+ Projects Shipped", desc: "Multiple full-stack apps. Deep React + Supabase experience. Refined design eye." },
];

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(null);

  return (
    <section id="about" className="about">
      <div className="about__inner">

        <header className="about__header">
          <div className="about__file-tag">
            <span className="about__file-label">FILE</span>
            <span className="about__file-num">MO-2025-001</span>
          </div>
          <h2 className="about__title"><ScrambleText text="DOSSIER" /></h2>
          <span className="about__badge">CLASSIFIED</span>
        </header>

        <div className="about__card">
          <div className="about__fields">
            {FIELDS.map(({ label, value }) => (
              <div key={label} className="about__field">
                <span className="about__field-label">{label}</span>
                <span className="about__field-value">{value}</span>
              </div>
            ))}
          </div>
          <span className="about__stamp">APPROVED</span>
        </div>

        <div className="about__card">
          <span className="about__card-label">// SUBJECT BIOGRAPHY</span>
          <div className="about__bio">
            <p>
              <RedactedLine text="I build interfaces that make people stop scrolling." />{" "}
              <RedactedLine text="Not because of tricks or gimmicks —" />{" "}
              <RedactedLine text="because the work is honest, precise, and considered." />
            </p>
            <p>
              <RedactedLine text="Frontend development, to me, is the last mile between an idea and a human." />{" "}
              <RedactedLine text="I take that seriously." />{" "}
              <RedactedLine text="Every pixel, every transition, every line of markup has a reason." />
            </p>
            <p>
              <RedactedLine text="I work in React, write real CSS, and design in Figma." />{" "}
              <RedactedLine text="I care about performance, accessibility, and not making ugly things." />
            </p>
          </div>
        </div>

        <div className="about__card">
          <span className="about__card-label">// MANIFESTO</span>
          <p className="about__manifesto-text">
            I believe the best interfaces feel <strong>inevitable</strong> — like they
            were always meant to exist. I don't chase trends. I chase clarity,
            performance, and the kind of polish that most people won't notice
            but everyone will feel.
          </p>
          <p className="about__manifesto-text">
            Every project gets the same treatment: <strong>think first, build
            second, refine until it's right</strong>.
          </p>
        </div>

        <div className="about__card">
          <span className="about__card-label">// CAREER TIMELINE</span>
          <div className="about__timeline">
            <div className="about__timeline-bar" />
            <div className="about__timeline-fill" />
            <div className="about__timeline-nodes">
              {TIMELINE.map((item) => (
                <button
                  key={item.year}
                  className={`about__timeline-node${activeTimeline === item.year ? " is-active" : ""}`}
                  onClick={() => setActiveTimeline(activeTimeline === item.year ? null : item.year)}
                >
                  <span className="about__timeline-dot" />
                  <span className="about__timeline-year">{item.year}</span>
                </button>
              ))}
            </div>
          </div>
          {activeTimeline && (
            <div className="about__timeline-card">
              <strong>{TIMELINE.find((t) => t.year === activeTimeline)?.title}</strong>
              <p>{TIMELINE.find((t) => t.year === activeTimeline)?.desc}</p>
            </div>
          )}
        </div>

        <div className="about__card">
          <div className="about__stats">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="about__stat">
                <span className="about__stat-value">
                  <Counter target={value} suffix={suffix} />
                </span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="about__footer">
          <span>END OF FILE — MO-2025-001</span>
          <span>UNAUTHORIZED REPRODUCTION PROHIBITED</span>
          <span>MICHAEL OMALE © {new Date().getFullYear()}</span>
        </footer>

      </div>
    </section>
  );
}

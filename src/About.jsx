import { useEffect, useState } from "react";
import { useInView } from "./hooks/useInView";
import ScrambleText from "./ScrambleText";

function Counter({ target, suffix = "", trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
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
  }, [trigger, target]);

  return <>{count}{suffix}</>;
}

function RedactedLine({ text, delay = 0 }) {
  return (
    <span className="about__redacted about__redacted--revealed" style={{ "--rd": `${delay}s` }}>
      {text}
    </span>
  );
}

const STATS = [
  { value: 2, suffix: "+", label: "Years building" },
  { value: 7, suffix: "+", label: "Projects shipped" },
  { value: 100, suffix: "%", label: "No dark patterns" },
  { value: 0, suffix: "", label: "Boring sites made" },
];

const FIELDS = [
  { label: "SUBJECT", value: "Michael OMale" },
  { label: "ROLE", value: "Frontend Developer" },
  { label: "LOCATION", value: "Nigeria — Remote Ready" },
  { label: "STATUS", value: "Available for deployment" },
  { label: "CLEARANCE", value: "React · CSS · JS · HTML · Figma" },
];

const TIMELINE = [
  { year: "2023", title: "Started Learning", desc: "Began with HTML, CSS, and JS fundamentals. Built first landing pages." },
  { year: "2024", title: "First Freelance Project", desc: "Shipped a full landing page for a local business. Discovered React." },
  { year: "2025", title: "Portfolio OS", desc: "Built the first version of this portfolio. Started taking UI seriously." },
  { year: "2026", title: "7+ Projects Shipped", desc: "Multiple full-stack apps. Deep React + Supabase experience. Refined design eye." },
];

export default function About() {
  const [sectionRef, inView] = useInView(0.1);
  const [activeTimeline, setActiveTimeline] = useState(null);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__scanlines" />

      <div className={`about__header${inView ? " about__header--visible" : ""}`}>
        <div className="about__file-tag">
          <span className="about__file-label">FILE</span>
          <span className="about__file-num">MO-2025-001</span>
        </div>
        <h2 className="about__title"><ScrambleText text="DOSSIER" /></h2>
        <div className="about__classified-badge">CLASSIFIED</div>
      </div>

      <div className="about__grid">
        <div className={`about__fields${inView ? " about__fields--visible" : ""}`}>
          {FIELDS.map(({ label, value }, i) => (
            <div key={label} className="about__field" style={{ "--fi": i }}>
              <span className="about__field-label">{label}</span>
              <span className="about__field-value">{value}</span>
            </div>
          ))}
          <div className="about__stamp" />
        </div>

        <div className={`about__right${inView ? " about__right--visible" : ""}`}>
          <div className="about__bio-label">
            <span>// SUBJECT BIOGRAPHY</span>
          </div>

          <div className="about__bio">
            <p className="about__bio-para">
              <RedactedLine text="I build interfaces that make people stop scrolling." delay={0} />{" "}
              <RedactedLine text="Not because of tricks or gimmicks —" delay={0.05} />{" "}
              <RedactedLine text="because the work is honest, precise, and considered." delay={0.1} />
            </p>
            <p className="about__bio-para">
              <RedactedLine text="Frontend development, to me, is the last mile between an idea and a human." delay={0.05} />{" "}
              <RedactedLine text="I take that seriously." delay={0.1} />{" "}
              <RedactedLine text="Every pixel, every transition, every line of markup has a reason." delay={0.15} />
            </p>
            <p className="about__bio-para">
              <RedactedLine text="I work in React, write real CSS, and design in Figma." delay={0.1} />{" "}
              <RedactedLine text="I care about performance, accessibility, and not making ugly things." delay={0.15} />
            </p>
          </div>

          {/* Manifesto */}
          <div className="about__manifesto">
            <span className="about__manifesto-label">// MANIFESTO</span>
            <p>
              I believe the best interfaces feel <strong>inevitable</strong> — like they
              were always meant to exist. I don't chase trends. I chase clarity,
              performance, and the kind of polish that most people won't notice
              but everyone will feel.
            </p>
            <p>
              Every project gets the same treatment: <strong>think first, build
              second, refine until it's right</strong>.
            </p>
          </div>

          {/* Timeline */}
          <div className="about__timeline">
            <span className="about__timeline-label">// CAREER TIMELINE</span>
            <div className="about__timeline-track">
              <div className="about__timeline-line">
                <div
                  className="about__timeline-line-fill"
                  style={{ width: inView ? "100%" : "0%" }}
                />
              </div>
              {TIMELINE.map((item) => (
                <div
                  key={item.year}
                  className={`about__timeline-node${activeTimeline === item.year ? " about__timeline-node--active" : ""}`}
                  onClick={() => setActiveTimeline(activeTimeline === item.year ? null : item.year)}
                >
                  <div className="about__timeline-dot" />
                  <span className="about__timeline-year">{item.year}</span>
                </div>
              ))}
            </div>
            {activeTimeline && (
              <div className="about__timeline-card about__timeline-card--open">
                <div className="about__timeline-card-title">
                  {TIMELINE.find((t) => t.year === activeTimeline)?.title}
                </div>
                <div className="about__timeline-card-desc">
                  {TIMELINE.find((t) => t.year === activeTimeline)?.desc}
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="about__stats">
            {STATS.map(({ value, suffix, label }, i) => (
              <div key={label} className="about__stat" style={{ "--si": i }}>
                <span className="about__stat-value">
                  <Counter target={value} suffix={suffix} trigger={inView} />
                </span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`about__footer-strip${inView ? " about__footer-strip--visible" : ""}`}>
        <span>END OF FILE — MO-2025-001</span>
        <span>UNAUTHORIZED REPRODUCTION PROHIBITED</span>
        <span>MICHAEL OMALE © {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { useParallax } from "./hooks/useParallax";

function useEasterEggs() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let buffer = [];

    const handler = (e) => {
      buffer.push(e.keyCode);
      buffer = buffer.slice(-10);
      if (buffer.join(",") === konami.join(",")) {
        setActive((a) => !a);
        buffer = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("easter-egg-active", active);
  }, [active]);
}

export default function Hero({ scrollProgress = 0 }) {
  useEasterEggs();
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const shapesRef = useRef(null);
  useParallax(shapesRef, -0.08);
  const [bootDone, setBootDone] = useState(false);
  const [bootVisible, setBootVisible] = useState(true);
  const [cursorOverLink, setCursorOverLink] = useState(false);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  /* Boot screen */
  useEffect(() => {
    const t1 = setTimeout(() => setBootDone(true), 800);
    const t2 = setTimeout(() => setBootVisible(false), 1400);
    const t3 = setTimeout(() => setMounted(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  /* Custom cursor */
  useEffect(() => {
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseRef.current.x, 0.12);
      ringY = lerp(ringY, mouseRef.current.y, 0.12);
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Cursor context detection */
  useEffect(() => {
    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    const onEnter = () => setCursorOverLink(true);
    const onLeave = () => setCursorOverLink(false);
    links.forEach((l) => { l.addEventListener("mouseenter", onEnter); l.addEventListener("mouseleave", onLeave); });
    return () => links.forEach((l) => { l.removeEventListener("mouseenter", onEnter); l.removeEventListener("mouseleave", onLeave); });
  }, [mounted]);

  useEffect(() => {
    if (!cursorDotRef.current || !cursorRingRef.current) return;
    cursorDotRef.current.classList.toggle("cursor-dot--lg", cursorOverLink);
    cursorRingRef.current.classList.toggle("cursor-ring--lg", cursorOverLink);
  }, [cursorOverLink]);

  /* Magnetic button */
  const handleBtnMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const handleBtnMouseLeave = (e) => {
    e.currentTarget.style.transform = "translate(0,0)";
  };

  /* Ink splash on CTA click */
  const handleCtaClick = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const splash = document.createElement("span");
    splash.style.cssText = `
      position: absolute; inset: 0;
      background: radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, var(--color-accent) 0%, transparent 60%);
      opacity: 0.6; pointer-events: none; z-index: 0;
      animation: fadeOut 0.6s ease forwards;
    `;
    btn.appendChild(splash);
    setTimeout(() => splash.remove(), 600);
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  const MARQUEE_ITEMS = [
    "FRONTEND DEVELOPER", "✦", "REACT", "✦", "UI / UX", "✦",
    "NEXT.JS", "✦", "OPEN FOR WORK", "✦", "TYPESCRIPT", "✦", "WEB PERFORMANCE", "✦",
  ];

  const scrollRingCircumference = 2 * Math.PI * 12;

  return (
    <>
      {/* Boot screen */}
      <div className={`boot-screen${!bootVisible ? " boot-screen--hidden" : ""}`}>
        <div className="boot__logo">
          {"MO".split("").map((char, i) => (
            <span
              key={i}
              className={`boot__logo-char${bootDone ? " boot__logo-char--visible" : ""}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="boot__bar">
          <div className="boot__bar-fill" style={{ width: bootDone ? "100%" : "0%" }} />
        </div>
        <span className="boot__text">
          {bootDone ? "READY." : "LOADING DOSSIER..."}
          <span className="boot__text-cursor">_</span>
        </span>
      </div>

      {/* Cursor elements (hidden on touch via CSS) */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      <section className={`hero${mounted ? " hero--mounted" : ""}`}>
        <div className="hero__grain" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />

        {/* Floating shapes */}
        <div className="hero__floating-shapes" ref={shapesRef} aria-hidden="true">
          <div className="hero__shape hero__shape--circle" />
          <div className="hero__shape hero__shape--square" />
          <div className="hero__shape hero__shape--diamond" />
          <div className="hero__shape hero__shape--line" />
        </div>

        <span className="hero__stamp">© 2025</span>

        {/* Scroll progress ring */}
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-ring">
            <svg viewBox="0 0 32 32">
              <circle className="hero__scroll-ring-bg" cx="16" cy="16" r="12" />
              <circle
                className="hero__scroll-ring-progress"
                cx="16" cy="16" r="12"
                style={{
                  strokeDashoffset: scrollRingCircumference - ((scrollProgress / 100) * scrollRingCircumference),
                }}
              />
            </svg>
            <div className="hero__scroll-line" />
          </div>
          <span className="hero__scroll-label">SCROLL</span>
        </div>

        <div className="hero__available-badge">
          <span className="hero__available-dot" />
          <p className="hero__available-text">Available for work</p>
        </div>

        <div className="hero__text-block">
          <div className="hero__name-wrap">
            <div className="hero__name-line">
              <h1 className="hero__name-outline">OMALE</h1>
            </div>
            <div className="hero__name-line">
              <h1 className="hero__name-filled">MICHAEL</h1>
              <div className="hero__accent-block" />
            </div>
          </div>

          <div className="hero__role-tag">FRONTEND DEVELOPER</div>

          <button
            className="hero__cta-btn"
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            onClick={handleCtaClick}
            style={{ position: "relative", overflow: "hidden" }}
            aria-label="Scroll to my work section"
          >
            VIEW MY WORK →
          </button>
        </div>

        <div className="hero__marquee-wrap">
          <div className="hero__marquee-track" aria-hidden="true">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="hero__marquee-item">{item}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

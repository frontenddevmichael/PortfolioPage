import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "EMAIL", href: "mailto:omalemcmails@gmail.com" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/michael-omale-b63406354/" },
  { label: "WHATSAPP", href: "https://wa.me/09061712509" },
];

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer__top">
        <a href="#" className="footer__logo" aria-label="Back to top">
          <h1 className="footer__logo">Michael Omale</h1>
        </a>

        <p className="footer__tagline">
          Building interfaces that<br />
          <em>make people stop scrolling.</em>
        </p>

        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <button
            onClick={toggleTheme}
            className="footer__top-btn micro-btn"
            style={{ opacity: 1, transform: "none", cursor: "pointer" }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="footer__top-arrow">{theme === "dark" ? "☀" : "☾"}</span>
            <span className="footer__top-label">{theme === "dark" ? "LIGHT" : "DARK"}</span>
          </button>

          <button
            className={`footer__top-btn micro-btn${visible ? " footer__top-btn--visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span className="footer__top-arrow">↑</span>
            <span className="footer__top-label">BACK TO TOP</span>
          </button>
        </div>
      </div>

      <div className="footer__rule" />

      <div className="footer__mid">
        <div className="footer__col">
          <span className="footer__col-heading">NAVIGATE</span>
          <ul className="footer__nav" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="footer__nav-link">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <span className="footer__col-heading">CONNECT</span>
          <ul className="footer__nav" role="list">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="footer__nav-link" target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__col--status">
          <span className="footer__col-heading">STATUS</span>
          <div className="footer__status">
            <span className="footer__status-dot" />
            <span className="footer__status-text">Available for work</span>
          </div>
          <p className="footer__status-sub">Open to freelance &amp; full-time roles</p>
        </div>
      </div>

      <div className="footer__rule" />

      <div className="footer__bottom">
        <span className="footer__copy">© 2025 Michael OMale. All rights reserved.</span>
        <span className="footer__built">Designed &amp; built by Michael OMale</span>
        <span className="footer__stack">React · CSS · Figma</span>
      </div>

      {/* Colophon */}
      <div className="footer__bottom" style={{ marginTop: "var(--space-1)", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "var(--space-4)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.15em" }}>
          COLOPHON: React 19 · Vite · Custom CSS · Archivo Black · Space Grotesk · Inter · JetBrains Mono · WCAG 2.1 AA
        </span>
      </div>
    </footer>
  );
}

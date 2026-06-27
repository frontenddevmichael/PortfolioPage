import { useEffect, useState } from "react";
import { useIsMobile } from "./hooks/useIsMobile";
import { useScroll } from "./ScrollContext";

const IconHome = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const IconSkills = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconAbout = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const IconWork = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="1" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const IconContact = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "WORK", href: "#work" },
];

const DOCK_ITEMS = [
  { label: "Home", href: "#", Icon: IconHome },
  { label: "About", href: "#about", Icon: IconAbout },
  { label: "Skills", href: "#skills", Icon: IconSkills },
  { label: "Work", href: "#work", Icon: IconWork },
  { label: "Contact", href: "#contact", Icon: IconContact },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#");
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile(768);
  const [skipVisible, setSkipVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setScrolled(scrollY > 40);
  }, [scrollY]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navClass = ["nav", scrolled ? "nav--scrolled" : "", mounted ? "nav--mounted" : ""].filter(Boolean).join(" ");

  if (isMobile) {
    return (
      <>
        {/* Skip to content */}
        <a
          href="#main-content"
          style={{
            position: "fixed", top: "-100%", left: "0", zIndex: 10001,
            padding: "var(--space-2) var(--space-4)", background: "var(--color-accent)",
            color: "var(--color-text-primary)", fontFamily: "var(--font-mono)",
            fontSize: "var(--font-size-sm)", fontWeight: 600,
            textDecoration: "none",
          }}
          onFocus={() => setSkipVisible(true)}
          onBlur={() => setSkipVisible(false)}
          className={skipVisible ? "skip-link--visible" : ""}
        >
          Skip to content
        </a>

        <nav className={navClass} aria-label="Main navigation">
          <a href="#" className="navLogo" aria-label="Go to top">
            <h2>MO</h2>
          </a>
          <div className="nav__dock">
            {DOCK_ITEMS.map(({ label, href, Icon }, i) => {
              const isActive = href === "#" ? activeLink === "#" || activeLink === "" : activeLink === href;
              const Tag = Icon;
              return (
                <a
                  key={href}
                  href={href}
                  className={`nav__dock-item${isActive ? " active" : ""}`}
                  style={{ "--di": i }}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Tag />
                  <span>{label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        style={{
          position: "fixed", top: "-100%", left: "0", zIndex: 10001,
          padding: "var(--space-2) var(--space-4)", background: "var(--color-accent)",
          color: "var(--color-text-primary)", fontFamily: "var(--font-mono)",
          fontSize: "var(--font-size-sm)", fontWeight: 600, textDecoration: "none",
        }}
        onFocus={() => setSkipVisible(true)}
        onBlur={() => setSkipVisible(false)}
      >
        Skip to content
      </a>

      <nav className={navClass}>
        <a href="#" className="navLogo" aria-label="Home">
          <h2>MO</h2>
        </a>
        <div className="navLinks">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className={`micro-link${activeLink === href ? " active" : ""}`}>
              {label}
            </a>
          ))}
        </div>
        <div className="contactME">
          <a href="#contact" className="micro-link">CONTACT ME</a>
        </div>
      </nav>
    </>
  );
}

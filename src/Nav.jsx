import { useEffect, useState } from "react";


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

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
        setIsMobile(mq.matches);
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [breakpoint]);

    return isMobile;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("#");
    const [mounted, setMounted] = useState(false);
    const isMobile = useIsMobile();

    // Entrance delay
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 80);
        return () => clearTimeout(t);
    }, []);

    // Scroll detection (used by desktop nav only)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Active section tracking — shared between desktop + dock
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

    const navClass = [
        "nav",
        scrolled ? "nav--scrolled" : "",
        mounted ? "nav--mounted" : "",
    ].filter(Boolean).join(" ");

    // ── MOBILE: bottom icon dock ────────────────────────────────────────────

    if (isMobile) {
        return (
            <nav className={navClass} aria-label="Main navigation">

                {/* Logo stays — CSS floats it to top-left as a fixed badge */}
                <a href="#" className="navLogo" aria-label="Go to top">
                    <h2>MO</h2>
                </a>

                {/* Icon dock — replaces hamburger entirely */}
                <div className="nav__dock">
                    {DOCK_ITEMS.map(({ label, href, Icon }, i) => {
                        const isActive =
                            href === "#"
                                ? activeLink === "#" || activeLink === ""
                                : activeLink === href;

                        return (
                            <a
                                key={href}
                                href={href}
                                className={`nav__dock-item${isActive ? " active" : ""}`}
                                style={{ "--di": i }}
                                aria-label={label}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <Icon />
                                <span>{label}</span>
                            </a>
                        );
                    })}
                </div>

            </nav>
        );
    }

    // ── DESKTOP: original nav ───────────────────────────────────────────────

    return (
        <>
            <nav className={navClass}>

                <a href="#" className="navLogo" aria-label="Home">
                    <h2>MO</h2>
                </a>

                <div className="navLinks">
                    {NAV_LINKS.map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            className={activeLink === href ? "active" : ""}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                <div className="contactME">
                    <a href="#contact">CONTACT ME</a>
                </div>

            </nav>
        </>
    );
}
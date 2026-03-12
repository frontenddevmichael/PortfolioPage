import { useEffect, useState } from "react";

const MO_LOGO = (
    <h1 className="footer__logo">Michael Omale</h1>
);

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

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="footer">

            {/* ── TOP ROW — logo + tagline + back to top ── */}
            <div className="footer__top">
                <a href="#" className="footer__logo" aria-label="Back to top">
                    {MO_LOGO}
                </a>

                <p className="footer__tagline">
                    Building interfaces that<br />
                    <em>make people stop scrolling.</em>
                </p>

                <button
                    className={`footer__top-btn${visible ? " footer__top-btn--visible" : ""}`}
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    <span className="footer__top-arrow">↑</span>
                    <span className="footer__top-label">BACK TO TOP</span>
                </button>
            </div>

            {/* ── DIVIDER ── */}
            <div className="footer__rule" />

            {/* ── MID ROW — nav + socials ── */}
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
                                <a
                                    href={href}
                                    className="footer__nav-link"
                                    target={href.startsWith("mailto") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                >
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

            {/* ── DIVIDER ── */}
            <div className="footer__rule" />

            {/* ── BOTTOM ROW — copyright + built with ── */}
            <div className="footer__bottom">
                <span className="footer__copy">© 2025 Michael OMale. All rights reserved.</span>
                <span className="footer__built">Designed &amp; built by Michael OMale</span>
                <span className="footer__stack">React · CSS · Figma</span>
            </div>

        </footer>
    );
}
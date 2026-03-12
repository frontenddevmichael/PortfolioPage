import { useEffect, useRef, useState } from "react";

export default function Hero() {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    /* ── staggered mount animation trigger ── */
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        return () => clearTimeout(t);
    }, []);

    /* ── custom cursor tracking ── */
    useEffect(() => {
        let ringX = 0, ringY = 0;
        let mouseX = 0, mouseY = 0;
        let raf;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
            }
        };

        const lerp = (a, b, t) => a + (b - a) * t;

        const animate = () => {
            ringX = lerp(ringX, mouseX, 0.12);
            ringY = lerp(ringY, mouseY, 0.12);
            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            }
            raf = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMove);
        raf = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    /* ── magnetic button ── */
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

    const MARQUEE_ITEMS = [
        "FRONTEND DEVELOPER", "✦", "REACT", "✦", "UI / UX", "✦",
        "NEXT.JS", "✦", "OPEN FOR WORK", "✦", "TYPESCRIPT", "✦", "WEB PERFORMANCE", "✦",
    ];

    return (
        <>
            <div ref={cursorDotRef} className="cursor-dot" />
            <div ref={cursorRingRef} className="cursor-ring" />

            <section className={`hero${mounted ? " hero--mounted" : ""}`}>

                <div className="hero__grain" />
                <div className="hero__grid" />
                <span className="hero__stamp">© 2025</span>

                <div className="hero__scroll-indicator">
                    <div className="hero__scroll-line" />
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
                    >
                        VIEW MY WORK →
                    </button>
                </div>

                <div className="hero__marquee-wrap">
                    <div className="hero__marquee-track">
                        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                            <span key={i} className="hero__marquee-item">{item}</span>
                        ))}
                    </div>
                </div>

            </section>
        </>
    );
}
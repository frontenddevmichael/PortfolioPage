import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   SCROLL IN-VIEW HOOK
───────────────────────────────────────── */
function useInView(ref, threshold = 0.15) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, threshold]);
    return inView;
}

/* ─────────────────────────────────────────
   COUNTER — animates 0 → target when triggered
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   REDACTED LINE — reveals on hover
───────────────────────────────────────── */
function RedactedLine({ text, delay = 0 }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <span
            className={`about__redacted${revealed ? " about__redacted--revealed" : ""}`}
            style={{ "--rd": `${delay}s` }}
            onMouseEnter={() => setRevealed(true)}
        >
            {text}
        </span>
    );
}

/* ─────────────────────────────────────────
   DOSSIER STATS
───────────────────────────────────────── */
const STATS = [
    { value: 2, suffix: "+", label: "Years building" },
    { value: 7, suffix: "+", label: "Projects shipped" },
    { value: 100, suffix: "%", label: "No dark patterns" },
    { value: 0, suffix: "", label: "Boring sites made" },
];

/* ─────────────────────────────────────────
   DOSSIER FIELDS
───────────────────────────────────────── */
const FIELDS = [
    { label: "SUBJECT", value: "Michael OMale" },
    { label: "ROLE", value: "Frontend Developer" },
    { label: "LOCATION", value: "Nigeria — Remote Ready" },
    { label: "STATUS", value: "Available for deployment" },
    { label: "CLEARANCE", value: "React · CSS · JS · HTML · Figma" },
];

/* ─────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────── */
export default function About() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, 0.1);

    return (
        <section id="about" className="about" ref={sectionRef}>

            {/* scanline texture overlay */}
            <div className="about__scanlines" />

            {/* ── HEADER ROW ── */}
            <div className={`about__header${inView ? " about__header--visible" : ""}`}>
                <div className="about__file-tag">
                    <span className="about__file-label">FILE</span>
                    <span className="about__file-num">MO-2025-001</span>
                </div>
                <h2 className="about__title">DOSSIER</h2>
                <div className="about__classified-badge">CLASSIFIED</div>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="about__grid">

                {/* LEFT — field rows */}
                <div className={`about__fields${inView ? " about__fields--visible" : ""}`}>
                    {FIELDS.map(({ label, value }, i) => (
                        <div
                            key={label}
                            className="about__field"
                            style={{ "--fi": i }}
                        >
                            <span className="about__field-label">{label}</span>
                            <span className="about__field-value">{value}</span>
                        </div>
                    ))}

                    {/* STAMP */}
                    <div className={`about__stamp${inView ? " about__stamp--visible" : ""}`}>
                        <span>CLEARANCE</span>
                        <span>GRANTED</span>
                    </div>
                </div>

                {/* RIGHT — redacted bio + stats */}
                <div className={`about__right${inView ? " about__right--visible" : ""}`}>

                    <div className="about__bio-label">
                        <span>// SUBJECT BIOGRAPHY</span>
                        <span className="about__bio-instruction">[ HOVER TO DECLASSIFY ]</span>
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

                    {/* STATS */}
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

            {/* ── BOTTOM STRIP ── */}
            <div className={`about__footer-strip${inView ? " about__footer-strip--visible" : ""}`}>
                <span>END OF FILE — MO-2025-001</span>
                <span>UNAUTHORIZED REPRODUCTION PROHIBITED</span>
                <span>MICHAEL OMALE © {new Date().getFullYear()}</span>
            </div>

        </section>
    );
}
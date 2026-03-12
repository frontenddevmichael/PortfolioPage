import { useEffect, useRef, useState } from "react";

// ─── Place your actual resume PDF in /public/resume.pdf ───
const RESUME_FILE = "/resume.pdf";
const RESUME_FILENAME = "Omale_Michael_Resume.pdf";

export default function ResumeDownload() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    // ── Intersection observer entrance ──
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // ── Download handler ──
    const handleDownload = () => {
        if (downloading || downloaded) return;
        setDownloading(true);

        setTimeout(() => {
            const link = document.createElement("a");
            link.href = RESUME_FILE;
            link.download = RESUME_FILENAME;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloading(false);
            setDownloaded(true);

            setTimeout(() => setDownloaded(false), 4000);
        }, 1200);
    };

    return (
        <section className="resume" ref={sectionRef}>
            {/* Dot grid background */}
            <div className="resume__dots" />

            {/* ── Header row ── */}
            <div className={`resume__header ${visible ? "resume__header--visible" : ""}`}>
                <div className="resume__header-left">
                    <div className="resume__icon-box">
                        {/* Document icon */}
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="8" y1="13" x2="16" y2="13" />
                            <line x1="8" y1="17" x2="13" y2="17" />
                        </svg>
                    </div>
                    <div>
                        <p className="resume__eyebrow">// DOCUMENT</p>
                        <h2 className="resume__title">My <em>Résumé</em></h2>
                    </div>
                </div>

                {/* File meta badge */}
                <div className="resume__meta-badge">
                    <span className="resume__meta-label">FORMAT</span>
                    <span className="resume__meta-value">PDF</span>
                    <span className="resume__meta-label" style={{ marginTop: "6px" }}>SIZE</span>
                    <span className="resume__meta-value">~120 KB</span>
                </div>
            </div>

            {/* ── Body ── */}
            <div className={`resume__body ${visible ? "resume__body--visible" : ""}`}>

                {/* Left — info panel */}
                <div className="resume__info">
                    {/* Dossier fields */}
                    <div className="resume__fields">
                        {[
                            { label: "NAME", value: "Omale Michael" },
                            { label: "ROLE", value: "Frontend Dev / UI·UX Designer" },
                            { label: "STACK", value: "React · JS · HTML · CSS" },
                            { label: "STATUS", value: "Available for Work", accent: true },
                        ].map((row, i) => (
                            <div className="resume__field" key={row.label} style={{ "--fi": i }}>
                                <span className="resume__field-label">{row.label}</span>
                                <span className={`resume__field-value ${row.accent ? "resume__field-value--accent" : ""}`}>
                                    {row.accent && <span className="resume__status-dot" />}
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Preview strip */}
                    <div className="resume__preview-strip">
                        <span className="resume__preview-label">CONTAINS</span>
                        <div className="resume__tags">
                            {["Experience", "Projects", "Skills", "Education", "Languages"].map((tag) => (
                                <span className="resume__tag" key={tag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — CTA panel */}
                <div className="resume__cta-panel">
                    {/* Big decorative text */}
                    <p className="resume__ghost-text">CV</p>

                    <div className="resume__cta-content">
                        <p className="resume__cta-desc">
                            One page. Every project, skill, and line of experience —
                            built clean and ready to ship.
                        </p>

                        {/* Main download button */}
                        <button
                            className={`resume__btn ${downloading ? "resume__btn--loading" : ""} ${downloaded ? "resume__btn--done" : ""}`}
                            onClick={handleDownload}
                            disabled={downloading}
                            aria-label="Download resume PDF"
                        >
                            <span className="resume__btn-icon">
                                {downloaded ? (
                                    /* Checkmark */
                                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : downloading ? (
                                    /* Animated spinner arrow */
                                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="resume__spin">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                ) : (
                                    /* Download arrow */
                                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                )}
                            </span>
                            <span className="resume__btn-text">
                                {downloaded ? "Downloaded!" : downloading ? "Preparing..." : "Download Résumé"}
                            </span>
                            {!downloading && !downloaded && (
                                <span className="resume__btn-corner">PDF</span>
                            )}
                        </button>

                        {/* View online link */}
                        <a
                            href={RESUME_FILE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume__view-link"
                        >
                            <span>View in browser</span>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Footer strip ── */}
            <div className={`resume__footer ${visible ? "resume__footer--visible" : ""}`}>
                <span>LAST UPDATED · 2026</span>
                <span>OMALE MICHAEL · FRONTEND DEV</span>
                <span>portfolio-page-guhz.vercel.app</span>
            </div>

            <style>{`
        /* ─────────────────────────────────────────
           RESUME DOWNLOAD SECTION
        ───────────────────────────────────────── */

        .resume {
          position: relative;
          width: 100%;
          padding: var(--section-padding);
          padding-top: var(--space-10);
          background-color: var(--color-bg-main);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* dot grid background */
        .resume__dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
          z-index: 0;
        }

        /* diagonal accent stripe — top left decorative */
        .resume::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 5px;
          background: repeating-linear-gradient(
            90deg,
            var(--color-accent) 0px, var(--color-accent) 32px,
            var(--color-border) 32px, var(--color-border) 36px
          );
          z-index: 1;
        }

        /* ── Header ── */
        .resume__header {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-4);
          padding-bottom: var(--space-6);
          border-bottom: var(--border-heavy);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s;
        }

        .resume__header--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .resume__header-left {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .resume__icon-box {
          width: 52px;
          height: 52px;
          background-color: var(--color-accent);
          border: var(--border-heavy);
          box-shadow: var(--shadow-brutal-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .resume__icon-box svg {
          width: 26px; height: 26px;
          stroke: var(--color-text-primary);
        }

        .resume__eyebrow {
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          font-weight: 600;
          letter-spacing: var(--letter-spacing-wider);
          color: var(--color-text-muted);
          margin-bottom: 4px;
        }

        .resume__title {
          font-family: var(--font-display);
          font-size: var(--font-size-h2);
          font-weight: 900;
          letter-spacing: var(--letter-spacing-tight);
          line-height: var(--line-height-tight);
          color: var(--color-text-primary);
        }

        .resume__title em {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 2px var(--color-text-primary);
        }

        /* file meta badge */
        .resume__meta-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          border: var(--border-thin);
          padding: var(--space-3) var(--space-4);
          box-shadow: var(--shadow-brutal-sm);
          background: var(--color-bg-surface);
        }

        .resume__meta-label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        .resume__meta-value {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: var(--letter-spacing-wide);
        }

        /* ── Body ── */
        .resume__body {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          border-bottom: var(--border-heavy);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s;
        }

        .resume__body--visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Left info panel ── */
        .resume__info {
          display: flex;
          flex-direction: column;
          border-right: var(--border-heavy);
        }

        .resume__fields {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .resume__field {
          display: grid;
          grid-template-columns: 100px 1fr;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-5);
          border-bottom: 1px solid var(--color-border-subtle);
          opacity: 0;
          transform: translateX(-16px);
          transition:
            opacity 0.5s ease calc(var(--fi) * 0.09s + 0.4s),
            transform 0.5s cubic-bezier(0.16,1,0.3,1) calc(var(--fi) * 0.09s + 0.4s),
            background-color 0.15s ease;
        }

        .resume__body--visible .resume__field {
          opacity: 1;
          transform: translateX(0);
        }

        .resume__field:hover {
          background-color: var(--color-bg-surface);
        }

        .resume__field-label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--color-accent);
          background-color: var(--color-bg-depth);
          padding: 2px var(--space-2);
          flex-shrink: 0;
          width: fit-content;
        }

        .resume__field-value {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .resume__field-value--accent {
          color: #1a7a4a;
          font-weight: 600;
        }

        .resume__status-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background-color: #1a7a4a;
          flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }

        /* preview tags strip */
        .resume__preview-strip {
          padding: var(--space-4) var(--space-5);
          background-color: var(--color-bg-surface);
          border-top: var(--border-thin);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .resume__preview-label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--color-text-muted);
        }

        .resume__tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .resume__tag {
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--color-text-primary);
          background-color: var(--color-accent);
          border: 2px solid var(--color-border);
          padding: 2px var(--space-3);
          box-shadow: 2px 2px 0 #000;
          transition: box-shadow 0.12s ease, transform 0.12s ease;
        }

        .resume__tag:hover {
          box-shadow: none;
          transform: translate(2px, 2px);
        }

        /* ── Right CTA panel ── */
        .resume__cta-panel {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-7) var(--space-6);
          overflow: hidden;
        }

        /* giant ghost "CV" text */
        .resume__ghost-text {
          position: absolute;
          bottom: -16px;
          right: -8px;
          font-family: var(--font-display);
          font-size: clamp(6rem, 14vw, 11rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px rgba(0,0,0,0.06);
          letter-spacing: -0.04em;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .resume__cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-5);
          width: 100%;
          max-width: 340px;
        }

        .resume__cta-desc {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
          line-height: var(--line-height-relaxed);
        }

        /* ── Main download button ── */
        .resume__btn {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4) var(--space-6);
          background-color: var(--color-bg-depth);
          border: var(--border-heavy);
          border-color: var(--color-bg-depth);
          box-shadow: var(--shadow-brutal-lg);
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: var(--color-accent);
          cursor: pointer;
          overflow: hidden;
          transition:
            box-shadow 0.15s ease,
            transform 0.15s ease,
            background-color 0.15s ease;
        }

        /* animated fill on hover */
        .resume__btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background-color: var(--color-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }

        .resume__btn:hover::after {
          transform: scaleX(1);
        }

        .resume__btn:hover {
          box-shadow: var(--shadow-brutal-sm);
          transform: translate(4px, 4px);
          color: var(--color-text-primary);
          border-color: var(--color-border);
        }

        .resume__btn:active {
          transform: translate(8px, 8px);
          box-shadow: none;
        }

        .resume__btn--loading {
          pointer-events: none;
          opacity: 0.85;
        }

        .resume__btn--done {
          background-color: #1a7a4a;
          border-color: #1a7a4a;
          color: #fff;
        }

        .resume__btn--done::after {
          display: none;
        }

        .resume__btn-icon {
          position: relative;
          z-index: 1;
          width: 22px; height: 22px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resume__btn-icon svg {
          width: 22px; height: 22px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .resume__btn-text {
          position: relative;
          z-index: 1;
          flex: 1;
        }

        /* PDF corner tag */
        .resume__btn-corner {
          position: relative;
          z-index: 1;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          background-color: var(--color-accent);
          color: var(--color-text-primary);
          padding: 2px 6px;
          border: 2px solid currentColor;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .resume__btn:hover .resume__btn-corner {
          background-color: var(--color-text-primary);
          color: var(--color-accent);
        }

        /* spinning loader */
        .resume__spin {
          animation: spin 0.9s linear infinite;
          stroke: var(--color-accent);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ── View link ── */
        .resume__view-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
          text-decoration: none;
          border-bottom: 2px solid var(--color-border-subtle);
          padding-bottom: 2px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .resume__view-link svg {
          width: 13px; height: 13px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.15s ease;
        }

        .resume__view-link:hover {
          color: var(--color-text-primary);
          border-color: var(--color-border);
        }

        .resume__view-link:hover svg {
          transform: translate(2px, -2px);
        }

        /* ── Footer strip ── */
        .resume__footer {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-3);
          padding: var(--space-4) 0 0;
          opacity: 0;
          transition: opacity 0.6s ease 0.8s;
        }

        .resume__footer--visible {
          opacity: 1;
        }

        .resume__footer span {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        /* ─────────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────────── */

        @media (max-width: 768px) {
          .resume {
            padding: var(--space-8) var(--space-5);
            padding-bottom: calc(var(--space-8) + 80px);
          }

          .resume__body {
            grid-template-columns: 1fr;
          }

          .resume__info {
            border-right: none;
            border-bottom: var(--border-heavy);
          }

          .resume__field {
            grid-template-columns: 90px 1fr;
            padding: var(--space-3) var(--space-4);
          }

          .resume__cta-panel {
            padding: var(--space-6) var(--space-4);
          }

          .resume__ghost-text {
            font-size: clamp(5rem, 28vw, 9rem);
          }

          .resume__btn {
            padding: var(--space-4) var(--space-5);
            font-size: 0.9rem;
          }

          .resume__footer {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
          }

          .resume__meta-badge {
            display: none;
          }
        }

        /* pulse keyframe (matches portfolio system) */
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
        </section>
    );
}
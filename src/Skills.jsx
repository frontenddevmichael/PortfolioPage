import { useEffect, useRef, useState } from "react";

const ICONS = {
    html: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 2L6.286 27.2L16 30L25.714 27.2L28 2H4Z" fill="#E44D26" />
            <path d="M16 27.714V4.286H25.714L24 25.143L16 27.714Z" fill="#F16529" />
            <path d="M10.857 11.143H16V15.429H10.286L9.714 18.857H16V23.143L11.143 21.714L10.857 18.857" stroke="white" strokeWidth="0" fill="white" />
            <path d="M10.857 11.143H16V15.429H10.286L9.714 18.857H16V23.143L11.143 21.714L10.857 18.857H7.714L8.571 26.571L16 28.571V24.286L11.429 23.143L11.143 20H16V15.429H10.857V11.143Z" fill="white" />
            <path d="M16 11.143H21.143L20.571 15.429H16V11.143Z" fill="#EBEBEB" />
            <path d="M16 20H20.286L19.857 23.143L16 24.286V28.571L23.429 26.571L24.286 18.857H16V20Z" fill="#EBEBEB" />
        </svg>
    ),
    css: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 2L6.286 27.2L16 30L25.714 27.2L28 2H4Z" fill="#1572B6" />
            <path d="M16 27.714V4.286H25.714L24 25.143L16 27.714Z" fill="#33A9DC" />
            <path d="M10.857 11.143H21.143L20.571 13.714H13.429L13.714 15.429H20.286L19.143 21.714L16 22.571L12.857 21.714L12.571 19.143H15.143L15.286 20.286L16 20.571L16.714 20.286L17.143 18.857H12.286L11.143 13.143L10.857 11.143Z" fill="white" />
        </svg>
    ),
    js: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#F7DF1E" />
            <path d="M9.589 25.51L11.745 24.226C12.149 24.968 12.515 25.594 13.429 25.594C14.305 25.594 14.862 25.246 14.862 23.942V15.209H17.44V23.981C17.44 26.671 15.862 27.878 13.545 27.878C11.438 27.878 10.221 26.786 9.589 25.51Z" fill="#323330" />
            <path d="M19.116 25.239L21.272 24.01C21.829 24.944 22.558 25.633 23.857 25.633C24.964 25.633 25.674 25.093 25.674 24.341C25.674 23.444 24.945 23.125 23.742 22.598L23.089 22.318C21.157 21.495 19.866 20.47 19.866 18.258C19.866 16.219 21.426 14.667 23.799 14.667C25.501 14.667 26.729 15.262 27.614 16.826L25.558 18.132C25.1 17.313 24.581 16.983 23.799 16.983C22.999 16.983 22.481 17.501 22.481 18.132C22.481 18.915 22.999 19.234 24.122 19.727L24.775 20.007C27.039 21.003 28.329 21.99 28.329 24.264C28.329 26.72 26.384 28.048 23.857 28.048C21.388 28.048 19.751 26.88 19.116 25.239Z" fill="#323330" />
        </svg>
    ),
    react: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="2.8" fill="#61DAFB" />
            <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
            <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)" />
            <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)" />
        </svg>
    ),
    figma: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.667 28C12.876 28 14.667 26.209 14.667 24V20H10.667C8.458 20 6.667 21.791 6.667 24C6.667 26.209 8.458 28 10.667 28Z" fill="#0ACF83" />
            <path d="M6.667 16C6.667 13.791 8.458 12 10.667 12H14.667V20H10.667C8.458 20 6.667 18.209 6.667 16Z" fill="#A259FF" />
            <path d="M6.667 8C6.667 5.791 8.458 4 10.667 4H14.667V12H10.667C8.458 12 6.667 10.209 6.667 8Z" fill="#F24E1E" />
            <path d="M14.667 4H18.667C20.876 4 22.667 5.791 22.667 8C22.667 10.209 20.876 12 18.667 12H14.667V4Z" fill="#FF7262" />
            <path d="M22.667 16C22.667 18.209 20.876 20 18.667 20C16.458 20 14.667 18.209 14.667 16C14.667 13.791 16.458 12 18.667 12C20.876 12 22.667 13.791 22.667 16Z" fill="#1ABCFE" />
        </svg>
    ),
};

/* ─────────────────────────────────────────
   SKILLS DATA — completed + accurate
───────────────────────────────────────── */
const skills = [
    {
        key: "01",
        icon: ICONS.html,
        name: "HTML",
        level: 95,
        description: "Semantic structure, accessibility-first markup, the skeleton everything runs on.",
        flip: "I write HTML that reads like a document, not a div soup. Semantic, clean, screen-reader honest.",
    },
    {
        key: "02",
        icon: ICONS.css,
        name: "CSS",
        level: 90,
        description: "Precision styling — layouts that hold, animations that earn their place.",
        flip: "Custom properties, grid, motion. No framework shortcut. Pure cascade, full control.",
    },
    {
        key: "03",
        icon: ICONS.js,
        name: "JavaScript",
        level: 85,
        description: "Vanilla logic and async patterns — the language the web actually runs on.",
        flip: "I know what happens before the framework. DOM, events, fetch, closures — all of it.",
    },
    {
        key: "04",
        icon: ICONS.react,
        name: "React",
        level: 88,
        description: "Building interactive UIs with intentional state and component architecture.",
        flip: "useState chaos, useEffect discipline. I build React like I understand the re-render.",
    },
    {
        key: "05",
        icon: ICONS.figma,
        name: "Figma",
        level: 80,
        description: "Design-to-code without the telephone game — I speak both languages.",
        flip: "Auto-layout, components, variables. I can read a Figma file and ship it pixel-perfect.",
    },
];

/* ─────────────────────────────────────────
   SCROLL HOOK — triggers once when in view
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
   SKILL CARD
───────────────────────────────────────── */
function SkillCard({ skill, index, sectionInView }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`skill${sectionInView ? " skill--visible" : ""}`}
            style={{ "--delay": `${index * 0.1}s` }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <div className={`skill__inner${flipped ? " skill__inner--flipped" : ""}`}>

                {/* FRONT */}
                <div className="skill__face skill__face--front">
                    <div className="skill__top">
                        <div className="skillIcon">{skill.icon}</div>
                        <span className="skill__key">{skill.key}</span>
                    </div>
                    <div className="skillName">{skill.name}</div>
                    <div className="skillDescription">{skill.description}</div>
                    <div className="skill__level-wrap">
                        <div className="skill__level-track">
                            <div
                                className="skill__level-fill"
                                style={{ "--level": `${skill.level}%` }}
                            />
                        </div>
                        <span className="skill__level-num">{skill.level}</span>
                    </div>
                </div>

                {/* BACK */}
                <div className="skill__face skill__face--back">
                    <span className="skill__back-label">RAW TAKE</span>
                    <p className="skill__back-text">{skill.flip}</p>
                    <div className="skill__back-icon">{skill.icon}</div>
                </div>

            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────── */
export default function Skills() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef);

    return (
        <section id="skills" className="skills" ref={sectionRef}>

            {/* dot grid background texture */}
            <div className="skills__dots" />

            <div className={`skillHeading${inView ? " skillHeading--visible" : ""}`}>
                <h2>Arsenal</h2>
                <p>
                    The tools I use to build{" "}
                    <span>unapologetic</span> digital solutions
                </p>
            </div>

            <div className="skillContent">
                {skills.map((skill, i) => (
                    <SkillCard
                        key={skill.key}
                        skill={skill}
                        index={i}
                        sectionInView={inView}
                    />
                ))}
            </div>

        </section>
    );
}
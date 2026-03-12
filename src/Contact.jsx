import { useEffect, useRef, useState } from "react";

function useInView(ref, threshold = 0.1) {
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

const CONTACT_LINKS = [
    {
        id: "01",
        label: "EMAIL",
        value: "omalemcmails@gmail.com",
        href: "mailto:omalemcmails@gmail.com",
        hint: "Slide into my inbox",
    },
    {
        id: "02",
        label: "LINKEDIN",
        value: "michael-omale",
        href: "https://linkedin.com/in/michael-omale",
        hint: "Let's connect professionally",
    },
    {
        id: "03",
        label: "WHATSAPP",
        value: "+234****",
        href: "https://wa.me/2349061712509",
        hint: "Quick chat? Say hello",
    },
];

const MAX_CHARS = 500;

export default function Contact() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, 0.08);

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [focused, setFocused] = useState(null);

    const charCount = form.message.length;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "message" && value.length > MAX_CHARS) return;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setSubmitted(true);
        // wire up EmailJS / Formspree here later
    };

    const handleReset = () => {
        setForm({ name: "", email: "", message: "" });
        setSubmitted(false);
    };

    return (
        <section id="contact" className="contact" ref={sectionRef}>

            {/* diagonal rule — structural background detail */}
            <div className="contact__diagonal" />

            {/* ── HEADING ── */}
            <div className={`contact__heading${inView ? " contact__heading--visible" : ""}`}>
                <span className="contact__label">// INITIATE TRANSMISSION</span>
                <h2 className="contact__title">
                    Let's<br /><em>Talk.</em>
                </h2>
                <p className="contact__subtitle">
                    Available for freelance work, full-time roles,<br />
                    and conversations worth having.
                </p>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="contact__grid">

                {/* LEFT — contact link rows */}
                <div className={`contact__links${inView ? " contact__links--visible" : ""}`}>
                    {CONTACT_LINKS.map(({ id, label, value, href, hint }, i) => (
                        <a
                            key={id}
                            href={href}
                            className="contact__row"
                            target={href.startsWith("mailto") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            style={{ "--li": i }}
                        >
                            <div className="contact__row-left">
                                <span className="contact__row-num">{id}</span>
                                <div className="contact__row-info">
                                    <span className="contact__row-label">{label}</span>
                                    <span className="contact__row-value">{value}</span>
                                </div>
                            </div>
                            <div className="contact__row-right">
                                <span className="contact__row-hint">{hint}</span>
                                <span className="contact__row-arrow">→</span>
                            </div>
                        </a>
                    ))}

                    {/* availability block */}
                    <div className={`contact__availability${inView ? " contact__availability--visible" : ""}`}>
                        <span className="contact__avail-dot" />
                        <div>
                            <p className="contact__avail-status">CURRENTLY AVAILABLE</p>
                            <p className="contact__avail-sub">Response within 24 hours</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT — terminal form */}
                <div className={`contact__terminal${inView ? " contact__terminal--visible" : ""}`}>

                    {/* terminal top bar */}
                    <div className="contact__terminal-bar">
                        <div className="contact__terminal-dots">
                            <span /><span /><span />
                        </div>
                        <span className="contact__terminal-title">new_message.exe</span>
                    </div>

                    {submitted ? (
                        <div className="contact__success">
                            <span className="contact__success-icon">✓</span>
                            <p className="contact__success-msg">TRANSMISSION SENT.</p>
                            <p className="contact__success-sub">I'll get back to you shortly.</p>
                            <button className="contact__reset-btn" onClick={handleReset}>
                                SEND ANOTHER →
                            </button>
                        </div>
                    ) : (
                        <form className="contact__form" onSubmit={handleSubmit} noValidate>

                            {/* NAME */}
                            <div className={`contact__field${focused === "name" ? " contact__field--focused" : ""}${form.name ? " contact__field--filled" : ""}`}>
                                <label className="contact__field-label" htmlFor="contact-name">
                                    <span className="contact__prompt">&gt;</span> NAME
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    className="contact__input"
                                    value={form.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("name")}
                                    onBlur={() => setFocused(null)}
                                    autoComplete="off"
                                    placeholder="Your name"
                                />
                            </div>

                            {/* EMAIL */}
                            <div className={`contact__field${focused === "email" ? " contact__field--focused" : ""}${form.email ? " contact__field--filled" : ""}`}>
                                <label className="contact__field-label" htmlFor="contact-email">
                                    <span className="contact__prompt">&gt;</span> EMAIL
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    className="contact__input"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("email")}
                                    onBlur={() => setFocused(null)}
                                    autoComplete="off"
                                    placeholder="your@email.com"
                                />
                            </div>

                            {/* MESSAGE */}
                            <div className={`contact__field contact__field--textarea${focused === "message" ? " contact__field--focused" : ""}${form.message ? " contact__field--filled" : ""}`}>
                                <label className="contact__field-label" htmlFor="contact-message">
                                    <span className="contact__prompt">&gt;</span> MESSAGE
                                    <span className="contact__char-count">{charCount}/{MAX_CHARS}</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    className="contact__input contact__textarea"
                                    value={form.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("message")}
                                    onBlur={() => setFocused(null)}
                                    placeholder="What's on your mind?"
                                    rows={5}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`contact__submit${form.name && form.email && form.message ? " contact__submit--ready" : ""}`}
                            >
                                <span className="contact__submit-text">SEND TRANSMISSION →</span>
                            </button>

                        </form>
                    )}
                </div>
            </div>

            {/* ── FOOTER ── */}
            <div className={`contact__footer${inView ? " contact__footer--visible" : ""}`}>
                <span>MICHAEL OMALE © 2025</span>
                <span>BUILT WITH REACT · CSS · FIGMA</span>
                <span>ALL RIGHTS RESERVED</span>
            </div>

        </section>
    );
}
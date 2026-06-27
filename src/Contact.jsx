import { useState, useRef, useCallback } from "react";
import { useInView } from "./hooks/useInView";
import ScrambleText from "./ScrambleText";

const CONTACT_LINKS = [
  { id: "01", label: "EMAIL", value: "omalemcmails@gmail.com", href: "mailto:omalemcmails@gmail.com", hint: "Slide into my inbox" },
  { id: "02", label: "LINKEDIN", value: "michael-omale", href: "https://linkedin.com/in/michael-omale", hint: "Let's connect professionally" },
  { id: "03", label: "WHATSAPP", value: "+2349061712509", href: "https://wa.me/2349061712509", hint: "Quick chat? Say hello" },
];

const MAX_CHARS = 500;

function validateField(name, value) {
  switch (name) {
    case "name":
      return value.length < 2 ? "Name should be at least 2 characters" : "";
    case "email":
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Enter a valid email address" : "";
    case "message":
      return value.length < 10 ? "Tell me a bit more (at least 10 characters)" : "";
    default:
      return "";
  }
}

function genConfetti() {
  return Array.from({ length: 30 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    color: Math.random() > 0.5 ? "#FFD500" : "#fff",
    w: `${6 + Math.random() * 8}px`,
    h: `${6 + Math.random() * 8}px`,
    tx: `${(Math.random() - 0.5) * 400}px`,
    ty: `${-200 - Math.random() * 400}px`,
    delay: `${Math.random() * 0.3}s`,
  }));
}

function Confetti() {
  const [pieces] = useState(genConfetti);

  return (
    <div className="contact__confetti-container">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="contact__confetti-piece"
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            width: p.w,
            height: p.h,
            "--tx": p.tx,
            "--ty": p.ty,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const [sectionRef, inView] = useInView(0.08);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const formRef = useRef(null);

  const charCount = form.message.length;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_CHARS) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      message: validateField("message", form.message),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }, [form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setSendProgress(0);

    /* Simulate progress bar */
    const interval = setInterval(() => {
      setSendProgress((prev) => {
        if (prev >= 90) { clearInterval(interval); return 90; }
        return prev + Math.random() * 15;
      });
    }, 100);

    try {
      const msg = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;

      /* WhatsApp fallback */
      const waURL = `https://wa.me/2349061712509?text=${encodeURIComponent(msg)}`;
      window.open(waURL, "_blank");

      setSendProgress(100);
      setTimeout(() => {
        clearInterval(interval);
        setStatus("success");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
      }, 500);

    } catch {
      clearInterval(interval);
      setStatus("error");
    }
  }, [form, validate]);

  const handleReset = useCallback(() => {
    setForm({ name: "", email: "", message: "" });
    setStatus("idle");
    setErrors({});
    setSendProgress(0);
  }, []);

  const allFilled = form.name && form.email && form.message;
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__diagonal" />

      {showConfetti && <Confetti />}

      <div className={`contact__heading${inView ? " contact__heading--visible" : ""}`}>
        <span className="contact__label">// INITIATE TRANSMISSION</span>
        <h2 className="contact__title">
          <ScrambleText text="Let's" as="span" /><br /><em>Talk.</em>
        </h2>
        <p className="contact__subtitle">
          Available for freelance work, full-time roles,<br />
          and conversations worth having.
        </p>
      </div>

      <div className="contact__grid">
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

          <div className={`contact__availability${inView ? " contact__availability--visible" : ""}`}>
            <span className="contact__avail-dot" />
            <div>
              <p className="contact__avail-status">CURRENTLY AVAILABLE</p>
              <p className="contact__avail-sub">Response within 24 hours</p>
            </div>
          </div>
        </div>

        <div className={`contact__terminal${inView ? " contact__terminal--visible" : ""}`}>
          <div className="contact__terminal-bar">
            <div className="contact__terminal-dots">
              <span /><span /><span />
            </div>
            <span className="contact__terminal-title">new_message.exe</span>
          </div>

          {status === "success" ? (
            <div className="contact__success">
              <span className="contact__success-icon">✓</span>
              <p className="contact__success-msg">TRANSMISSION SENT.</p>
              <p className="contact__success-sub">I'll get back to you shortly.</p>
              <button className="contact__reset-btn micro-btn" onClick={handleReset}>
                SEND ANOTHER →
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate ref={formRef}>
              <div className={`contact__field${focused === "name" ? " contact__field--focused" : ""}${form.name ? " contact__field--filled" : ""}${errors.name ? " contact__field--error" : ""}`}>
                <label className="contact__field-label" htmlFor="contact-name">
                  <span><span className="contact__prompt">&gt;</span> NAME</span>
                </label>
                <input
                  id="contact-name" name="name" type="text"
                  className="contact__input"
                  value={form.name} onChange={handleChange}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <div className={`contact__error-msg${errors.name ? " contact__error-msg--visible" : ""}`} id="name-error" role="alert">
                  {errors.name}
                </div>
              </div>

              <div className={`contact__field${focused === "email" ? " contact__field--focused" : ""}${form.email ? " contact__field--filled" : ""}${errors.email ? " contact__field--error" : ""}`}>
                <label className="contact__field-label" htmlFor="contact-email">
                  <span><span className="contact__prompt">&gt;</span> EMAIL</span>
                </label>
                <input
                  id="contact-email" name="email" type="email"
                  className="contact__input"
                  value={form.email} onChange={handleChange}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  autoComplete="email"
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <div className={`contact__error-msg${errors.email ? " contact__error-msg--visible" : ""}`} id="email-error" role="alert">
                  {errors.email}
                </div>
              </div>

              <div className={`contact__field contact__field--textarea${focused === "message" ? " contact__field--focused" : ""}${form.message ? " contact__field--filled" : ""}${errors.message ? " contact__field--error" : ""}`}>
                <label className="contact__field-label" htmlFor="contact-message">
                  <span><span className="contact__prompt">&gt;</span> MESSAGE</span>
                  <span className="contact__char-count">{charCount}/{MAX_CHARS}</span>
                </label>
                <textarea
                  id="contact-message" name="message"
                  className="contact__input contact__textarea"
                  value={form.message} onChange={handleChange}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  placeholder="What's on your mind?"
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                <div className={`contact__error-msg${errors.message ? " contact__error-msg--visible" : ""}`} id="message-error" role="alert">
                  {errors.message}
                </div>
              </div>

              <button
                type="submit"
                className={`contact__submit micro-btn${allFilled && !hasErrors ? " contact__submit--ready" : ""}${status === "sending" ? " contact__submit--sending" : ""}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <span style={{ position: "relative", zIndex: 1 }}>
                    SENDING... {Math.min(Math.round(sendProgress), 100)}%
                    <span style={{
                      position: "absolute", top: 0, left: 0, height: "100%",
                      width: `${Math.min(sendProgress, 100)}%`,
                      backgroundColor: "var(--color-accent)", opacity: 0.2,
                      zIndex: -1, transition: "width 0.1s ease",
                    }} />
                  </span>
                ) : (
                  <span className="contact__submit-text">SEND TRANSMISSION →</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={`contact__footer${inView ? " contact__footer--visible" : ""}`}>
        <span>MICHAEL OMALE © 2025</span>
        <span>BUILT WITH REACT · CSS · FIGMA</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </section>
  );
}

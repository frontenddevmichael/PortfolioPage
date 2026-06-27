import { useState, useCallback, useRef, useEffect } from "react";
import { useInView } from "./hooks/useInView";
import ScrambleText from "./ScrambleText";
import portfolio from "./assets/Portfolio.png";
import primeaxis from "./assets/Primeaxis.png";
import FoodMate from "./assets/FoodMate.png";
import synapse from "./assets/synapse.png";
import bmwarchive from "./assets/bmw-archive.png";
import templateStudios from "./assets/template-studios.png";
import studyFlow from "./assets/studyflow.png";
import Chatbotstudio from "./assets/Chatbotstudio.png";
import zeno from "./assets/zeno.png";
import elliotGlobalProperties from "./assets/elliotGlobalProperties.png";

const PROJECTS = [
  {
    id: "01", img: portfolio, name: "Portfolio OS",
    type: "Design System · React", year: "2025",
    description: "A fully custom neo-brutalist design system and portfolio built from scratch.",
    link: "#", featured: true,
    problem: "Most developer portfolios look identical — same layout, same Tailwind, same 'Hello World' energy. I wanted something that felt like the person behind it had a point of view.",
    approach: "Started with the design system first: colors, typography, spacing, shadows. Then built every component from scratch with raw CSS custom properties. No UI library, no template, no shortcuts.",
    outcome: "A portfolio that actually gets compliments in interviews. Design system is reusable across future projects.",
    tags: ["React", "CSS Custom Properties", "Figma", "Vite"],
    stat: "100% custom — zero UI dependencies",
  },
  {
    id: "02", img: primeaxis, name: "Prime Axis",
    type: "Frontend · UI", year: "2026",
    description: "PrimeAxis is a modern landing page for a software agency focused on delivering scalable digital solutions.",
    link: "https://primeaxis.pxxl.click/", featured: false,
    problem: "The agency needed a landing page that communicated both technical capability and creative confidence. The existing site felt generic and dated.",
    approach: "Designed a bold, conversion-focused layout with clear narrative sections. Used restrained motion to guide attention to CTAs without overwhelming.",
    outcome: "Clean, professional landing page that positions the agency as a premium partner.",
    tags: ["React", "CSS", "UI Design"],
    stat: "3x faster load time vs previous site",
  },
  {
    id: "03", img: FoodMate, name: "Food Mate",
    type: "Frontend · UI", year: "2026",
    description: "A responsive restaurant discovery platform designed to simplify how people discover restaurants.",
    link: "https://food-mate-three.vercel.app/", featured: false,
    problem: "Restaurant discovery apps often have cluttered UIs that make it hard to find what you're craving. Food Mate needed a clean, fast, visual-first approach.",
    approach: "Card-based layout with high-quality food imagery. Search and filter are front and center. Mobile-first responsive design.",
    outcome: "Intuitive browsing experience with strong visual hierarchy.",
    tags: ["React", "CSS", "Responsive Design"],
    stat: "4.2s → 1.8s page load improvement",
  },
  {
    id: "04", img: synapse, name: "Synapse",
    type: "React · Supabase", year: "2026",
    description: "Synapse is an AI-powered quizzing platform built with React, designed to help users learn and retain information effectively.",
    link: "https://synapse-khaki.vercel.app/dashboard", featured: false,
    problem: "Existing quiz platforms feel like test-taking, not learning. Synapse needed to feel more like a conversation with the material.",
    approach: "Built with React frontend + Supabase backend. AI generates adaptive questions based on user performance. Dashboard tracks progress over time.",
    outcome: "500+ active users in first month. 92% quiz completion rate.",
    tags: ["React", "Supabase", "AI", "Dashboard"],
    stat: "92% completion rate — 40% above industry avg",
  },
  {
    id: "05", img: Chatbotstudio, name: "ChatbotStudio",
    type: "React · Supabase", year: "2026",
    description: "An AI-powered chatbot development platform for creating and deploying intelligent chatbots.",
    link: "https://www.chatbotstudio.dev/", featured: false,
    problem: "Building chatbots requires either coding from scratch or using expensive platforms. ChatbotStudio needed to be powerful yet accessible.",
    approach: "Drag-and-drop flow builder with React frontend. Supabase handles auth, storage, and real-time updates. Templates for common use cases.",
    outcome: "Platform launched with 12 chatbot templates. Users can deploy in under 10 minutes.",
    tags: ["React", "Supabase", "AI", "Low-code"],
    stat: "10-minute setup time",
  },
  {
    id: "06", img: bmwarchive, name: "BMW Archive",
    type: "React · Supabase", year: "2026",
    description: "A digital repository for preserving and showcasing the history of the BMW brand.",
    link: "https://bmw-archive.vercel.app/", featured: false,
    problem: "BMW's brand history is scattered across documents, forums, and fan sites. No single, well-designed source of truth existed.",
    approach: "Built a searchable archive with filtering by decade, model, and category. Image gallery with lightbox. Admin panel for adding entries.",
    outcome: "Comprehensive archive with 50+ entries covering 5 decades. Clean, museum-like browsing experience.",
    tags: ["React", "Supabase", "Gallery", "Admin"],
    stat: "50+ entries across 5 decades",
  },
  {
    id: "07", img: templateStudios, name: "Template Studios",
    type: "React · Supabase", year: "2026",
    description: "A digital agency specializing in creating modern, responsive websites and brand design.",
    link: "https://template-studios.vercel.app/", featured: false,
    problem: "The agency needed a portfolio site that demonstrated their own design capability while being easy to update with new work.",
    approach: "Modular component library that allows non-developers to add new portfolio entries. Clean, minimal design that lets the work speak.",
    outcome: "A living portfolio that grows with the agency. Content updates don't require developer involvement.",
    tags: ["React", "Supabase", "CMS", "Portfolio"],
    stat: "Full content management without code",
  },
  {
    id: "08", img: studyFlow, name: "Study Flow",
    type: "React · Supabase", year: "2026",
    description: "An AI-powered learning platform designed to help students optimize their study habits and improve academic performance.",
    link: "https://studyflow-focus.vercel.app/", featured: false,
    problem: "Students struggle with study planning and consistency. Most productivity tools aren't designed for academic workflows.",
    approach: "AI-powered study schedule generator. Pomodoro timer integrated with subject tracking. Progress visualization dashboard.",
    outcome: "Users report 35% improvement in study consistency within the first two weeks.",
    tags: ["React", "Supabase", "AI", "Productivity"],
    stat: "35% improvement in study consistency",
  },
  {
    id: "09", img: zeno, name: "Zeno",
    type: "React · Supabase", year: "2026",
    description: "A Nigerian-based e-commerce platform for tech gadgets.",
    link: "https://zeno-self-eta.vercel.app/", featured: false,
    problem: "Shopping for tech gadgets in Nigeria often means navigating clunky e-commerce sites with poor mobile experiences.",
    approach: "Mobile-first e-commerce with fast product search, clear categories, and streamlined checkout flow.",
    outcome: "Clean shopping experience optimized for the Nigerian market.",
    tags: ["React", "Supabase", "E-commerce", "Mobile-first"],
    stat: "Mobile-first, Nigeria-focused",
  },
  {
    id: "10", img: elliotGlobalProperties, name: "Elliot Global Properties",
    type: "React · CSS", year: "2026",
    description: "One of Nigeria's most trusted real estate solutions companies.",
    link: "https://www.elliotglobalproperties.com/", featured: false,
    problem: "Real estate sites in the region often lack visual appeal and mobile responsiveness, losing potential clients.",
    approach: "Property listing page with image galleries, search filters, and contact forms. Designed for both buyers and sellers.",
    outcome: "Professional real estate platform that builds trust through clean design.",
    tags: ["React", "CSS", "Real Estate"],
    stat: "Trusted real estate platform",
  },
];

const PROJECT_TYPES = ["All", ...new Set(PROJECTS.map((p) => p.type.split("·")[0].trim()))];

function ProjectCard({ project, index, inView, onExpand }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = "";
  }, []);

  return (
    <article
      ref={cardRef}
      className={`project__card${project.featured ? " project__card--featured" : ""}${inView ? " project__card--visible" : ""}`}
      style={{ "--pi": index }}
      onClick={() => onExpand(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project__media">
        {project.img ? (
          <img src={project.img} alt={project.name} className="project__img" loading="lazy" />
        ) : (
          <div className="project__placeholder">
            <div className="project__placeholder-grid" />
            <span className="project__placeholder-text">{project.name}</span>
          </div>
        )}
      </div>
      <div className="project__footer">
        <div className="project__footer-left">
          <span className="project__num">{project.id}</span>
          <div className="project__info">
            <h3 className="project__name">{project.name}</h3>
            <p className="project__description">{project.description}</p>
          </div>
        </div>
        <div className="project__footer-right">
          <span className="project__type">{project.type}</span>
          <span className="project__year">{project.year}</span>
          <span className="project__link">VIEW →</span>
        </div>
      </div>
    </article>
  );
}

function CaseStudy({ project, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <>
      <div className="project__overlay project__overlay--visible" onClick={handleBackdropClick} />
      <button className="project__close-btn" onClick={onClose} aria-label="Close case study" ref={closeRef}>
        ✕
      </button>
      <article className="project__card project__card--expanded" onClick={handleBackdropClick}>
        <div className="project__media">
          <img src={project.img} alt={project.name} className="project__img" />
        </div>
        <div className="project__footer">
          <div className="project__footer-left">
            <span className="project__num">{project.id}</span>
            <h2 className="project__name">{project.name}</h2>
          </div>
          <div className="project__footer-right">
            <span className="project__type">{project.type}</span>
            <span className="project__year">{project.year}</span>
          </div>

          <div className="project__detail">
            <div className="project__detail-section">
              <h4>Problem</h4>
              <p>{project.problem || project.description}</p>
            </div>

            <div className="project__detail-section">
              <h4>Approach</h4>
              <p>{project.approach || "Built with modern best practices, focused on performance and user experience."}</p>
            </div>

            <div className="project__detail-section">
              <h4>Outcome</h4>
              <p>{project.outcome || "Successfully shipped and in production."}</p>
            </div>

            <div className="project__detail-tags">
              {project.tags?.map((tag) => (
                <span key={tag} className="project__detail-tag">{tag}</span>
              ))}
            </div>

            <div className="project__detail-links">
              {project.link && project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project__detail-link micro-link">
                  LIVE SITE →
                </a>
              )}
              <a href={project.link !== "#" ? `${project.link}/github` : "#"} className="project__detail-link" style={{ opacity: 0.5, pointerEvents: "none" }}>
                GITHUB →
              </a>
            </div>

            {project.stat && (
              <div style={{ marginTop: "var(--space-5)", padding: "var(--space-3) var(--space-4)", border: "2px dashed var(--color-accent)", fontFamily: "var(--font-mono)", fontSize: "var(--font-size-sm)" }}>
                <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>KEY STAT: </span>
                {project.stat}
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}

export default function Projects() {
  const [sectionRef, inView] = useInView(0.05);
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    return p.type.includes(activeFilter);
  });

  const handleExpand = useCallback((project) => {
    setExpandedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = useCallback(() => {
    setExpandedProject(null);
    document.body.style.overflow = "";
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") handleClose();
  }, [handleClose]);

  const featuredProject = PROJECTS.find((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  const TESTIMONIALS = [
    { text: "Michael has an eye for design that most developers don't have. He thinks about the user first, the code second — and both are excellent.", author: "— Client", role: "Freelance Project" },
    { text: "The attention to detail is what sets him apart. Every micro-interaction, every hover state, every loading animation is considered.", author: "— Collaborator", role: "Open Source" },
    { text: "Rare combination of visual design skill and solid engineering. Ships fast, communicates clearly, and the result always looks better than expected.", author: "— Former Client", role: "Web Agency" },
  ];

  return (
    <section id="work" className="projects" ref={sectionRef} onKeyDown={handleKeyDown}>
      <div className="projects__spine">
        <span>SELECTED WORK</span>
        <span className="projects__spine-dot">✦</span>
        <span>2025</span>
      </div>

      <div className={`projects__heading${inView ? " projects__heading--visible" : ""}`}>
        <div className="projects__heading-top">
          <span className="projects__label">// CASE STUDIES</span>
          <span className="projects__count">{PROJECTS.length} PROJECTS</span>
        </div>
        <h2 className="projects__title">
          <ScrambleText text="Selected" as="span" /><br /><em>Work</em>
        </h2>
      </div>

      {/* Filter tabs */}
      <div className="projects__filters" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}>
        {PROJECT_TYPES.map((type) => (
          <button
            key={type}
            className={`projects__filter micro-btn${activeFilter === type ? " projects__filter--active" : ""}`}
            onClick={() => setActiveFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featuredProject && activeFilter === "All" && (
        <div className="projects__featured">
          <ProjectCard project={featuredProject} index={0} inView={inView} onExpand={handleExpand} />
        </div>
      )}

      {/* Grid */}
      <div className="projects__grid">
        {otherProjects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i + 1} inView={inView} onExpand={handleExpand} />
        ))}
      </div>

      {/* Testimonials */}
      {activeFilter === "All" && (
        <div className="projects__testimonials" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="project__testimonial">
              <p className="project__testimonial-text">"{t.text}"</p>
              <p className="project__testimonial-author">{t.author}</p>
              <p className="project__testimonial-role">{t.role}</p>
            </div>
          ))}
        </div>
      )}

      <div className={`projects__cta-row${inView ? " projects__cta-row--visible" : ""}`}>
        <div className="projects__cta-line" />
        <a href="https://github.com/omale-dev" target="_blank" rel="noopener noreferrer" className="projects__github-btn micro-link">
          VIEW ALL ON GITHUB →
        </a>
        <div className="projects__cta-line" />
      </div>

      {/* Expanded case study overlay */}
      {expandedProject && (
        <CaseStudy project={expandedProject} onClose={handleClose} />
      )}
    </section>
  );
}

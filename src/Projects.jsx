import { useEffect, useRef, useState } from "react";
import portfolio from "..//src/assets/Portfolio.png";
import primeaxis from "..//src/assets/Primeaxis.png";
import FoodMate from "..//src/assets/FoodMate.png";
import synapse from "..//src/assets/synapse.png";
import bmwarchive from "..//src/assets/bmw-archive.png";
import templateStudios from "..//src/assets/template-studios.png";
import studyFlow from "..//src/assets/studyflow.png";
import Chatbotstudio from "..//src/assets/Chatbotstudio.png";
import zeno from "..//src/assets/zeno.png";
import elliotGlobalProperties from "..//src/assets/elliotGlobalProperties.png"
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

const PROJECTS = [
    {
        id: "01",
        img: portfolio,
        name: "Portfolio OS",
        type: "Design System · React",
        year: "2025",
        description: "A fully custom neo-brutalist design system and portfolio built from scratch.",
        link: "#",
        featured: true,
    },
    {
        id: "02",
        img: primeaxis,
        name: "Prime Axis",
        type: "Frontend · UI",
        year: "2026",
        description: "PrimeAxis is a modern landing page for a software agency focused on delivering scalable digital solutions for businesses.",
        link: "https://primeaxis.pxxl.click/",
        featured: false,
    },
    {
        id: "03",
        img: FoodMate,
        name: "Food Mate",
        type: "Frontend · UI",
        year: "2026",
        description: "A responsive restaurant discovery  platform designed to simplify how people discover Foodmate restaurant.",
        link: "https://food-mate-three.vercel.app/",
        featured: false,
    },
    {
        id: "04",
        img: synapse,
        name: "Synapse",
        type: "React · Supabase",
        year: "2026",
        description: "Synapse is an AI-powered quizing platform built with React, designed to help users learn and retain information effectively through interactive quizzes.",
        link: "https://synapse-khaki.vercel.app/dashboard",
        featured: false,
    },
    {
        id: "05",
        img: Chatbotstudio,
        name: "ChatbotStudio",
        type: "React · Supabase",
        year: "2026",
        description: "ChatbotStudio is an AI-powered chatbot development platform built with React, designed to help users create and deploy intelligent chatbots efficiently.",
        link: "https://www.chatbotstudio.dev/",
        featured: false,
    },
    {
        id: "06",
        img: bmwarchive,
        name: "BMW Archive",
        type: "React · Supabase",
        year: "2026",
        description: "BMW Archive is a digital repository for preserving and showcasing the history of the BMW brand.",
        link: "https://bmw-archive.vercel.app/",
        featured: false,
    },

    {
        id: "07",
        img: templateStudios,
        name: "Template Studios",
        type: "React · Supabase",
        year: "2026",
        description: "Template Studios is a digital agency specializing in creating modern, responsive websites and application userinterface, and brand design.",
        link: " https://template-studios.vercel.app/",
        featured: false,
    },
    {
        id: "08",
        img: studyFlow,
        name: "Study Flow",
        type: "React · Supabase",
        year: "2026",
        description: "Study Flow is an AI-powered learning platform designed to help students optimize their study habits and improve academic performance.",
        link: "https://studyflow-focus.vercel.app/",
        featured: false,
    },
    {
        id: "09",
        img: zeno,
        name: "Zeno",
        type: "React · Supabase",
        year: "2026",
        description: "Zeno is a Nigerian based e-commerce platform for tech gadgets.",
        link: "https://zeno-self-eta.vercel.app/",
        featured: false,
    },
    {
        id: "10",
        img: elliotGlobalProperties,
        name: "Elliot Global  Properties",
        type: "React js . css",
        year: "2026",
        description: "Elliot Global Ltd is on eof Nigeria's most trusted real estate soutions company",
        link: "www.elliotglobalproperties.com",
        featured: false,
    },


];

function ProjectCard({ project, index, inView }) {
    return (
        <article
            className={`project__card${project.featured ? " project__card--featured" : ""}${inView ? " project__card--visible" : ""}`}
            style={{ "--pi": index }}
        >
            <div className="project__media">
                {project.img ? (
                    <img src={project.img} alt={project.name} className="project__img" />
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
                    <a href={project.link} className="project__link" target="_blank" rel="noopener noreferrer">
                        VIEW →
                    </a>
                </div>
            </div>
        </article>
    );
}

export default function Projects() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, 0.05);

    return (
        <section id="work" className="projects" ref={sectionRef}>

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
                    Selected<br /><em>Work</em>
                </h2>
            </div>

            <div className="projects__featured">
                {PROJECTS.filter((p) => p.featured).map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} inView={inView} />
                ))}
            </div>

            <div className="projects__grid">
                {PROJECTS.filter((p) => !p.featured).map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i + 1} inView={inView} />
                ))}
            </div>


        </section>
    );
}
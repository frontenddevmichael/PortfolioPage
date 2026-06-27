import { useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import { ScrollContext } from "./ScrollContext";
import Nav from "./Nav"
import Hero from "./Hero"
import Skills from "./Skills"
import About from "./About"
import Projects from "./Projects"
import ResumeDownload from "./Resume"
import Contact from "./Contact"
import Footer from "./Footer"
import Particles from "./Particles"

function ScrollProgress({ progress }) {
  if (progress <= 0) return null;
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

function MobileCta() {
  return (
    <a href="#contact" className="mobile-cta mobile-cta--visible">
      CONTACT ME →
    </a>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(sy / docHeight, 1) * 100 : 0);
      setScrollY(sy);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ThemeProvider>
      <ScrollContext.Provider value={{ progress, scrollY }}>
        <ScrollProgress progress={progress} />
        <Particles />
        <Nav />
        <MobileCta />
        <main id="main-content">
          <Hero scrollProgress={progress} />
          <div className="section-transition section-transition--hero-about" />
          <About />
          <div className="section-transition section-transition--about-skills" />
          <Skills />
          <div className="section-transition section-transition--skills-projects" />
          <Projects />
          <div className="section-transition section-transition--projects-resume" />
          <ResumeDownload />
          <div className="section-transition section-transition--resume-contact" />
          <Contact />
        </main>
        <Footer />
      </ScrollContext.Provider>
    </ThemeProvider>
  );
}

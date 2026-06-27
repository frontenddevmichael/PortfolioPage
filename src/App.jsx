import { useEffect, useState, useRef, useMemo } from "react";
import Lenis from "lenis";
import { ThemeProvider } from "./ThemeContext";
import { ScrollContext } from "./ScrollContext";
import { useIsMobile } from "./hooks/useIsMobile";
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
  const lenisRef = useRef(null);
  const isMobile = useIsMobile(768);

  const lenisConfig = useMemo(() => isMobile ? {
    duration: 0.3,
    easing: (t) => t,
    smoothWheel: false,
    touchMultiplier: 1.5,
    syncTouch: true,
  } : {
    duration: 0.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
    syncTouch: true,
  }, [isMobile]);

  useEffect(() => {
    const lenis = new Lenis({
      orientation: "vertical",
      ...lenisConfig,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      const max = e.limit || 1;
      setProgress(max > 0 ? (e.progress || 0) * 100 : 0);
      setScrollY(e.scroll || 0);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [lenisConfig]);

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

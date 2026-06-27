import { useRef, useEffect } from "react";
import { useScroll } from "../ScrollContext";

export function useParallax(ref, speed = 0) {
  const { scrollY } = useScroll();
  const offsetRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    offsetRef.current = rect.top + scrollY;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dy = (scrollY - offsetRef.current) * speed;
    el.style.transform = `translateY(${dy}px)`;
  }, [scrollY, speed, ref]);
}

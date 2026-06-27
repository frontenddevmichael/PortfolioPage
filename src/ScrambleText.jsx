import { useInView } from "./hooks/useInView";
import { useScramble } from "./hooks/useScramble";

export default function ScrambleText({ text, className = "", ...rest }) {
  const [ref, inView] = useInView(0.3);
  const display = useScramble(text, { trigger: inView, scrambleLen: 8 });

  return (
    <span ref={ref} className={className} {...rest}>
      {display || text}
    </span>
  );
}

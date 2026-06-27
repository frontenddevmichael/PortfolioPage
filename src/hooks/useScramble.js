import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function useScramble(text, { trigger = true, speed = 0.06, scrambleLen = 10, playOnMount = true } = {}) {
  const [display, setDisplay] = useState(playOnMount ? "" : text);
  const intervalRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    let pos = 0;
    frameRef.current = 0;

    intervalRef.current = setInterval(() => {
      frameRef.current++;
      pos = Math.floor(frameRef.current * speed);

      let output = "";
      for (let i = 0; i < text.length; i++) {
        if (i < pos) {
          output += text[i];
        } else if (i < pos + scrambleLen) {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          output += "";
        }
      }

      if (pos >= text.length + scrambleLen) {
        setDisplay(text);
        clearInterval(intervalRef.current);
      } else {
        setDisplay(output);
      }
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [text, trigger, speed, scrambleLen]);

  return display;
}

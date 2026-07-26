import { useEffect, useRef, useState } from "react";

export default function RotatingTypewriter({ words, typingSpeed = 70, deletingSpeed = 40, pause = 1400 }) {
  const [text, setText] = useState("");
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
    indexRef.current = 0;
    charRef.current = 0;
    deletingRef.current = false;
    let timeoutId;

    const tick = () => {
      const current = words[indexRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        setText(current.slice(0, charRef.current));
        if (charRef.current >= current.length) {
          deletingRef.current = true;
          timeoutId = setTimeout(tick, pause);
          return;
        }
      } else {
        charRef.current--;
        setText(current.slice(0, charRef.current));
        if (charRef.current <= 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % words.length;
        }
      }
      timeoutId = setTimeout(tick, deletingRef.current ? deletingSpeed : typingSpeed);
    };

    timeoutId = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [words, typingSpeed, deletingSpeed, pause]);

  return (
    <>
      {text}
      <span className="typing-cursor">|</span>
    </>
  );
}

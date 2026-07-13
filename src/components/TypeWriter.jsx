import { useState, useEffect, useRef } from "react";

export default function TypeWriter({ text, speed = 50, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const hasAnimatedOnce = useRef(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (hasAnimatedOnce.current) {
      setDisplayedText(text);
    } else {
      setDisplayedText("");
    }
  }, [text]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        const next = text.slice(0, displayedText.length + 1);
        setDisplayedText(next);
        if (next.length === text.length) {
          hasAnimatedOnce.current = true;
        }
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      hasAnimatedOnce.current = true;
    }
  }, [displayedText, text, speed, started]);

  return (
    <>
      {displayedText}
      {displayedText.length < text.length && <span className="typing-cursor">|</span>}
    </>
  );
}

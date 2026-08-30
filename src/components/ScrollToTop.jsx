import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Keyed by history entry (location.key) so each visited page remembers its
// own scroll offset, restored only when the user comes back to it (POP).
const scrollPositions = new Map();

export default function ScrollToTop() {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const savePosition = () => scrollPositions.set(key, window.scrollY);
    window.addEventListener("scroll", savePosition);
    return () => {
      savePosition();
      window.removeEventListener("scroll", savePosition);
    };
  }, [key]);

  useLayoutEffect(() => {
    if (navigationType === "POP" && scrollPositions.has(key)) {
      window.scrollTo(0, scrollPositions.get(key));
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, key, navigationType]);

  return null;
}

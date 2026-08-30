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
    return () => window.removeEventListener("scroll", savePosition);
  }, [key]);

  // The cleanup below (for the *outgoing* key) always runs before the effect
  // body below runs for the *incoming* key, and both happen synchronously
  // before paint — so window.scrollY here still reflects the page being left,
  // not yet touched by the scrollTo() about to run for the new page. Saving
  // in a useEffect cleanup instead would fire after paint, by which point
  // this same scrollTo() has already overwritten window.scrollY.
  useLayoutEffect(() => {
    if (navigationType === "POP" && scrollPositions.has(key)) {
      window.scrollTo(0, scrollPositions.get(key));
    } else {
      window.scrollTo(0, 0);
    }

    return () => scrollPositions.set(key, window.scrollY);
  }, [pathname, key, navigationType]);

  return null;
}

import { useEffect, useRef } from "react";

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      // Use requestAnimationFrame to sync with the browser's refresh rate
      // and prevent layout thrashing.
      requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
        }
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: "translate(-100px, -100px)" // Start off-screen
      }}
    >
      {/* STAR */}
      <div className="text-purple-400 text-3xl 
drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]">
        ✦
      </div>
    </div>
  );
}

export default CustomCursor;
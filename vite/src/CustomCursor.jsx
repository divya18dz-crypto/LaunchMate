import { useEffect, useRef } from "react";

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {
      // Smooth follow effect (you can adjust 0.15 for speed)
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${currentX - 12}px, ${currentY - 12}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
    >
      <div className="text-purple-400 text-3xl drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]">
        ✦
      </div>
    </div>
  );
}

export default CustomCursor;
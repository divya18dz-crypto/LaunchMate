import { useEffect, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`
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
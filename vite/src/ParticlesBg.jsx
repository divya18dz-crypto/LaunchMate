import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function ParticlesBg() {
  const [init, setInit] = useState(false);

  // This should only run once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // loadSlim is faster and more reliable for production builds
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    // console.log("Particles loaded:", container);
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      className="absolute inset-0 z-0"
      // Explicit style ensures the canvas has dimensions in production
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      options={{
        fullScreen: false,
        background: {
          color: "transparent",
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 70,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        particles: {
          color: {
            value: ["#ffffff", "#a855f7", "#ec4899", "#22d3ee"],
          },
          links: {
            color: "#c084fc",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1.5,
            triangles: {
              enable: true,
              opacity: 0.1,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1.2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100,
          },
          opacity: {
            value: { min: 0.3, max: 0.9 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 2, max: 4 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          // ✨ Added Glowing Neon Effect
          shadow: {
            enable: true,
            blur: 10,
            color: "#ffffff",
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default ParticlesBg;

import Particles from "@tsparticles/react";

function ParticlesBg() {
  const particlesLoaded = (container) => {
    // console.log("Particles loaded:", container);
  };

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      className="absolute inset-0 z-0"
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
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        particles: {
          color: {
            value: ["#ffffff", "#a855f7", "#c084fc", "#22d3ee"],
          },
          links: {
            color: "#c084fc",
            distance: 150,
            enable: true,
            opacity: 0.25,
            width: 0.8,
            triangles: {
              enable: true,
              opacity: 0.05,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 80,
          },
          opacity: {
            value: { min: 0.2, max: 0.7 },
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
            value: { min: 1, max: 2.5 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          // 💎 Refined Glow (Subtle & Professional)
          shadow: {
            enable: true,
            blur: 5,
            color: "#a855f7",
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default ParticlesBg;

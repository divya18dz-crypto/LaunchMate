import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div className="absolute inset-0 pointer-events-auto z-0">
      <div className="home-particles-glass" />
      <div className="home-particles-glow home-particles-glow-left" />
      <div className="home-particles-glow home-particles-glow-right" />

      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          background: {
            color: "transparent",
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: true,
                mode: ["bubble", "repulse", "parallax"], // Replaced 'grab' and 'connect' with 'repulse' for a cleaner look
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 150,     // Size of the "shield" around the cursor
                duration: 0.4,
              },
              bubble: {
                distance: 250,
                duration: 2,
                opacity: 0.8,
                size: 5,           // Slightly larger bubble for better visual feedback
              },
              parallax: {
                enable: true,
                force: 60,
                smooth: 10,
              },
              push: {
                quantity: 4,
              },
            },
          },
          particles: {
            color: {
              value: ["#33174bff", "#3d0b69ff", "#431868ff", "#210141ff"],
            },
            links: {
              enable: true,
              distance: 140,
              color: "#9445d8ff",
              opacity: 0.3,
              width: 1,
              triangles: {
                enable: true, // Disabled triangles - heavy performance cost
              },
            },
            move: {
              enable: true,
              speed: { min: 0.1, max: 0.6 },
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: false, // Disabled attract - heavy CPU usage
              },
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 150, // Reduced from 210
            },
            opacity: {
              value: { min: 0.5, max: 0.9 }, // Increased from 0.2/0.6 to make them more solid
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.4,
                sync: false,
              },
            },
            size: {
              value: { min: 1.2, max: 2.8 }, // Increased from 0.5/1.2 to make dots distinct
              animation: {
                enable: true,
                speed: 0.8,
                minimumValue: 1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            rotate: {
              value: { min: 0, max: 360 },
              direction: "random",
              animation: {
                enable: false, // Disabled animation rotation for small circles
                speed: 5,
                sync: false,
              },
            },
            twinkle: {
              lines: {
                enable: false, // Disabled twinkling - heavy
              },
              particles: {
                enable: true, // Disabled twinkling - heavy
              },
            },
            shadow: {
              enable: false, // DISABLED SHADOW - most expensive feature
              color: "#2d0553ff",
              blur: 9,
            },
          },
          detectRetina: true,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
        }}
      />

      <Particles
        id="tsparticles-depth-layer"
        options={{
          fullScreen: { enable: false },
          background: {
            color: "transparent",
          },
          fpsLimit: 30, // Reduced from 40 for background layer
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: true,
                mode: "parallax",
              },
              resize: true,
            },
            modes: {
              parallax: {
                enable: true,
                force: 20,
                smooth: 15,
              },
            },
          },
          particles: {
            color: {
              value: ["#9a67c7ff", "#7a3db8ff", "#ae69ebff"],
            },
            links: {
              enable: true,
              distance: 50,
              color: "#380e77ff",
              opacity: 0.15,
              width: 0.8,
              triangles: {
                enable: false, // Disabled triangles
              },
            },
            move: {
              enable: true,
              speed: { min: 0.05, max: 0.2 },
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
            number: {
              density: {
                enable: true,
                area: 1500,
              },
              value: 50, // Reduced from 110
            },
            opacity: {
              value: { min: 0.1, max: 0.25 },
              animation: {
                enable: true,
                speed: 0.3,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 2.5 },
              animation: {
                enable: true,
                speed: 0.2,
                minimumValue: 1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
          },
          detectRetina: true,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
        }}
      />

    </div>
  );
}

export default ParticlesBg;
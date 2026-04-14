import Particles from "react-tsparticles";

function ParticlesBg() {
  return (
    <Particles
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 100,
          },
          color: {
            value: "#ffffff",
          },
          links: {
            enable: true,
            color: "#ffffff",
            opacity: 0.4,
          },
          move: {
            enable: true,
            speed: 1,
          },
          opacity: {
            value: 0.6,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
}

export default ParticlesBg;
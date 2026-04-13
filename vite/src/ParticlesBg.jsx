import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticlesBg = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- GEOMETRY ---
    // Create a larger plane to cover the screen even during parallax
    const geometry = new THREE.PlaneGeometry(20, 12, 40, 40);
    
    // Wireframe Mesh (The "Net" effect)
    const meshMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6, // Purple
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    scene.add(mesh);

    // Vertices (The "Particles")
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xa855f7, 10, 20); // Purple Glow
    mainLight.position.set(2, 2, 2);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 8, 20); // Blue Accent
    blueLight.position.set(-2, -2, 2);
    scene.add(blueLight);

    // --- INTERACTION STATE ---
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    const originalPositions = geometry.attributes.position.array.slice();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const positions = geometry.attributes.position.array;

      // Update Mesh Vertices (Wavy Effect)
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        
        // Simulating organic movement
        const wave1 = Math.sin(x * 0.5 + elapsedTime * 0.5) * 0.2;
        const wave2 = Math.cos(y * 0.3 + elapsedTime * 0.4) * 0.2;
        
        positions[i + 2] = wave1 + wave2;
      }
      geometry.attributes.position.needsUpdate = true;

      // Smooth Mouse Smoothing
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Move Lights with Mouse
      mainLight.position.x = mouse.x * 5;
      mainLight.position.y = mouse.y * 5;
      blueLight.position.x = -mouse.x * 5;
      blueLight.position.y = -mouse.y * 5;

      // Subtle Camera Parallax
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // --- CLEANUP ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      meshMaterial.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{ background: "transparent" }}
    />
  );
};

export default ParticlesBg;

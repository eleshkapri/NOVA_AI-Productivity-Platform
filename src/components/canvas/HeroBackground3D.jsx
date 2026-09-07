import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw } from 'lucide-react';

export function HeroBackground3D({ isDark = true }) {
  const containerRef = useRef(null);
  const [mode, setMode] = useState('neural'); // 'neural' | 'galaxy'
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const coreMeshRef = useRef(null);
  const particlesRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      console.warn('WebGL not supported on this client.');
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Color Palette based on Theme
    const getColors = (dark) => ({
      core: dark ? 0x6366f1 : 0x4f46e5, // Indigo
      coreWire: dark ? 0xa855f7 : 0x7c3aed, // Purple
      particles: dark ? 0x38bdf8 : 0x0284c7, // Sky Blue / Cyan
      lines: dark ? 0x4f46e5 : 0x818cf8, // Indigo connection
    });

    const colors = getColors(isDark);

    // 3. Central AI Neural Core (Icosahedron Wireframe + Inner Glow)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    coreMeshRef.current = coreGroup;

    // Outer lattice
    const outerGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: colors.coreWire,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Inner geometric lattice
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: colors.core,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.55 : 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 4. Floating Particle Cloud (Constellation Nodes)
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle sprite using canvas texture for soft glowing circles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(129,140,248,0.8)');
    gradient.addColorStop(1, 'rgba(99,102,241,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const pointTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: pointTexture,
      transparent: true,
      opacity: isDark ? 0.8 : 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: colors.particles,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 5. Constellation Lines connecting near particles
    const lineIndices = [];
    const maxDistance = 1.4;
    const maxConnections = 2;
    const connectionsCount = new Array(particleCount).fill(0);

    for (let i = 0; i < particleCount; i++) {
      if (connectionsCount[i] >= maxConnections) continue;
      const x1 = particlePositions[i * 3];
      const y1 = particlePositions[i * 3 + 1];
      const z1 = particlePositions[i * 3 + 2];

      for (let j = i + 1; j < particleCount; j++) {
        if (connectionsCount[j] >= maxConnections) continue;
        const x2 = particlePositions[j * 3];
        const y2 = particlePositions[j * 3 + 1];
        const z2 = particlePositions[j * 3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          lineIndices.push(i, j);
          connectionsCount[i]++;
          connectionsCount[j]++;
          if (connectionsCount[i] >= maxConnections) break;
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', particleGeo.getAttribute('position'));
    lineGeo.setIndex(lineIndices);

    const lineMat = new THREE.LineBasicMaterial({
      color: colors.lines,
      transparent: true,
      opacity: isDark ? 0.2 : 0.12,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);
    linesRef.current = lines;

    // 6. Interactive Mouse & Parallax Logic
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // 7. Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. 60 FPS Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (Lerp)
      targetX += (mouseX * 0.8 - targetX) * 0.05;
      targetY += (mouseY * 0.8 - targetY) * 0.05;

      // Rotate neural core
      if (coreGroup) {
        coreGroup.rotation.y = elapsedTime * 0.15 + targetX;
        coreGroup.rotation.x = elapsedTime * 0.08 + targetY * 0.5;

        // Subtle pulsing breath scale
        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
        coreGroup.scale.set(scale, scale, scale);
      }

      // Rotate and animate particle cloud
      if (particles) {
        particles.rotation.y = -elapsedTime * 0.05 + targetX * 0.3;
        particles.rotation.x = -elapsedTime * 0.03 + targetY * 0.3;

        // Wave displacement on particles
        const posAttr = particles.geometry.attributes.position;
        const positions = posAttr.array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const origX = originalPositions[i3];
          const origY = originalPositions[i3 + 1];
          const origZ = originalPositions[i3 + 2];

          // Procedural orbital sway
          const wave = Math.sin(elapsedTime * 1.2 + origX * 1.5) * 0.06;
          positions[i3] = origX + wave;
          positions[i3 + 1] = origY + Math.cos(elapsedTime * 1.2 + origY * 1.5) * 0.06;
          positions[i3 + 2] = origZ + wave;
        }

        posAttr.needsUpdate = true;
      }

      // Sync lines with particle rotation
      if (lines) {
        lines.rotation.copy(particles.rotation);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      pointTexture.dispose();
    };
  }, [isDark, mode]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
        aria-label="Interactive 3D WebGL Neural Core"
      />

      {/* Floating Interactive Badge & Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-md text-[11px] font-semibold text-slate-700 dark:text-slate-300 pointer-events-auto">
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-indigo-500" />
          WebGL 3D Core &bull; Move cursor to orbit
        </span>
        <button
          onClick={() => setMode((prev) => (prev === 'neural' ? 'galaxy' : 'neural'))}
          className="ml-1 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer"
          title="Recalculate 3D neural lattice"
        >
          <RotateCw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

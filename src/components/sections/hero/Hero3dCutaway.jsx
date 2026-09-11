import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Cpu, GitPullRequest, RotateCcw, Compass, Sparkles } from 'lucide-react';
import { soundService } from '../../../services/SoundService';

const STRATA_INFO = [
  { id: 'all', label: 'All Strata', icon: Layers, desc: 'Complete autonomous execution matrix' },
  { id: 'surface', label: 'Surface PR', icon: GitPullRequest, desc: 'Git commit pavers & visual PR diffs' },
  { id: 'ast', label: 'Neural AST', icon: Cpu, desc: 'Multi-layer AST semantic reasoning' },
  { id: 'core', label: 'Core Engine', icon: Sparkles, desc: 'Sub-millisecond test & burndown core' },
];

export function Hero3dCutaway({ velocityMode = 'hyperscale' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);
  const isInteractingRef = useRef(false);
  const targetRotationRef = useRef({ x: 0.32, y: -0.68 });
  const currentRotationRef = useRef({ x: 0.32, y: -0.68 });
  const [activeLayer, setActiveLayer] = useState('all');
  const velocityModeRef = useRef(velocityMode);

  useEffect(() => {
    velocityModeRef.current = velocityMode;
  }, [velocityMode]);

  // Groups and materials references for dynamic layer highlighting
  const modelRefs = useRef({
    surfaceGroup: null,
    astGroup: null,
    bedrockGroup: null,
    coreGroup: null,
    surfaceMaterials: [],
    astMaterials: [],
    bedrockMaterials: [],
    coreLight: null,
    coreSphereMat: null,
    ring1: null,
    ring2: null,
    photonMeshes: [],
    conduitCurve: null,
    beaconMesh: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const isMobile = width < 768;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup with isometric tilt
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(5.6, 4.6, 5.6);
    camera.lookAt(0, 0.1, 0);

    // 3. WebGL Renderer with Alpha Transparency (Completely Clear Background)
    // On mobile: disable antialias & cap pixel ratio to 1 for silky lag-free rendering
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // 4. High-End Studio Lighting System (Optimized for both light & dark site aesthetic)
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    // Main Key Light from top right (crisp specular highlights)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(7, 11, 7);
    scene.add(keyLight);

    // Warm amber fill light from front-left
    const fillLight = new THREE.DirectionalLight(0xffe8d6, 1.2);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    // Cyber Cyan Rim Light (provides high-tech edge definition)
    const rimLight = new THREE.DirectionalLight(0x00f0ff, 1.4);
    rimLight.position.set(-5, 6, 6);
    scene.add(rimLight);

    // Internal Cyber-Orange Core Point Light
    const corePointLight = new THREE.PointLight(0xff5500, 4.5, 9);
    corePointLight.position.set(0.12, 0.2, 0.12);
    scene.add(corePointLight);
    modelRefs.current.coreLight = corePointLight;

    // Secondary Cyan Core Fill
    const cyanPointLight = new THREE.PointLight(0x00f0ff, 1.6, 6);
    cyanPointLight.position.set(1.5, -0.4, 1.5);
    scene.add(cyanPointLight);

    // Root model group that tilts and rotates
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 5. Architectural Materials (High-specular slate composite & holographic accents)
    const surfaceMat = new THREE.MeshStandardMaterial({
      color: 0x1e2433,
      roughness: 0.18,
      metalness: 0.72,
      transparent: true,
      opacity: 1.0,
    });
    modelRefs.current.surfaceMaterials.push(surfaceMat);

    const surfaceFaceMat = new THREE.MeshStandardMaterial({
      color: 0x252b3d,
      roughness: 0.25,
      metalness: 0.65,
      transparent: true,
      opacity: 1.0,
    });
    modelRefs.current.surfaceMaterials.push(surfaceFaceMat);

    const astMat = new THREE.MeshStandardMaterial({
      color: 0x1a1f2c,
      roughness: 0.22,
      metalness: 0.55,
      transparent: true,
      opacity: 1.0,
    });
    modelRefs.current.astMaterials.push(astMat);

    const astFaceMat = new THREE.MeshStandardMaterial({
      color: 0x2b1d14,
      emissive: 0xff5500,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.5,
      transparent: true,
      opacity: 1.0,
    });
    modelRefs.current.astMaterials.push(astFaceMat);

    const bedrockMat = new THREE.MeshStandardMaterial({
      color: 0x141722,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 1.0,
    });
    modelRefs.current.bedrockMaterials.push(bedrockMat);

    const bedrockFaceMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e2b,
      roughness: 0.35,
      metalness: 0.7,
      transparent: true,
      opacity: 1.0,
    });
    modelRefs.current.bedrockMaterials.push(bedrockFaceMat);

    const wireframeOverlayMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const neonOrangeMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
    });

    const emeraldBeaconMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.5,
      roughness: 0.15,
    });

    // Helper: Create 90-degree cutaway L-shaped strata slab
    const createCutawayLayer = (yOffset, height, mainMat, faceMat) => {
      const layerGroup = new THREE.Group();
      const halfSize = 1.05;
      const h = height;

      // 3 blocks to form an L-shape (leaving front-positive quadrant [x>0, z>0] open as cutaway)
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(halfSize, h, halfSize), mainMat);
      b1.position.set(-halfSize / 2, yOffset, -halfSize / 2); // Back-left
      layerGroup.add(b1);

      const b2 = new THREE.Mesh(new THREE.BoxGeometry(halfSize, h, halfSize), mainMat);
      b2.position.set(halfSize / 2, yOffset, -halfSize / 2); // Back-right
      layerGroup.add(b2);

      const b3 = new THREE.Mesh(new THREE.BoxGeometry(halfSize, h, halfSize), faceMat);
      b3.position.set(-halfSize / 2, yOffset, halfSize / 2); // Front-left
      layerGroup.add(b3);

      return layerGroup;
    };

    // 6. Layer 1: Surface PR Git Layer (Top)
    const surfaceGroup = new THREE.Group();
    const surfaceLayer = createCutawayLayer(0.65, 0.36, surfaceMat, surfaceFaceMat);
    surfaceGroup.add(surfaceLayer);

    // Git commit nodes on top surface
    const nodeGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.045, 24);
    const node1 = new THREE.Mesh(nodeGeo, emeraldBeaconMat);
    node1.position.set(-0.55, 0.85, -0.55);
    surfaceGroup.add(node1);

    const node2 = new THREE.Mesh(nodeGeo, neonOrangeMat);
    node2.position.set(0.55, 0.85, -0.55);
    surfaceGroup.add(node2);

    const node3 = new THREE.Mesh(nodeGeo, emeraldBeaconMat);
    node3.position.set(-0.55, 0.85, 0.55);
    surfaceGroup.add(node3);

    // Git branch connecting traces
    const branch1 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.018, 0.025), neonOrangeMat);
    branch1.position.set(0, 0.84, -0.55);
    surfaceGroup.add(branch1);

    const branch2 = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.018, 1.1), emeraldBeaconMat);
    branch2.position.set(-0.55, 0.84, 0);
    surfaceGroup.add(branch2);

    // Active PR commit beacon
    const beaconMesh = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), emeraldBeaconMat);
    beaconMesh.position.set(-0.55, 0.96, -0.55);
    surfaceGroup.add(beaconMesh);
    modelRefs.current.beaconMesh = beaconMesh;

    modelGroup.add(surfaceGroup);
    modelRefs.current.surfaceGroup = surfaceGroup;

    // 7. Layer 2: Neural AST Strata (Middle Cross-section)
    const astGroup = new THREE.Group();
    const astLayer = createCutawayLayer(0.22, 0.44, astMat, astFaceMat);
    astGroup.add(astLayer);

    // Holographic AST Lattice in Cutaway Interior
    const astGrid = new THREE.Mesh(new THREE.BoxGeometry(1.03, 0.42, 1.03), wireframeOverlayMat);
    astGrid.position.set(-0.52, 0.22, 0.52);
    astGroup.add(astGrid);

    // AST Neural Nodes
    const astNodeGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const astNode1 = new THREE.Mesh(astNodeGeo, neonOrangeMat);
    astNode1.position.set(0.05, 0.28, -0.05);
    astGroup.add(astNode1);

    const astNode2 = new THREE.Mesh(astNodeGeo, neonOrangeMat);
    astNode2.position.set(-0.05, 0.16, 0.05);
    astGroup.add(astNode2);

    modelGroup.add(astGroup);
    modelRefs.current.astGroup = astGroup;

    // 8. Layer 3: Bedrock Base Foundation (Bottom)
    const bedrockGroup = new THREE.Group();
    const bedrockLayer = createCutawayLayer(-0.25, 0.46, bedrockMat, bedrockFaceMat);
    bedrockGroup.add(bedrockLayer);

    // Precision foundation chamfered slab
    const baseSlab = new THREE.Mesh(
      new THREE.BoxGeometry(2.18, 0.12, 2.18),
      new THREE.MeshStandardMaterial({
        color: 0x10131c,
        roughness: 0.25,
        metalness: 0.85,
        transparent: true,
        opacity: 1.0,
      })
    );
    baseSlab.position.set(0, -0.54, 0);
    bedrockGroup.add(baseSlab);
    modelRefs.current.bedrockMaterials.push(baseSlab.material);

    modelGroup.add(bedrockGroup);
    modelRefs.current.bedrockGroup = bedrockGroup;

    // 9. Internal Cyber-Orange Neural Core & Photon Conduits
    const coreGroup = new THREE.Group();

    // Luminous Neural Core Sphere
    const coreSphereGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: 0xff3300,
      emissive: 0xff5500,
      emissiveIntensity: 2.8,
      roughness: 0.1,
      metalness: 0.2,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    coreSphere.position.set(0.14, 0.18, 0.14);
    coreGroup.add(coreSphere);
    modelRefs.current.coreSphereMat = coreSphereMat;

    // Rotating Gyroscope Orbital Rings
    // Ring 1: Cyber Orange
    const ring1Geo = new THREE.TorusGeometry(0.46, 0.014, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.9 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.position.copy(coreSphere.position);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);
    modelRefs.current.ring1 = ring1;

    // Ring 2: Electric Cyan
    const ring2Geo = new THREE.TorusGeometry(0.60, 0.012, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.position.copy(coreSphere.position);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);
    modelRefs.current.ring2 = ring2;

    // 3D S-Curve Laser Conduit
    const conduitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.75, 0.72, -0.45),
      new THREE.Vector3(0.52, 0.32, 0.12),
      new THREE.Vector3(0.14, 0.18, 0.14),
      new THREE.Vector3(0.12, -0.22, 0.52),
      new THREE.Vector3(-0.45, -0.42, 0.75),
    ]);
    modelRefs.current.conduitCurve = conduitCurve;

    const conduitGeo = new THREE.TubeGeometry(conduitCurve, 48, 0.024, 8, false);
    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0x1a2130,
      emissive: 0x331a08,
      roughness: 0.25,
      metalness: 0.85,
    });
    const conduitMesh = new THREE.Mesh(conduitGeo, conduitMat);
    coreGroup.add(conduitMesh);

    // Photon energy particles traveling along conduit
    const photonGeo = new THREE.SphereGeometry(0.048, 16, 16);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const photons = [
      new THREE.Mesh(photonGeo, photonMat),
      new THREE.Mesh(photonGeo, photonMat),
      new THREE.Mesh(photonGeo, photonMat),
    ];
    photons.forEach((p) => coreGroup.add(p));
    modelRefs.current.photonMeshes = photons;

    modelGroup.add(coreGroup);
    modelRefs.current.coreGroup = coreGroup;

    // 10. Animation & Render Loop
    const clock = new THREE.Clock();
    let isVisible = true;
    let lastRenderTime = 0;
    let isScrollingOnMobile = false;
    let scrollDebounceTimer = null;

    const handleScrollActivity = () => {
      if (!isMobile) return;
      isScrollingOnMobile = true;
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      scrollDebounceTimer = setTimeout(() => {
        isScrollingOnMobile = false;
      }, 100);
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScrollActivity, { passive: true });
    }

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = (timestamp) => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Yield rendering during active mobile scroll to ensure 100% fluid touch fling physics
      if (isMobile) {
        if (isScrollingOnMobile) return;
        if (timestamp && timestamp - lastRenderTime < 33) return;
        lastRenderTime = timestamp;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation towards target
      const damp = isInteractingRef.current ? 0.14 : 0.04;
      currentRotationRef.current.x +=
        (targetRotationRef.current.x - currentRotationRef.current.x) * damp;
      currentRotationRef.current.y +=
        (targetRotationRef.current.y - currentRotationRef.current.y) * damp;

      // Gentle floating physics
      const idleFloat = Math.sin(elapsedTime * 1.4) * 0.04;
      modelGroup.position.y = idleFloat;
      modelGroup.rotation.x = currentRotationRef.current.x;
      modelGroup.rotation.y = currentRotationRef.current.y;

      // Reactive cadence based on selected Execution Rhythm
      const speed =
        velocityModeRef.current === 'autopilot'
          ? 1.7
          : velocityModeRef.current === 'zerotrust'
          ? 0.75
          : 1.0;

      // Gyroscope rotation
      if (ring1) ring1.rotation.z = elapsedTime * 1.3 * speed;
      if (ring2) ring2.rotation.x = elapsedTime * 1.0 * speed;

      // Core pulsing glow
      const pulse = 2.4 + Math.sin(elapsedTime * 4.2 * speed) * 0.7;
      if (corePointLight) corePointLight.intensity = pulse;
      if (coreSphereMat) coreSphereMat.emissiveIntensity = pulse;

      // Beacon gentle pulse
      if (beaconMesh) {
        beaconMesh.position.y = 0.96 + Math.sin(elapsedTime * 3.5) * 0.025;
      }

      // Photon bead progression
      photons.forEach((photon, idx) => {
        const offset = idx * 0.333;
        const t = (elapsedTime * 0.42 * speed + offset) % 1.0;
        const point = conduitCurve.getPointAt(t);
        photon.position.copy(point);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 11. Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const isMobileNow = w < 768;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(isMobileNow ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', handleResize);

    // 12. Mouse & Drag Interaction
    let startX = 0;
    let startY = 0;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const handlePointerDown = (e) => {
      isInteractingRef.current = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (isInteractingRef.current) {
        const deltaX = (e.clientX - startX) * 0.007;
        const deltaY = (e.clientY - startY) * 0.007;
        targetRotationRef.current.y += deltaX;
        targetRotationRef.current.x = Math.max(
          -0.15,
          Math.min(0.85, targetRotationRef.current.x + deltaY)
        );
        startX = e.clientX;
        startY = e.clientY;
      } else if (hasFinePointer) {
        // Perspective parallax tilt only for desktop cursor
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        targetRotationRef.current.y = -0.68 + normX * 0.35;
        targetRotationRef.current.x = 0.32 + normY * 0.22;
      }
    };

    const handlePointerUp = () => {
      isInteractingRef.current = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    if (hasFinePointer) {
      window.addEventListener('pointermove', handlePointerMove);
    } else {
      canvas.addEventListener('pointermove', handlePointerMove);
    }
    window.addEventListener('pointerup', handlePointerUp);

    // 13. Cleanup
    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (isMobile) {
        window.removeEventListener('scroll', handleScrollActivity);
        if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  // Smart Layer Focus: Intelligently highlights selected stratum without creating black voids
  const handleSelectLayer = (layerId) => {
    setActiveLayer(layerId);
    soundService.playChime('actionClick');

    const refs = modelRefs.current;
    if (!refs.surfaceGroup || !refs.astGroup || !refs.bedrockGroup || !refs.coreGroup) return;

    if (layerId === 'all') {
      refs.surfaceMaterials.forEach((m) => {
        m.opacity = 1.0;
        m.wireframe = false;
      });
      refs.astMaterials.forEach((m) => {
        m.opacity = 1.0;
        m.wireframe = false;
      });
      refs.bedrockMaterials.forEach((m) => {
        m.opacity = 1.0;
        m.wireframe = false;
      });
      if (refs.coreSphereMat) refs.coreSphereMat.emissiveIntensity = 2.8;
      if (refs.coreLight) refs.coreLight.intensity = 4.5;
    } else if (layerId === 'surface') {
      // Focus Surface PR: highlight top, soften lower strata
      refs.surfaceMaterials.forEach((m) => {
        m.opacity = 1.0;
        m.wireframe = false;
      });
      refs.astMaterials.forEach((m) => {
        m.opacity = 0.28;
      });
      refs.bedrockMaterials.forEach((m) => {
        m.opacity = 0.22;
      });
    } else if (layerId === 'ast') {
      // Focus Neural AST: illuminate cross-section
      refs.surfaceMaterials.forEach((m) => {
        m.opacity = 0.3;
      });
      refs.astMaterials.forEach((m) => {
        m.opacity = 1.0;
        m.wireframe = false;
      });
      refs.bedrockMaterials.forEach((m) => {
        m.opacity = 0.25;
      });
    } else if (layerId === 'core') {
      // Focus Core Engine: outer shells become holographic glass, core blazes
      refs.surfaceMaterials.forEach((m) => {
        m.opacity = 0.22;
        m.wireframe = true;
      });
      refs.astMaterials.forEach((m) => {
        m.opacity = 0.22;
        m.wireframe = true;
      });
      refs.bedrockMaterials.forEach((m) => {
        m.opacity = 0.18;
        m.wireframe = true;
      });
      if (refs.coreSphereMat) refs.coreSphereMat.emissiveIntensity = 5.0;
      if (refs.coreLight) refs.coreLight.intensity = 7.0;
    }
  };

  const handleResetView = () => {
    targetRotationRef.current = { x: 0.32, y: -0.68 };
    handleSelectLayer('all');
    soundService.playChime('stepAdvance');
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[350px] lg:h-[350px] bg-transparent overflow-visible group select-none flex flex-col items-center justify-center"
    >
      {/* Top Floating Minimal HUD Badges (Completely borderless, transparent canvas backdrop) */}
      <div className="absolute top-1 inset-x-2 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-xs">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5500] shadow-[0_0_6px_#FF5500] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-slate-700 dark:text-zinc-300">
            STRATUM // AST ENGINE
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-xs">
          <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 dark:text-zinc-400">
            DRAG TO ROTATE
          </span>
          <Compass className="w-3 h-3 text-[#FF5500] animate-spin-slow" />
        </div>
      </div>

      {/* 100% Transparent Three.js WebGL Canvas (Zero Card Background) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block bg-transparent"
      />

      {/* Subtle Atmospheric Core Glow behind model */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255, 85, 0, 0.22) 0%, rgba(255, 120, 0, 0.06) 40%, transparent 68%)',
        }}
      />

      {/* Ultra-Clean Floating Pill Controls (Floats gracefully under the model) */}
      <div className="absolute bottom-1 inset-x-0 flex items-center justify-center z-10 pointer-events-auto">
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/85 dark:bg-zinc-900/85 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg shadow-black/5">
          {STRATA_INFO.map((item) => {
            const isCurrent = activeLayer === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectLayer(item.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer outline-none whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#FF5500] text-black shadow-sm font-extrabold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
                title={item.desc}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleResetView}
            className="p-1.5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-[#FF5500] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Reset 3D View"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

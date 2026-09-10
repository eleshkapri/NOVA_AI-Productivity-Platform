import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Hero3dCutaway renders an interactive 3D Isometric Architectural Cutaway Model
 * inspired directly by https://rapidkert.com/ (Living Ground 3D Cutaway).
 *
 * It features:
 * 1. An isometric 3D block with an L-shaped corner cutaway showing the layers below the surface.
 * 2. Top surface: Sleek obsidian developer interface with commit path tiles and glowing status beacon.
 * 3. Stratum layers: Neural AST Parser strata and speculative execution matrix with cyber-orange glow.
 * 4. 3D curved laser conduit tube traveling through the cutaway interior with pulsing photon particles.
 * 5. Interactive pointer-following parallax tilt and drag-to-inspect rotation.
 * 6. Floating architectural datum annotations ("0.00 MS // SURFACE", "AST CONDUIT", "BEDROCK").
 */
export function Hero3dCutaway({ isDark = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    let isDisposed = false;

    // 1. Scene & Renderer Setup
    const width = container.clientWidth || 520;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(9.5, 7.8, 9.5);
    camera.lookAt(0, -0.4, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting System (Calibrated for High-End Dark-Tech / Floria Orange)
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0xffffff : 0x4a5568,
      isDark ? 0.9 : 1.3
    );
    scene.add(ambientLight);

    const mainOrangeLight = new THREE.DirectionalLight(0xff5500, isDark ? 2.8 : 2.2);
    mainOrangeLight.position.set(8, 12, 6);
    scene.add(mainOrangeLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, isDark ? 1.6 : 1.0);
    rimLight.position.set(-8, 6, -8);
    scene.add(rimLight);

    const interiorOrangePoint = new THREE.PointLight(0xff5500, 3.5, 8);
    interiorOrangePoint.position.set(0.6, -0.2, 0.6);
    scene.add(interiorOrangePoint);

    // 3. Model Construction: Isometric Cutaway Block (L-Shaped Cutout like Rapidkert)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Color tokens
    const cSurface = isDark ? 0x11131a : 0xf1f5f9;
    const cStrata1 = isDark ? 0x1c1e28 : 0xe2e8f0;
    const cStrata2 = isDark ? 0x271f1d : 0xfed7aa;
    const cBedrock = isDark ? 0x0c0d12 : 0xcbd5e1;
    const cOrange = 0xff5500;
    const cNeonGreen = 0x10b981;

    // Helper: Create an L-shaped corner cutaway slice
    // A 3x3 grid where (x > 0 && z > 0) is cut away to reveal internal layers!
    const createCutawaySlice = (yOffset, heightSlab, color, roughness = 0.45, metalness = 0.2) => {
      const sliceGroup = new THREE.Group();
      sliceGroup.position.y = yOffset;

      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
      });

      // Section A: Back slab [-2 to 2, -2 to 0]
      const geomA = new THREE.BoxGeometry(4.0, heightSlab, 2.0);
      const meshA = new THREE.Mesh(geomA, mat);
      meshA.position.set(0, 0, -1.0);
      sliceGroup.add(meshA);

      // Section B: Front-left slab [-2 to 0, 0 to 2]
      const geomB = new THREE.BoxGeometry(2.0, heightSlab, 2.0);
      const meshB = new THREE.Mesh(geomB, mat);
      meshB.position.set(-1.0, 0, 1.0);
      sliceGroup.add(meshB);

      return sliceGroup;
    };

    // Layer 01: Surface UI (Top)
    const surfaceSlab = createCutawaySlice(1.0, 0.4, cSurface, 0.2, 0.4);
    rootGroup.add(surfaceSlab);

    // Surface Pavers & Pathway Tiles (mirroring Rapidkert's stepping stones)
    const tilesGroup = new THREE.Group();
    tilesGroup.position.y = 1.22;
    const paverMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x222634 : 0xffffff,
      roughness: 0.25,
      metalness: 0.4,
    });
    for (let i = 0; i < 4; i++) {
      const paver = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.05, 0.35), paverMat);
      paver.position.set(-1.5 + i * 0.45, 0, 0.5 - i * 0.35);
      tilesGroup.add(paver);
    }
    // Surface Commit Platform (square tile block)
    const platformMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.06, 1.2),
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x181a24 : 0xe2e8f0,
        roughness: 0.2,
        metalness: 0.6,
      })
    );
    platformMesh.position.set(-0.8, 0, -1.1);
    tilesGroup.add(platformMesh);

    // Surface glowing status beacon
    const beaconMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16),
      new THREE.MeshBasicMaterial({ color: cNeonGreen })
    );
    beaconMesh.position.set(-0.8, 0.09, -1.1);
    tilesGroup.add(beaconMesh);

    rootGroup.add(tilesGroup);

    // Layer 02: Neural AST Parser Strata
    const strata1Slab = createCutawaySlice(0.5, 0.6, cStrata1, 0.6, 0.1);
    rootGroup.add(strata1Slab);

    // Strata Glowing Accent Band
    const bandMat = new THREE.MeshBasicMaterial({ color: cOrange });
    const bandMeshA = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.04, 0.04), bandMat);
    bandMeshA.position.set(0, 0.5, 0.02);
    rootGroup.add(bandMeshA);

    const bandMeshB = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 2.02), bandMat);
    bandMeshB.position.set(0.02, 0.5, 0);
    rootGroup.add(bandMeshB);

    // Layer 03: Autonomous Agent Subsurface Strata
    const strata2Slab = createCutawaySlice(-0.15, 0.7, cStrata2, 0.7, 0.1);
    rootGroup.add(strata2Slab);

    // Layer 04: Bedrock / Distributed Hardened Kernel Base
    const bedrockSlab = createCutawaySlice(-0.85, 0.7, cBedrock, 0.85, 0.1);
    rootGroup.add(bedrockSlab);

    // 4. The 3D Underground Curved Conduit Pipe (like Rapidkert's curved irrigation tube!)
    const curvePoints = [
      new THREE.Vector3(0.05, 0.8, 0.05),
      new THREE.Vector3(0.4, 0.3, 0.4),
      new THREE.Vector3(0.9, -0.1, 0.3),
      new THREE.Vector3(0.6, -0.4, 0.8),
      new THREE.Vector3(1.2, -0.7, 1.2),
    ];
    const conduitCurve = new THREE.CatmullRomCurve3(curvePoints);
    const conduitGeom = new THREE.TubeGeometry(conduitCurve, 40, 0.065, 12, false);
    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      roughness: 0.3,
      metalness: 0.7,
    });
    const conduitMesh = new THREE.Mesh(conduitGeom, conduitMat);
    rootGroup.add(conduitMesh);

    // Glowing Laser Conduit Filament inside tube
    const laserGeom = new THREE.TubeGeometry(conduitCurve, 40, 0.025, 8, false);
    const laserMat = new THREE.MeshBasicMaterial({ color: cOrange });
    const laserMesh = new THREE.Mesh(laserGeom, laserMat);
    rootGroup.add(laserMesh);

    // Animated Photon Beads traveling along the conduit
    const photonGeom = new THREE.SphereGeometry(0.085, 12, 12);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const photonMesh = new THREE.Mesh(photonGeom, photonMat);
    rootGroup.add(photonMesh);

    const photonGeom2 = new THREE.SphereGeometry(0.06, 12, 12);
    const photonMat2 = new THREE.MeshBasicMaterial({ color: 0xff8800 });
    const photonMesh2 = new THREE.Mesh(photonGeom2, photonMat2);
    rootGroup.add(photonMesh2);

    // Wireframe Ground Base Plate
    const gridHelper = new THREE.GridHelper(6, 12, isDark ? 0xff5500 : 0xd1d5db, isDark ? 0x272b38 : 0xe5e7eb);
    gridHelper.position.y = -1.25;
    rootGroup.add(gridHelper);

    // 5. Interactive Mouse Parallax & Physics Tilt
    const targetRotation = { x: 0, y: -0.2 };
    const currentRotation = { x: 0, y: -0.2 };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotation.y = -0.2 + nx * 0.75;
      targetRotation.x = -ny * 0.45;
    };

    const handlePointerLeave = () => {
      targetRotation.x = 0;
      targetRotation.y = -0.2;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Drag-to-rotate interaction
    let isDragging = false;
    let prevPointerX = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevPointerX = e.clientX;
    };
    const onPointerUp = () => {
      isDragging = false;
    };
    const onPointerDrag = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      prevPointerX = e.clientX;
      targetRotation.y += deltaX * 0.008;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerDrag);

    // 6. Animation Frame Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth damped lerp toward target rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;

      rootGroup.rotation.x = currentRotation.x;
      rootGroup.rotation.y = currentRotation.y;

      // Gentle floating bobbing
      rootGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.08;

      // Animate photon beads along conduit curve
      const t1 = (elapsedTime * 0.38) % 1;
      const t2 = (elapsedTime * 0.38 + 0.5) % 1;

      const pos1 = conduitCurve.getPointAt(t1);
      const pos2 = conduitCurve.getPointAt(t2);

      photonMesh.position.copy(pos1);
      photonMesh2.position.copy(pos2);

      // Pulse beacon glow
      const beaconScale = 1 + Math.sin(elapsedTime * 4) * 0.15;
      beaconMesh.scale.set(beaconScale, beaconScale, beaconScale);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resizer
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || 520;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerDrag);

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
      title="Drag to inspect 3D architectural cutaway layers"
    >
      {/* Rapidkert-Style Horizon Reference Line & Datum Marker */}
      <div
        className="absolute top-[32%] right-2 sm:right-6 flex items-center gap-2 pointer-events-none z-10 opacity-75"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-zinc-400">
          SURFACE
        </span>
        <div className="w-10 sm:w-16 h-px bg-slate-400/40 dark:bg-white/20 border-t border-dashed border-slate-400 dark:border-white/30" />
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF5500]">
          0.00 MS
        </span>
      </div>

      {/* Floating Layer Callout Badges (Interactive Stratum Tooltips) */}
      <div className="absolute bottom-4 left-4 sm:left-6 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-lg text-[10px] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
          <span className="font-bold text-slate-800 dark:text-zinc-200">01 // SURFACE PR</span>
          <span className="text-slate-500 dark:text-zinc-400">Visible Layer</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-lg text-[10px] font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_6px_#FF5500]" />
          <span className="font-bold text-slate-800 dark:text-zinc-200">02 // AST NEURAL STRATA</span>
          <span className="text-slate-500 dark:text-zinc-400">Below Surface</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-lg text-[10px] font-mono">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_#3B82F6]" />
          <span className="font-bold text-slate-800 dark:text-zinc-200">03 // AUTONOMOUS CONDUIT</span>
          <span className="text-slate-500 dark:text-zinc-400">8ms Pipeline</span>
        </div>
      </div>

      {/* Drag & Inspect Hint Pill */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 dark:bg-black/50 border border-white/10 text-[9px] font-mono text-zinc-400 backdrop-blur-md">
        <span>⟲ Drag to Rotate Cutaway</span>
      </div>
    </div>
  );
}
export default Hero3dCutaway;

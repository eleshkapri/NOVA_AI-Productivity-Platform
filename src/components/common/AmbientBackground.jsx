import React, { useEffect, useRef } from 'react';

// Floating ambient light motes in complementary colors (Amber Gold, Electric Cyan, Royal Orchid)
const LIGHT_MOTES = [
  { id: 1, left: '10%', top: '25%', size: 3, delay: '0s', duration: '16s', color: 'gold' },
  { id: 2, left: '22%', top: '65%', size: 2.5, delay: '3.5s', duration: '19s', color: 'cyan' },
  { id: 3, left: '42%', top: '15%', size: 3.5, delay: '6s', duration: '17s', color: 'orchid' },
  { id: 4, left: '62%', top: '50%', size: 2.5, delay: '2s', duration: '20s', color: 'cyan' },
  { id: 5, left: '78%', top: '20%', size: 3, delay: '8s', duration: '18s', color: 'gold' },
  { id: 6, left: '88%', top: '75%', size: 2.5, delay: '4.5s', duration: '19s', color: 'orchid' },
  { id: 7, left: '52%', top: '85%', size: 3, delay: '10s', duration: '21s', color: 'cyan' },
  { id: 8, left: '15%', top: '80%', size: 2, delay: '11s', duration: '16s', color: 'gold' },
];

// Developer and AI syntax tokens suitable for an AI Productivity Platform
const SYNTAX_TOKENS = ['{ }', '</>', 'git', 'AI', 'λ', 'fn()', '//', '✦', '01', 'PR', '⚡'];

export function AmbientBackground() {
  const canvasRef = useRef(null);
  const spotlightRef = useRef(null);

  // Mouse move listener updating spotlight directly without component re-renders
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 85, 0, 0.10), transparent 75%)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Motion Canvas: AI Neural Code Graph, Data Packets, AST Scanners, and Floating Syntax Tokens
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    setupCanvasSize();

    const handleResize = () => {
      setupCanvasSize();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const isMobile = width < 768;

    // Interactive mouse tracker for canvas synaptic connections
    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const handleCanvasMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleCanvasMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleCanvasMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleCanvasMouseLeave, { passive: true });

    // 1. Neural Code Graph Nodes (Orchid Violet, Amber Gold, and Electric Cyan)
    const nodeCount = isMobile ? 22 : 46;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const typeChoice = i % 3 === 0 ? 'orchid' : i % 3 === 1 ? 'cyan' : 'gold';
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        radius: Math.random() * 2 + 1.8,
        pulseSpeed: Math.random() * 0.012 + 0.006,
        phase: Math.random() * Math.PI * 2,
        isCore: i % 5 === 0, // Core hub nodes with glowing halo
        type: typeChoice,
      });
    }

    // 2. High-Speed Synaptic Data Packets (Pulsing code commits / telemetry in 3 complementary colors)
    const packetCount = isMobile ? 9 : 18;
    const packets = [];
    for (let i = 0; i < packetCount; i++) {
      const typeChoice = i % 3 === 0 ? 'orchid' : i % 3 === 1 ? 'cyan' : 'gold';
      packets.push({
        nodeA: Math.floor(Math.random() * nodeCount),
        nodeB: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: Math.random() * 0.004 + 0.003,
        size: Math.random() * 1.8 + 1.3,
        type: typeChoice,
      });
    }

    // 3. Floating Developer & AI Syntax Tokens ({ }, </>, git, AI, λ, fn(), ✦)
    const tokenCount = isMobile ? 6 : 12;
    const tokens = [];
    for (let i = 0; i < tokenCount; i++) {
      const typeChoice = i % 3 === 0 ? 'orchid' : i % 3 === 1 ? 'cyan' : 'gold';
      tokens.push({
        text: SYNTAX_TOKENS[i % SYNTAX_TOKENS.length],
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -Math.random() * 0.16 - 0.06, // Gently ascends calmly
        rot: (Math.random() - 0.5) * 0.2,
        vRot: (Math.random() - 0.5) * 0.0025,
        size: Math.random() * 3 + 12,
        alpha: Math.random() * 0.28 + 0.35,
        phase: Math.random() * Math.PI * 2,
        type: typeChoice,
      });
    }

    // 4. Rotating AI AST Radar Scanners (Analyzing repository syntax tree / CI/CD pipelines)
    const scanners = [
      {
        rx: 0.1,
        ry: 0.24,
        baseRadius: isMobile ? 55 : 85,
        angle: 0,
        rotSpeed: 0.004,
        pulse: 0,
        type: 'orchid',
      },
      {
        rx: 0.9,
        ry: 0.72,
        baseRadius: isMobile ? 65 : 95,
        angle: Math.PI * 0.75,
        rotSpeed: -0.0035,
        pulse: 0.5,
        type: 'cyan',
      },
      {
        rx: 0.85,
        ry: 0.22,
        baseRadius: isMobile ? 50 : 70,
        angle: Math.PI * 0.3,
        rotSpeed: 0.0038,
        pulse: 0.2,
        type: 'gold',
      },
    ];

    let animRunning = true;
    let animId = null;

    const handleVisibility = () => {
      animRunning = !document.hidden;
      if (animRunning) {
        animId = requestAnimationFrame(animate);
      } else if (animId) {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Draw NOVA 4-Petal Geometric Emblem
    function drawNovaEmblem(cx, cy, radius, color, rotation = 0) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.fillStyle = color;

      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(radius * 0.3, -radius * 0.4, radius * 0.7, -radius * 0.5, radius, 0);
        ctx.bezierCurveTo(radius * 0.7, radius * 0.5, radius * 0.3, radius * 0.4, 0, 0);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    }

    // Main animation loop
    function animate() {
      if (!animRunning) return;

      const isLight = !document.documentElement.classList.contains('dark');

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const maxConnectDist = isMobile ? 100 : 140;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;
      const mouseConnectDist = isMobile ? 120 : 180;
      const mouseConnectDistSq = mouseConnectDist * mouseConnectDist;

      // Color paletting for Light & Dark mode (Crisp Cyber-Orange, Orchid & Cyber Cyan)
      const primaryGold = isLight ? '#EA580C' : '#FF5500';
      const secondaryGold = isLight ? '#F97316' : '#FF7700';
      const nodeFill = isLight ? '#EA580C' : '#FF5500';
      const lineRgb = isLight ? '234, 88, 12' : '255, 85, 0';
      const cyanAccentRgb = isLight ? '2, 132, 199' : '34, 211, 238';

      // Orchid Security Neon Violet / Dark-Matter Palette
      const orchidViolet = isLight ? '#6D28D9' : '#8E6FFF';
      const orchidLavender = isLight ? '#7C3AED' : '#A78BFA';
      const orchidRgb = isLight ? '109, 40, 217' : '142, 111, 255';

      // Electric Cyber Cyan Palette (Complementary Accent)
      const cyanElectric = isLight ? '#0284C7' : '#22D3EE';
      const cyanGlow = isLight ? '#0EA5E9' : '#38BDF8';
      const cyanRgb = isLight ? '2, 132, 199' : '34, 211, 238';

      // -------------------------------------------------------------
      // 1. Draw AI AST Radar Scanners (Background Tech Circles)
      // -------------------------------------------------------------
      scanners.forEach((scanner) => {
        const scX = scanner.rx * width;
        const scY = scanner.ry * height;
        const rad = scanner.baseRadius;

        scanner.angle += scanner.rotSpeed;
        scanner.pulse = (scanner.pulse + 0.004) % 1;

        const scRgb =
          scanner.type === 'orchid'
            ? orchidRgb
            : scanner.type === 'cyan'
            ? cyanRgb
            : lineRgb;

        const scPrimary =
          scanner.type === 'orchid'
            ? orchidViolet
            : scanner.type === 'cyan'
            ? cyanElectric
            : primaryGold;

        // Outer concentric rings
        ctx.strokeStyle = isLight
          ? `rgba(${scRgb}, 0.32)`
          : `rgba(${scRgb}, 0.22)`;
        ctx.lineWidth = isLight ? 1.2 : 1;
        ctx.beginPath();
        ctx.arc(scX, scY, rad, 0, Math.PI * 2);
        ctx.stroke();

        // Dashed outer ring
        ctx.save();
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = isLight
          ? `rgba(${scRgb}, 0.36)`
          : `rgba(${scRgb}, 0.28)`;
        ctx.beginPath();
        ctx.arc(scX, scY, rad * 1.35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Expanding pulsating radar wave
        const pulseRad = rad * (0.3 + scanner.pulse * 1.4);
        const pulseAlpha = (1 - scanner.pulse) * (isLight ? 0.42 : 0.35);
        ctx.strokeStyle = `rgba(${scRgb}, ${pulseAlpha})`;
        ctx.lineWidth = isLight ? 1.4 : 1.2;
        ctx.beginPath();
        ctx.arc(scX, scY, pulseRad, 0, Math.PI * 2);
        ctx.stroke();

        // Rotating radar sweep beam (faint radar scanning effect)
        ctx.save();
        ctx.translate(scX, scY);
        ctx.rotate(scanner.angle);
        const sweepGrad = ctx.createLinearGradient(0, 0, rad, 0);
        sweepGrad.addColorStop(0, `rgba(${scRgb}, ${isLight ? 0.42 : 0.4})`);
        sweepGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = sweepGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, rad, -0.28, 0);
        ctx.lineTo(0, 0);
        ctx.fill();

        // Sweep leading line
        ctx.strokeStyle = isLight ? `rgba(${scRgb}, 0.65)` : scPrimary;
        ctx.lineWidth = isLight ? 1.4 : 1.2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(rad, 0);
        ctx.stroke();
        ctx.restore();

        // Compass degree tick marks
        ctx.save();
        ctx.translate(scX, scY);
        ctx.strokeStyle = `rgba(${scRgb}, ${isLight ? 0.42 : 0.4})`;
        for (let a = 0; a < 8; a++) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.moveTo(rad - 5, 0);
          ctx.lineTo(rad + 3, 0);
          ctx.stroke();
        }
        ctx.restore();

        // Center mini NOVA geometric emblem
        drawNovaEmblem(scX, scY, 6.5, isLight ? `rgba(${scRgb}, 0.65)` : scPrimary, scanner.angle * -0.5);
      });

      // -------------------------------------------------------------
      // 2. Update and Draw Neural Code Graph Nodes & Connections
      // -------------------------------------------------------------
      // Update node positions
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.phase += n.pulseSpeed;

        // Bounce gently at canvas boundaries
        if (n.x < 10) {
          n.x = 10;
          n.vx *= -1;
        } else if (n.x > width - 10) {
          n.x = width - 10;
          n.vx *= -1;
        }
        if (n.y < 10) {
          n.y = 10;
          n.vy *= -1;
        } else if (n.y > height - 10) {
          n.y = height - 10;
          n.vy *= -1;
        }

        // Soft mouse repulsion & interaction
        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouseConnectDistSq && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (1 - mDist / mouseConnectDist) * 0.35;
            n.x += (mdx / mDist) * force;
            n.y += (mdy / mDist) * force;
          }
        }
      }

      // Draw Synaptic Laser Connections between nearby nodes
      ctx.lineWidth = isLight ? 1.0 : 0.85;
      for (let i = 0; i < nodeCount; i++) {
        const na = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const nb = nodes[j];
          const dx = na.x - nb.x;
          const dy = na.y - nb.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / maxConnectDist;
            const lineAlpha = factor * (isLight ? 0.42 : 0.4);

            // Multi-frequency complementary laser line blending
            let strokeRgb = lineRgb;
            if (na.type === 'orchid' || nb.type === 'orchid') {
              strokeRgb = orchidRgb;
            } else if (na.type === 'cyan' || nb.type === 'cyan') {
              strokeRgb = cyanRgb;
            }

            ctx.strokeStyle = `rgba(${strokeRgb}, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.stroke();
          }
        }

        // Connect node to interactive cursor nexus
        if (mouse.active) {
          const mdx = na.x - mouse.x;
          const mdy = na.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouseConnectDistSq) {
            const mDist = Math.sqrt(mDistSq);
            const factor = 1 - mDist / mouseConnectDist;
            const lineAlpha = factor * (isLight ? 0.58 : 0.6);

            ctx.strokeStyle = `rgba(${cyanAccentRgb}, ${lineAlpha})`;
            ctx.lineWidth = isLight ? 1.3 : 1.1;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.lineWidth = isLight ? 1.0 : 0.85;
          }
        }
      }

      // -------------------------------------------------------------
      // 3. High-Speed Synaptic Data Packets (Pulsing through edges)
      // -------------------------------------------------------------
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.nodeA = Math.floor(Math.random() * nodeCount);
          // Pick a target node that is reasonably close
          let closestIdx = (p.nodeA + 1) % nodeCount;
          let minD = 999999;
          for (let k = 0; k < 6; k++) {
            const candidate = Math.floor(Math.random() * nodeCount);
            if (candidate !== p.nodeA) {
              const dx = nodes[p.nodeA].x - nodes[candidate].x;
              const dy = nodes[p.nodeA].y - nodes[candidate].y;
              const d = dx * dx + dy * dy;
              if (d < minD && d < maxConnectDistSq * 1.5) {
                minD = d;
                closestIdx = candidate;
              }
            }
          }
          p.nodeB = closestIdx;
        }

        const na = nodes[p.nodeA];
        const nb = nodes[p.nodeB];
        const px = na.x + (nb.x - na.x) * p.progress;
        const py = na.y + (nb.y - na.y) * p.progress;

        // Orchid purple packet vs Cyber Cyan packet vs NOVA gold packet
        if (p.type === 'orchid') {
          ctx.fillStyle = isLight ? '#7C3AED' : orchidLavender;
        } else if (p.type === 'cyan') {
          ctx.fillStyle = isLight ? '#0284C7' : cyanGlow;
        } else {
          ctx.fillStyle = isLight ? '#D97706' : secondaryGold;
        }
        ctx.beginPath();
        ctx.arc(px, py, isLight ? p.size * 1.15 : p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // -------------------------------------------------------------
      // 4. Draw Individual Nodes & Core Halos
      // -------------------------------------------------------------
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        const pulseFactor = 0.8 + Math.sin(n.phase) * 0.2;
        const nType = n.type;
        const nodeColorRgb = nType === 'orchid' ? orchidRgb : nType === 'cyan' ? cyanRgb : lineRgb;
        const nodePrimary = nType === 'orchid' ? orchidViolet : nType === 'cyan' ? cyanElectric : primaryGold;
        const nodeStandardFill =
          nType === 'orchid'
            ? (isLight ? '#7C3AED' : '#A78BFA')
            : nType === 'cyan'
            ? (isLight ? '#0284C7' : '#38BDF8')
            : nodeFill;

        if (n.isCore) {
          // Core hub node with glowing halo
          const haloRad = n.radius * 2.8 * pulseFactor;
          ctx.fillStyle = `rgba(${nodeColorRgb}, ${isLight ? 0.32 : 0.24})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, haloRad, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = nodePrimary;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 1.25, 0, Math.PI * 2);
          ctx.fill();

          // Mini center dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Standard neural graph node
          ctx.fillStyle = nodeStandardFill;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * pulseFactor, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Cursor Nexus Glow
      if (mouse.active) {
        ctx.save();
        ctx.strokeStyle = `rgba(${cyanAccentRgb}, ${isLight ? 0.65 : 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = isLight ? '#0284c7' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 5. Floating Developer & AI Syntax Tokens ({ }, </>, git, AI, λ, fn(), ✦)
      // -------------------------------------------------------------
      tokens.forEach((t) => {
        t.x += t.vx;
        t.y += t.vy;
        t.rot += t.vRot;
        t.phase += 0.012;

        // Wrap around vertically
        if (t.y < -30) {
          t.y = height + 30;
          t.x = Math.random() * width;
        }

        const floatY = t.y + Math.sin(t.phase) * 3.5;
        const currentAlpha = t.alpha * (0.8 + Math.sin(t.phase) * 0.2);

        ctx.save();
        ctx.translate(t.x, floatY);
        ctx.rotate(t.rot);
        ctx.font = `700 ${t.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const tType = t.type;
        const tokenColorRgb = tType === 'orchid' ? orchidRgb : tType === 'cyan' ? cyanRgb : lineRgb;
        const tokenEmblemColor = tType === 'orchid' ? orchidViolet : tType === 'cyan' ? cyanElectric : primaryGold;

        if (t.text === '✦') {
          // Draw geometric emblem
          drawNovaEmblem(0, 0, t.size * 0.6, isLight ? `rgba(${tokenColorRgb}, ${currentAlpha * 0.9})` : tokenEmblemColor);
        } else {
          ctx.fillStyle = isLight
            ? `rgba(${tokenColorRgb}, ${currentAlpha * 0.9})`
            : `rgba(${tokenColorRgb}, ${currentAlpha})`;
          ctx.fillText(t.text, 0, 0);
        }

        ctx.restore();
      });

      ctx.restore();
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
      window.removeEventListener('mouseleave', handleCanvasMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] dark:from-[#0b0c26] dark:via-[#070818] dark:to-[#04050d] transition-colors duration-500">
      {/* 1. Subtle Engineering Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 dark:opacity-25" />

      {/* 2. Sweeping Luminous Multi-Chromatic Auroras (Royal Orchid, Amber Gold, and Cyber Cyan) */}
      <div className="absolute -top-40 left-1/4 w-[750px] h-[1200px] bg-gradient-to-b from-[#7C3AED]/14 via-[#A78BFA]/10 to-transparent dark:from-[#6833FF]/20 dark:via-[#8E6FFF]/10 blur-[120px] animate-aurora-beam pointer-events-none" />
      <div className="absolute -top-60 right-1/4 w-[650px] h-[1100px] bg-gradient-to-b from-[#EA580C]/12 via-orange-300/10 to-transparent dark:from-[#FF5500]/15 dark:via-orange-950/20 blur-[110px] animate-aurora-beam pointer-events-none [animation-delay:4s]" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[1000px] bg-gradient-to-b from-[#0284C7]/12 via-[#38BDF8]/8 to-transparent dark:from-[#0284C7]/15 dark:via-cyan-600/10 blur-[120px] animate-aurora-beam pointer-events-none [animation-delay:8s]" />

      {/* 3. Fluid Animated Ambient Gradient Orbs (Lavender, Gold & Cyber Cyan in light, Cosmic in dark) */}
      <div className="absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full bg-gradient-to-br from-[#7C3AED]/10 via-[#DDD6FE]/14 to-transparent dark:from-[#6833FF]/25 dark:via-[#8E6FFF]/10 blur-[140px] animate-mesh-1" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full bg-gradient-to-tr from-[#7C3AED]/9 via-[#EDE9FE]/14 to-transparent dark:from-[#6833FF]/20 dark:via-[#4E29D4]/15 blur-[160px] pointer-events-none orchid-ambient-orb" />
      <div className="absolute top-1/3 -right-44 w-[780px] h-[780px] rounded-full bg-gradient-to-bl from-amber-400/12 via-amber-200/10 to-transparent dark:from-indigo-600/25 dark:via-zinc-950/70 blur-[150px] animate-mesh-2" />
      <div className="absolute bottom-1/4 -left-20 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#0284C7]/10 via-[#BAE6FD]/12 to-transparent dark:from-[#0284C7]/20 dark:via-[#0369a1]/10 blur-[140px] animate-mesh-2" />
      <div className="absolute top-2/3 left-1/5 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#EA580C]/10 via-[#FFEDD5]/14 to-transparent dark:from-[#FF5500]/12 dark:via-orange-950/20 blur-[130px] animate-mesh-3" />
      <div className="absolute -bottom-40 right-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-[#7C3AED]/9 via-[#EDE9FE]/12 to-transparent dark:from-[#6833FF]/20 dark:via-zinc-950/65 blur-[140px] animate-mesh-1" />

      {/* 4. Floating Multi-Chromatic Jewel Energy Motes (Visible in Both Light & Dark) */}
      <div className="absolute inset-0 pointer-events-none">
        {LIGHT_MOTES.map((mote) => {
          const colorClass =
            mote.color === 'cyan'
              ? 'from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] dark:from-[#22D3EE] dark:to-[#FFF] shadow-cyan-600/50 dark:shadow-[#22D3EE]/40'
              : mote.color === 'orchid'
              ? 'from-[#6D28D9] via-[#7C3AED] to-[#A78BFA] dark:from-[#8E6FFF] dark:to-[#FFF] shadow-violet-600/50 dark:shadow-[#8E6FFF]/40'
              : 'from-[#EA580C] via-[#FF5500] to-[#FF7700] dark:from-[#FF5500] dark:to-[#FFF] shadow-orange-600/50 dark:shadow-[#FF5500]/40';

          return (
            <span
              key={mote.id}
              className={`absolute rounded-full bg-gradient-to-tr ${colorClass} shadow-md animate-mote`}
              style={{
                left: mote.left,
                top: mote.top,
                width: `${mote.size}px`,
                height: `${mote.size}px`,
                animationDelay: mote.delay,
                animationDuration: mote.duration,
              }}
            />
          );
        })}
      </div>

      {/* 5. Motion Canvas (AI Neural Graph, Radar Scanners - Visible in Both Light & Dark) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 6. Interactive Mouse Ambient Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-300 opacity-60 dark:opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(650px circle at -200px -200px, rgba(124, 58, 237, 0.12), rgba(217, 119, 6, 0.08), transparent 75%)',
        }}
      />

      {/* 7. Subtle High-End Filmic Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-15 dark:opacity-30 pointer-events-none" />
    </div>
  );
}

export default AmbientBackground;

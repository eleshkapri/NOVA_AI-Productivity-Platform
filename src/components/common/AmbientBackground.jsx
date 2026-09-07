import React, { useEffect, useRef } from 'react';

// Floating golden ambient light motes
const LIGHT_MOTES = [
  { id: 1, left: '10%', top: '30%', size: 3.5, delay: '0s', duration: '9s' },
  { id: 2, left: '25%', top: '70%', size: 2.5, delay: '2.5s', duration: '11s' },
  { id: 3, left: '40%', top: '18%', size: 4, delay: '4s', duration: '10s' },
  { id: 4, left: '60%', top: '55%', size: 3, delay: '1.2s', duration: '12s' },
  { id: 5, left: '76%', top: '25%', size: 3.5, delay: '5s', duration: '9.5s' },
  { id: 6, left: '88%', top: '80%', size: 2.5, delay: '3.2s', duration: '10.5s' },
  { id: 7, left: '50%', top: '88%', size: 3, delay: '6.5s', duration: '11.5s' },
  { id: 8, left: '16%', top: '82%', size: 2, delay: '7s', duration: '8.5s' },
];

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
            spotlightRef.current.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(216, 180, 82, 0.12), transparent 75%)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Motion Canvas Animation
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

    // 1. Paper Airplanes (Origami delta-wing with contrails)
    const planeCount = isMobile ? 3 : 6;
    const planes = [];
    for (let i = 0; i < planeCount; i++) {
      planes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: isMobile ? Math.random() * 0.7 + 0.6 : Math.random() * 0.9 + 0.8,
        angle: Math.random() * Math.PI * 0.5 - 0.25,
        turnRate: (Math.random() - 0.5) * 0.004,
        size: isMobile ? Math.random() * 3 + 12 : Math.random() * 4 + 14,
        history: [],
        type: i % 2 === 0 ? 'typeA' : 'typeB',
      });
    }

    // 2. Hot Air Balloons (Floating upwards with horizontal sway)
    const balloons = isMobile
      ? [
          { x: width * 0.16, y: height * 0.42, vy: -0.24, vx: 0.08, radius: 14, type: 'A', phase: 0 },
          { x: width * 0.82, y: height * 0.68, vy: -0.18, vx: -0.06, radius: 16, type: 'B', phase: 1.5 },
          { x: width * 0.48, y: height * 0.85, vy: -0.26, vx: 0.1, radius: 13, type: 'C', phase: 3 },
        ]
      : [
          { x: width * 0.1, y: height * 0.38, vy: -0.28, vx: 0.12, radius: 15, type: 'A', phase: 0 },
          { x: width * 0.86, y: height * 0.65, vy: -0.22, vx: -0.08, radius: 17, type: 'B', phase: 1.5 },
          { x: width * 0.52, y: height * 0.8, vy: -0.3, vx: 0.1, radius: 14, type: 'C', phase: 3 },
          { x: width * 0.28, y: height * 0.92, vy: -0.25, vx: -0.1, radius: 16, type: 'D', phase: 4.5 },
        ];

    // 3. Twinkling Stars & Compass Stars
    const starCount = isMobile ? 25 : 55;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1.2,
        isCompass: Math.random() > 0.6,
        type: Math.random() > 0.5 ? 'A' : 'B',
        alphaOffset: Math.random() * 0.4 + 0.4,
        pulse: Math.random() * 0.025 + 0.015,
      });
    }

    // 4. Concentric Waypoint Radars (Matching reference image with radiating waves)
    const waypoints = [
      { rx: 0.08, ry: 0.24, pulseRadius: 0 },
      { rx: 0.92, ry: 0.3, pulseRadius: 20 },
      { rx: 0.14, ry: 0.72, pulseRadius: 35 },
      { rx: 0.88, ry: 0.78, pulseRadius: 10 },
    ];

    let animRunning = true;
    let animId = null;

    const handleVisibility = () => {
      animRunning = !document.hidden;
      if (animRunning) {
        lastFrameTime = performance.now();
        animId = requestAnimationFrame(animate);
      } else if (animId) {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Origami Paper Airplane Drawing
    function drawPaperPlane(p, isLight) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      const isTypeA = p.type === 'typeA';
      // Crisp vibrant colors matching reference screenshots
      const primaryColor = isLight
        ? isTypeA
          ? '#EA580C' // Vivid Terracotta Orange
          : '#0284C7' // Sky Azure Blue
        : isTypeA
        ? '#F59E0B' // Radiant Amber
        : '#06B6D4'; // Luminous Cyan

      const lightWingColor = isLight
        ? isTypeA
          ? '#FB923C'
          : '#38BDF8'
        : isTypeA
        ? '#FBBF24'
        : '#67E8F9';

      const darkWingColor = isLight
        ? isTypeA
          ? '#C2410C'
          : '#0369A1'
        : isTypeA
        ? '#D97706'
        : '#0891B2';

      if (!isLight) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = primaryColor;
      }

      const s = p.size;

      // Left Wing (Lighter)
      ctx.fillStyle = lightWingColor;
      ctx.beginPath();
      ctx.moveTo(s * 1.35, 0); // Nose
      ctx.lineTo(-s * 0.85, -s * 0.75); // Left wingtip
      ctx.lineTo(-s * 0.35, 0); // Inner fold
      ctx.closePath();
      ctx.fill();

      // Right Wing (Darker Shading)
      ctx.fillStyle = darkWingColor;
      ctx.beginPath();
      ctx.moveTo(s * 1.35, 0); // Nose
      ctx.lineTo(-s * 0.85, s * 0.75); // Right wingtip
      ctx.lineTo(-s * 0.35, 0); // Inner fold
      ctx.closePath();
      ctx.fill();

      // Center Keel / Fuselage Ridge
      ctx.fillStyle = primaryColor;
      ctx.beginPath();
      ctx.moveTo(s * 1.35, 0);
      ctx.lineTo(-s * 0.75, -s * 0.16);
      ctx.lineTo(-s * 0.95, 0);
      ctx.lineTo(-s * 0.75, s * 0.16);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // Hot Air Balloon Drawing with Colorful Panels and Wicker Basket
    function drawHotAirBalloon(b, isLight) {
      ctx.save();
      ctx.translate(b.x, b.y);

      let mainColor, secColor;
      if (isLight) {
        if (b.type === 'A') {
          mainColor = '#06B6D4';
          secColor = '#0284C7';
        } else if (b.type === 'B') {
          mainColor = '#F97316';
          secColor = '#EA580C';
        } else if (b.type === 'C') {
          mainColor = '#A855F7';
          secColor = '#9333EA';
        } else {
          mainColor = '#EC4899';
          secColor = '#DB2777';
        }
      } else {
        if (b.type === 'A') {
          mainColor = '#22D3EE';
          secColor = '#06B6D4';
        } else if (b.type === 'B') {
          mainColor = '#FB923C';
          secColor = '#F59E0B';
        } else if (b.type === 'C') {
          mainColor = '#C084FC';
          secColor = '#A855F7';
        } else {
          mainColor = '#F472B6';
          secColor = '#EC4899';
        }
      }

      if (!isLight) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = mainColor;
      }

      const r = b.radius;

      // Balloon envelope (teardrop body)
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI, true);
      ctx.quadraticCurveTo(-r * 0.9, r * 1.1, 0, r * 1.45);
      ctx.quadraticCurveTo(r * 0.9, r * 1.1, r, 0);
      ctx.fillStyle = mainColor;
      ctx.fill();

      // Central accent stripe
      ctx.beginPath();
      ctx.ellipse(0, r * 0.35, r * 0.45, r * 0.95, 0, 0, Math.PI * 2);
      ctx.fillStyle = secColor;
      ctx.fill();

      // Suspension cables
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isLight ? 'rgba(71, 85, 105, 0.75)' : 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-r * 0.32, r * 1.4);
      ctx.lineTo(-r * 0.2, r * 1.7);
      ctx.moveTo(r * 0.32, r * 1.4);
      ctx.lineTo(r * 0.2, r * 1.7);
      ctx.stroke();

      // Wicker passenger basket
      ctx.fillStyle = isLight ? '#78350F' : '#FDE047';
      ctx.fillRect(-r * 0.22, r * 1.7, r * 0.44, r * 0.32);

      ctx.restore();
    }

    // Concentric Waypoint Radar Drawing (with Radiating Ripples)
    function drawWaypoint(wp, isLight) {
      const wx = wp.rx * width;
      const wy = wp.ry * height;

      ctx.save();
      ctx.translate(wx, wy);

      // 1. Expanding pulse ripple
      wp.pulseRadius = (wp.pulseRadius + 0.35) % 45;
      const rippleAlpha = (1 - wp.pulseRadius / 45) * (isLight ? 0.45 : 0.65);
      ctx.beginPath();
      ctx.arc(0, 0, wp.pulseRadius + 8, 0, Math.PI * 2);
      ctx.strokeStyle = isLight
        ? `rgba(2, 132, 199, ${rippleAlpha})`
        : `rgba(6, 182, 212, ${rippleAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Outer dashed orbit ring
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.45)' : 'rgba(245, 158, 11, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Inner solid circle
      ctx.setLineDash([]);
      ctx.strokeStyle = isLight ? '#D97706' : '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Center target dot
      ctx.fillStyle = isLight ? '#EA580C' : '#FDE047';
      if (!isLight) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#F59E0B';
      }
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 5. Cardinal tick dots
      ctx.shadowBlur = 0;
      ctx.fillStyle = isLight ? 'rgba(217, 119, 6, 0.65)' : 'rgba(245, 158, 11, 0.75)';
      const tickDist = 22;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
        ctx.beginPath();
        ctx.arc(Math.cos(a) * tickDist, Math.sin(a) * tickDist, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // 4-Point Diamond Compass Star Drawing
    function drawCompassStar(s, isLight) {
      ctx.save();
      ctx.translate(s.x, s.y);

      const starColor = isLight ? '#EA580C' : '#F59E0B';
      const alpha = s.alphaOffset + Math.sin(Date.now() * s.pulse) * 0.25;
      const clampedAlpha = Math.max(0.3, Math.min(1.0, alpha));

      if (!isLight) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = starColor;
      }

      ctx.fillStyle = isLight
        ? `rgba(234, 88, 12, ${clampedAlpha * 0.7})`
        : `rgba(245, 158, 11, ${clampedAlpha * 0.85})`;

      const rOuter = s.size * 2.8;
      const rInner = s.size * 0.6;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
        const aMid = a + Math.PI / 4;
        ctx.lineTo(Math.cos(aMid) * rInner, Math.sin(aMid) * rInner);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    let lastFrameTime = 0;
    const targetInterval = isMobile ? 33 : 16;

    function animate(now = 0) {
      if (!animRunning) return;

      if (now - lastFrameTime < targetInterval) {
        animId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = now;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('dark') === false;

      // 1. Global Flight Arcs Across the Horizon
      ctx.save();
      ctx.setLineDash([8, 12]);
      ctx.lineWidth = 1.5;

      // Arc 1 (Warm Amber/Orange route)
      ctx.strokeStyle = isLight ? 'rgba(234, 88, 12, 0.35)' : 'rgba(245, 158, 11, 0.25)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.28);
      ctx.quadraticCurveTo(width * 0.45, height * 0.08, width, height * 0.42);
      ctx.stroke();

      // Arc 2 (Sky Azure/Cyan route)
      ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.35)' : 'rgba(6, 182, 212, 0.25)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.72);
      ctx.quadraticCurveTo(width * 0.55, height * 0.88, width, height * 0.58);
      ctx.stroke();

      // Arc 3 (Diagonal cross route)
      ctx.strokeStyle = isLight ? 'rgba(168, 85, 247, 0.25)' : 'rgba(192, 132, 252, 0.2)';
      ctx.beginPath();
      ctx.moveTo(width * 0.08, height);
      ctx.quadraticCurveTo(width * 0.5, height * 0.45, width * 0.92, 0);
      ctx.stroke();
      ctx.restore();

      // 2. Waypoint Radars
      waypoints.forEach((wp) => drawWaypoint(wp, isLight));

      // 3. Stars & Compass Sparkles
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        if (s.isCompass) {
          drawCompassStar(s, isLight);
        } else {
          const alpha = s.alphaOffset + Math.sin(Date.now() * s.pulse) * 0.25;
          const clampedAlpha = Math.max(0.25, Math.min(1.0, alpha));
          const starColor = isLight
            ? s.type === 'A'
              ? `rgba(234, 88, 12, ${clampedAlpha * 0.55})`
              : `rgba(2, 132, 199, ${clampedAlpha * 0.55})`
            : s.type === 'A'
            ? `rgba(245, 158, 11, ${clampedAlpha * 0.75})`
            : `rgba(6, 182, 212, ${clampedAlpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = starColor;
          ctx.fill();
        }
      });

      // 4. Hot Air Balloons
      balloons.forEach((b) => {
        b.phase += 0.015;
        b.y += b.vy;
        b.x += b.vx + Math.sin(b.phase) * 0.18;
        if (b.y < -50) {
          b.y = height + 50;
          b.x = Math.random() * width;
        }
        drawHotAirBalloon(b, isLight);
      });

      // 5. Paper Airplanes with Glowing Contrails
      planes.forEach((p) => {
        p.angle += p.turnRate;
        if (p.angle > 0.4 || p.angle < -0.4) {
          p.turnRate = -p.turnRate;
        }

        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        const maxHistory = isMobile ? 18 : 28;
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > maxHistory) p.history.shift();

        // Draw Contrail line
        if (p.history.length > 2) {
          ctx.save();
          ctx.setLineDash([5, 7]);
          ctx.lineWidth = 1.5;
          for (let i = 0; i < p.history.length - 1; i++) {
            const trailAlpha = (i / p.history.length) * (isLight ? 0.6 : 0.75);
            ctx.strokeStyle = isLight
              ? p.type === 'typeA'
                ? `rgba(234, 88, 12, ${trailAlpha})`
                : `rgba(2, 132, 199, ${trailAlpha})`
              : p.type === 'typeA'
              ? `rgba(245, 158, 11, ${trailAlpha})`
              : `rgba(6, 182, 212, ${trailAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p.history[i].x, p.history[i].y);
            ctx.lineTo(p.history[i + 1].x, p.history[i + 1].y);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Screen boundary wrap-around
        if (p.x > width + 60) {
          p.x = -60;
          p.y = Math.random() * height;
          p.history = [];
        }
        if (p.y > height + 60) {
          p.y = -60;
          p.history = [];
        }
        if (p.y < -60) {
          p.y = height + 60;
          p.history = [];
        }

        drawPaperPlane(p, isLight);
      });

      ctx.restore();
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#FFF7ED] via-[#FDF8F3] to-[#EBF6FF] dark:from-[#120D1A] dark:via-[#0D0F22] dark:to-[#050614] transition-colors duration-500">
      {/* 1. Subtle Dot Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-45 dark:opacity-30" />

      {/* 2. Sweeping Angled Aurora Light Beams */}
      <div className="absolute -top-40 left-1/4 w-[750px] h-[1200px] bg-gradient-to-b from-[#D8B452]/20 via-[#F3D887]/10 to-transparent blur-[90px] animate-aurora-beam pointer-events-none" />
      <div className="absolute -top-60 right-1/4 w-[650px] h-[1100px] bg-gradient-to-b from-indigo-500/15 via-[#D8B452]/8 to-transparent blur-[100px] animate-aurora-beam pointer-events-none [animation-delay:4s]" />

      {/* 3. Fluid Animated Gradient Mesh Orbs */}
      <div className="absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full bg-gradient-to-br from-[#D8B452]/25 via-[#F3D887]/15 to-transparent blur-[130px] animate-mesh-1" />
      <div className="absolute top-1/4 -right-44 w-[780px] h-[780px] rounded-full bg-gradient-to-bl from-indigo-600/20 via-[#0b0c33]/40 dark:via-[#0b0c33]/70 to-transparent blur-[140px] animate-mesh-2" />
      <div className="absolute top-1/2 left-1/5 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#D8B452]/20 via-[#C49A32]/10 to-transparent blur-[120px] animate-mesh-3" />
      <div className="absolute -bottom-40 right-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-amber-400/20 via-[#07081e]/35 dark:via-[#07081e]/65 to-transparent blur-[130px] animate-mesh-1" />

      {/* 4. Floating Golden Light Motes */}
      <div className="absolute inset-0 pointer-events-none">
        {LIGHT_MOTES.map((mote) => (
          <span
            key={mote.id}
            className="absolute rounded-full bg-gradient-to-tr from-[#D8B452] to-[#FFF] shadow-md shadow-[#D8B452]/40 animate-mote"
            style={{
              left: mote.left,
              top: mote.top,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animationDelay: mote.delay,
              animationDuration: mote.duration,
            }}
          />
        ))}
      </div>

      {/* 5. Motionable Canvas (100% Crisp Airplanes, Balloons, Waypoints, Flight Paths) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 6. Interactive Mouse Ambient Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-300 opacity-70 dark:opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(650px circle at -200px -200px, rgba(216, 180, 82, 0.1), transparent 75%)',
        }}
      />

      {/* 7. Subtle Filmic Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 dark:opacity-30" />
    </div>
  );
}

export default AmbientBackground;

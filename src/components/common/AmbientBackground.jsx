import React, { useEffect, useRef } from 'react';

// Stable positions and delays for floating light motes
const LIGHT_MOTES = [
  { id: 1, left: '12%', top: '35%', size: 3.5, delay: '0s', duration: '9s' },
  { id: 2, left: '28%', top: '75%', size: 2.5, delay: '2.5s', duration: '11s' },
  { id: 3, left: '42%', top: '20%', size: 4, delay: '4s', duration: '10s' },
  { id: 4, left: '65%', top: '60%', size: 3, delay: '1.2s', duration: '12s' },
  { id: 5, left: '78%', top: '28%', size: 3.5, delay: '5s', duration: '9.5s' },
  { id: 6, left: '88%', top: '82%', size: 2.5, delay: '3.2s', duration: '10.5s' },
  { id: 7, left: '50%', top: '90%', size: 3, delay: '6.5s', duration: '11.5s' },
  { id: 8, left: '18%', top: '85%', size: 2, delay: '7s', duration: '8.5s' },
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
            spotlightRef.current.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(216, 180, 82, 0.08), transparent 75%)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = window.innerWidth < 768;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 1. Airplanes
    const planeCount = isMobile ? 3 : 6;
    const planes = [];
    for (let i = 0; i < planeCount; i++) {
      planes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: isMobile ? Math.random() * 0.6 + 0.5 : Math.random() * 0.8 + 0.6,
        angle: Math.random() * Math.PI * 0.6 - 0.3,
        size: isMobile ? Math.random() * 3 + 11 : Math.random() * 4 + 12,
        history: [],
        type: i % 2 === 0 ? 'typeA' : 'typeB',
      });
    }

    // 2. Balloons
    const balloons = isMobile
      ? [
          { x: width * 0.18, y: height * 0.45, vy: -0.2, vx: 0.08, radius: 13, type: 'A', phase: 0 },
          { x: width * 0.8, y: height * 0.72, vy: -0.16, vx: -0.06, radius: 14, type: 'B', phase: 1.5 },
          { x: width * 0.48, y: height * 0.88, vy: -0.22, vx: 0.1, radius: 12, type: 'C', phase: 3 },
        ]
      : [
          { x: width * 0.12, y: height * 0.4, vy: -0.25, vx: 0.12, radius: 13, type: 'A', phase: 0 },
          { x: width * 0.85, y: height * 0.7, vy: -0.2, vx: -0.08, radius: 15, type: 'B', phase: 1.5 },
          { x: width * 0.5, y: height * 0.82, vy: -0.28, vx: 0.1, radius: 12, type: 'C', phase: 3 },
          { x: width * 0.28, y: height * 0.9, vy: -0.22, vx: -0.12, radius: 14, type: 'D', phase: 4.5 },
        ];

    // 3. Stars / Particles
    const starCount = isMobile ? 22 : 45;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        size: Math.random() * 2 + 1.2,
        isCompass: !isMobile && Math.random() > 0.65,
        type: Math.random() > 0.5 ? 'A' : 'B',
        alphaOffset: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * 0.02 + 0.01,
      });
    }

    // 4. Waypoints (Ratio-based positions to stay responsive on resize)
    const waypoints = [
      { rx: 0.05, ry: 0.2, pulseRadius: 0 },
      { rx: 0.95, ry: 0.8, pulseRadius: 25 },
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

    function hexToRgba(hex, alpha) {
      if (!hex) return 'rgba(0,0,0,0)';
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function drawPlane(p, isLight) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      const hexColor = isLight
        ? p.type === 'typeA'
          ? '#EA580C'
          : '#0284C7'
        : p.type === 'typeA'
          ? '#D8B452'
          : '#06B6D4';

      ctx.fillStyle = hexToRgba(hexColor, 0.45);

      ctx.beginPath();
      ctx.moveTo(p.size * 1.1, 0);
      ctx.lineTo(-p.size * 0.4, p.size * 0.9);
      ctx.lineTo(-p.size * 0.2, p.size * 0.2);
      ctx.lineTo(-p.size * 0.85, p.size * 0.5);
      ctx.lineTo(-p.size * 0.7, 0);
      ctx.lineTo(-p.size * 0.85, -p.size * 0.5);
      ctx.lineTo(-p.size * 0.2, -p.size * 0.2);
      ctx.lineTo(-p.size * 0.4, -p.size * 0.9);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawBalloon(b, isLight) {
      ctx.save();
      ctx.translate(b.x, b.y);

      let hexColor;
      if (isLight) {
        if (b.type === 'A') hexColor = '#EA580C';
        else if (b.type === 'B') hexColor = '#EC4899';
        else if (b.type === 'C') hexColor = '#0284C7';
        else hexColor = '#8B5CF6';
      } else {
        if (b.type === 'A') hexColor = '#F59E0B';
        else if (b.type === 'B') hexColor = '#F43F5E';
        else if (b.type === 'C') hexColor = '#A855F7';
        else hexColor = '#06B6D4';
      }

      ctx.fillStyle = hexToRgba(hexColor, 0.55);

      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI, true);
      ctx.quadraticCurveTo(-b.radius * 0.9, b.radius * 1.1, 0, b.radius * 1.4);
      ctx.quadraticCurveTo(b.radius * 0.9, b.radius * 1.1, b.radius, 0);
      ctx.fill();

      ctx.fillStyle = hexToRgba(isLight ? '#334155' : '#FFFFFF', 0.55);
      ctx.fillRect(-b.radius * 0.25, b.radius * 1.65, b.radius * 0.5, b.radius * 0.35);

      ctx.strokeStyle = hexToRgba(isLight ? '#0F172A' : '#FFFFFF', 0.4);
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(-b.radius * 0.3, b.radius * 1.4);
      ctx.lineTo(-b.radius * 0.2, b.radius * 1.65);
      ctx.moveTo(b.radius * 0.3, b.radius * 1.4);
      ctx.lineTo(b.radius * 0.2, b.radius * 1.65);
      ctx.stroke();

      ctx.restore();
    }

    function drawCompassStar(s, curAlpha, isLight) {
      ctx.save();
      ctx.translate(s.x, s.y);

      const hexColor = isLight
        ? s.type === 'A'
          ? '#D97706'
          : '#0284C7'
        : s.type === 'A'
          ? '#D8B452'
          : '#06B6D4';

      ctx.fillStyle = hexToRgba(hexColor, curAlpha * 0.35);

      ctx.beginPath();
      const rOuter = s.size * 2.2;
      const rInner = s.size * 0.55;
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

      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.classList.contains('dark') === false;

      // 1. Draw Global Flight Arcs
      ctx.save();
      ctx.setLineDash([8, 14]);
      ctx.lineWidth = isLight ? 1.5 : 1;
      ctx.strokeStyle = isLight ? 'rgba(234, 88, 12, 0.2)' : 'rgba(255, 160, 0, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.3);
      ctx.quadraticCurveTo(width * 0.5, height * 0.1, width, height * 0.45);
      ctx.stroke();

      ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.2)' : 'rgba(6, 182, 212, 0.1)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.7);
      ctx.quadraticCurveTo(width * 0.4, height * 0.85, width, height * 0.6);
      ctx.stroke();
      ctx.restore();

      // 2. Draw Destination Waypoint Pulses (Responsive position)
      waypoints.forEach((wp) => {
        const wx = wp.rx * width;
        const wy = wp.ry * height;
        wp.pulseRadius = (wp.pulseRadius + 0.3) % 50;
        const pAlpha = (1 - wp.pulseRadius / 50) * 0.25;
        ctx.beginPath();
        ctx.arc(wx, wy, wp.pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${pAlpha})` : `rgba(6, 182, 212, ${pAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(wx, wy, 3, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(isLight ? '#0284C7' : '#06B6D4', 0.25);
        ctx.fill();
      });

      // 3. Draw Stars
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const curAlpha = s.alphaOffset + Math.sin(Date.now() * s.pulse) * 0.2;
        const clampedAlpha = Math.max(0.2, Math.min(1.0, curAlpha));

        if (s.isCompass) {
          drawCompassStar(s, clampedAlpha, isLight);
        } else {
          const hexColor = isLight
            ? s.type === 'A'
              ? '#D97706'
              : '#0284C7'
            : s.type === 'A'
              ? '#D8B452'
              : '#06B6D4';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(hexColor, clampedAlpha * 0.35);
          ctx.fill();
        }
      });

      // 4. Draw Balloons
      balloons.forEach((b) => {
        b.phase += 0.015;
        b.y += b.vy;
        b.x += b.vx + Math.sin(b.phase) * 0.12;
        if (b.y < -40) {
          b.y = height + 40;
          b.x = Math.random() * width;
        }
        drawBalloon(b, isLight);
      });

      // 5. Draw Planes
      planes.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        const maxHistory = isMobile ? 14 : 25;
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > maxHistory) p.history.shift();

        if (p.history.length > 2) {
          ctx.save();
          ctx.setLineDash([4, 6]);
          ctx.lineWidth = 1;
          for (let i = 0; i < p.history.length - 1; i++) {
            const trailAlpha = (i / p.history.length) * 0.35;
            ctx.strokeStyle = isLight
              ? `rgba(2, 132, 199, ${trailAlpha})`
              : `rgba(216, 180, 82, ${trailAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p.history[i].x, p.history[i].y);
            ctx.lineTo(p.history[i + 1].x, p.history[i + 1].y);
            ctx.stroke();
          }
          ctx.restore();
        }

        if (p.x > width + 50) {
          p.x = -50;
          p.y = Math.random() * height;
          p.history = [];
        }
        if (p.y > height + 50) {
          p.y = -50;
          p.history = [];
        }
        if (p.y < -50) {
          p.y = height + 50;
          p.history = [];
        }

        drawPlane(p, isLight);
      });

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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* 1. Subtle Dot Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40" />

      {/* 2. Sweeping Angled Aurora Light Beams */}
      <div className="absolute -top-40 left-1/4 w-[700px] h-[1200px] bg-gradient-to-b from-[#D8B452]/15 via-[#F3D887]/5 to-transparent blur-[90px] animate-aurora-beam pointer-events-none" />
      <div className="absolute -top-60 right-1/4 w-[600px] h-[1100px] bg-gradient-to-b from-indigo-500/10 via-[#D8B452]/5 to-transparent blur-[100px] animate-aurora-beam pointer-events-none [animation-delay:4s]" />

      {/* 3. Fluid Animated Gradient Mesh Orbs */}
      <div className="absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full bg-gradient-to-br from-[#D8B452]/25 via-[#F3D887]/15 to-transparent blur-[130px] animate-mesh-1" />
      <div className="absolute top-1/4 -right-44 w-[780px] h-[780px] rounded-full bg-gradient-to-bl from-indigo-600/15 via-[#0b0c33]/45 dark:via-[#0b0c33]/75 to-transparent blur-[140px] animate-mesh-2" />
      <div className="absolute top-1/2 left-1/5 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#D8B452]/18 via-[#C49A32]/10 to-transparent blur-[120px] animate-mesh-3" />
      <div className="absolute -bottom-40 right-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-amber-400/15 via-[#07081e]/40 dark:via-[#07081e]/70 to-transparent blur-[130px] animate-mesh-1" />

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

      {/* 5. Dynamic Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-60"
      />

      {/* 6. Interactive Mouse Ambient Spotlight (Updated via Ref to avoid full-tree re-renders) */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-300 opacity-70 dark:opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(650px circle at -200px -200px, rgba(216, 180, 82, 0.08), transparent 75%)',
        }}
      />

      {/* 7. Filmic Luxury Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-30 dark:opacity-50" />
    </div>
  );
}

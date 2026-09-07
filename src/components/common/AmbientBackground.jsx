import React, { useEffect, useRef, useState } from 'react';

/**
 * AmbientBackground — Dynamic Moving Interactive Sky & Radar Background
 * Featuring:
 * - Cruising gliders / aircraft with animated dashed contrails
 * - Floating hot air balloons / aero capsules with harmonic sine sway
 * - Shimmering 4-point celestial / compass stars (✦) and firefly embers
 * - Pulsing waypoint radars with expanding concentric target rings
 * - Great-circle curved dashed trajectory arcs
 * - Scroll-linked parallax depth displacement
 * - Interactive mouse compass radar follower
 * - Real-time theme responsiveness (porcelain in light mode, midnight navy in dark mode)
 */
export function AmbientBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

    // Check if dark mode is active
    let isDark = document.documentElement.classList.contains('dark');
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Handle window resize with debouncing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Track scroll position for 3D parallax displacement
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 1. Cruising Gliders / Aircraft with Trailing Contrails
    const planeCount = isMobile ? 3 : 6;
    const planes = [];
    for (let i = 0; i < planeCount; i++) {
      planes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: isMobile ? Math.random() * 0.6 + 0.5 : Math.random() * 0.8 + 0.6,
        angle: Math.random() * Math.PI * 0.6 - 0.3,
        size: isMobile ? Math.random() * 3 + 11 : Math.random() * 4 + 13,
        history: [],
        color: i % 2 === 0 ? '#D8B452' : '#06B6D4',
      });
    }

    // 2. Floating Hot Air Balloons / Aero Pods with Harmonic Sway
    const balloons = isMobile
      ? [
          { x: width * 0.18, y: height * 0.45, vy: -0.20, vx: 0.08, radius: 13, hue: '#FFA000', phase: 0 },
          { x: width * 0.80, y: height * 0.72, vy: -0.16, vx: -0.06, radius: 14, hue: '#FF5E36', phase: 1.5 },
          { x: width * 0.48, y: height * 0.88, vy: -0.22, vx: 0.10, radius: 12, hue: '#06B6D4', phase: 3 },
        ]
      : [
          { x: width * 0.12, y: height * 0.40, vy: -0.24, vx: 0.12, radius: 14, hue: '#FFA000', phase: 0 },
          { x: width * 0.85, y: height * 0.70, vy: -0.19, vx: -0.08, radius: 15, hue: '#FF5E36', phase: 1.5 },
          { x: width * 0.50, y: height * 0.82, vy: -0.27, vx: 0.10, radius: 13, hue: '#8B5CF6', phase: 3 },
          { x: width * 0.28, y: height * 0.90, vy: -0.21, vx: -0.12, radius: 14, hue: '#06B6D4', phase: 4.5 },
          { x: width * 0.72, y: height * 0.35, vy: -0.23, vx: 0.07, radius: 12, hue: '#D8B452', phase: 2.2 },
        ];

    // 3. Shimmering 4-Point Compass Stars & Firefly Particles
    const starCount = isMobile ? 24 : 48;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        size: Math.random() * 2.2 + 1.2,
        isCompass: !isMobile && Math.random() > 0.62,
        color: Math.random() > 0.5 ? 'rgba(216, 180, 82, ' : 'rgba(6, 182, 212, ',
        alpha: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * 0.02 + 0.01,
      });
    }

    // 4. Destination Waypoint Radars with Expanding Pulses
    const waypoints = [
      { x: width * 0.20, y: height * 0.25, pulseRadius: 0 },
      { x: width * 0.82, y: height * 0.32, pulseRadius: 18 },
      { x: width * 0.45, y: height * 0.68, pulseRadius: 36 },
      { x: width * 0.88, y: height * 0.80, pulseRadius: 10 },
    ];

    // Mouse tracking for ambient spotlight and radar follower
    const mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Drawing Helpers
    function drawPlane(p, isLightMode) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      const planeColor = isLightMode
        ? p.color === '#06B6D4'
          ? '#0284C7'
          : '#B48448'
        : p.color;
      ctx.fillStyle = planeColor;
      if (!isMobile) {
        ctx.shadowColor = isLightMode ? 'rgba(2, 132, 199, 0.4)' : planeColor;
        ctx.shadowBlur = isLightMode ? 6 : 10;
      }
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

    function drawBalloon(b, isLightMode) {
      ctx.save();
      ctx.translate(b.x, b.y);

      ctx.fillStyle = b.hue;
      if (!isMobile) {
        ctx.shadowColor = isLightMode ? 'rgba(0,0,0,0.15)' : b.hue;
        ctx.shadowBlur = 8;
      }
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI, true);
      ctx.quadraticCurveTo(-b.radius * 0.9, b.radius * 1.1, 0, b.radius * 1.4);
      ctx.quadraticCurveTo(b.radius * 0.9, b.radius * 1.1, b.radius, 0);
      ctx.fill();

      // Gondola basket
      ctx.fillStyle = isLightMode ? '#334155' : 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(-b.radius * 0.25, b.radius * 1.65, b.radius * 0.5, b.radius * 0.35);

      // Support rigging ropes
      ctx.strokeStyle = isLightMode ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(-b.radius * 0.3, b.radius * 1.4);
      ctx.lineTo(-b.radius * 0.2, b.radius * 1.65);
      ctx.moveTo(b.radius * 0.3, b.radius * 1.4);
      ctx.lineTo(b.radius * 0.2, b.radius * 1.65);
      ctx.stroke();

      ctx.restore();
    }

    function drawCompassStar(s, alpha, isLightMode) {
      ctx.save();
      ctx.translate(s.x, s.y);
      const starColor = isLightMode
        ? s.color.includes('216, 180')
          ? 'rgba(161, 116, 26, '
          : 'rgba(2, 132, 199, '
        : s.color;
      ctx.fillStyle = starColor + alpha + ')';
      if (!isMobile) {
        ctx.shadowColor = isLightMode ? 'rgba(161, 116, 26, 0.6)' : starColor + '0.8)';
        ctx.shadowBlur = 6;
      }

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

    // Animation Loop
    let animRunning = true;
    let animFrameId = null;
    let lastFrameTime = 0;
    const targetInterval = isMobile ? 33 : 16; // 30fps mobile, 60fps desktop

    const handleVisibility = () => {
      animRunning = !document.hidden;
      if (animRunning) {
        lastFrameTime = performance.now();
        animFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    function animate(now = 0) {
      if (!animRunning) return;
      animFrameId = requestAnimationFrame(animate);

      if (now - lastFrameTime < targetInterval) return;
      lastFrameTime = now;

      // Smooth scroll parallax interpolation
      scrollY += (targetScrollY - scrollY) * 0.1;
      const parallaxOffset = scrollY * 0.08;

      ctx.clearRect(0, 0, width, height);
      const isLightMode = !isDark;

      // 1. Great-Circle Flight / Pipeline Arcs
      ctx.save();
      ctx.setLineDash([8, 14]);
      ctx.lineWidth = isLightMode ? 1.5 : 1;
      ctx.strokeStyle = isLightMode
        ? 'rgba(161, 116, 26, 0.22)'
        : 'rgba(216, 180, 82, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.3 - (parallaxOffset % (height * 0.2)));
      ctx.quadraticCurveTo(width * 0.5, height * 0.1 - (parallaxOffset % (height * 0.2)), width, height * 0.45 - (parallaxOffset % (height * 0.2)));
      ctx.stroke();

      ctx.strokeStyle = isLightMode
        ? 'rgba(2, 132, 199, 0.22)'
        : 'rgba(6, 182, 212, 0.1)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.7 - (parallaxOffset % (height * 0.3)));
      ctx.quadraticCurveTo(width * 0.4, height * 0.85 - (parallaxOffset % (height * 0.3)), width, height * 0.6 - (parallaxOffset % (height * 0.3)));
      ctx.stroke();
      ctx.restore();

      // 2. Waypoint Radar Pulses
      waypoints.forEach((wp) => {
        wp.pulseRadius = (wp.pulseRadius + 0.3) % 55;
        const pAlpha = (1 - wp.pulseRadius / 55) * (isLightMode ? 0.55 : 0.35);
        const yPos = (wp.y - parallaxOffset + height * 2) % height;

        ctx.save();
        ctx.beginPath();
        ctx.arc(wp.x, yPos, wp.pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isLightMode
          ? `rgba(2, 132, 199, ${pAlpha})`
          : `rgba(216, 180, 82, ${pAlpha})`;
        ctx.lineWidth = isLightMode ? 1.5 : 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(wp.x, yPos, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode ? '#0284C7' : '#D8B452';
        ctx.fill();
        ctx.restore();
      });

      // 3. Update & Draw Stars / Compass Points
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        s.alpha += Math.sin(Date.now() * s.pulse) * 0.006;
        const curAlpha = Math.max(0.2, Math.min(0.9, s.alpha));

        const displayY = (s.y - parallaxOffset * 0.6 + height * 2) % height;
        const starCopy = { ...s, y: displayY };

        if (s.isCompass) {
          drawCompassStar(starCopy, curAlpha, isLightMode);
        } else {
          const dotColor = isLightMode
            ? s.color.includes('216, 180')
              ? 'rgba(161, 116, 26, '
              : 'rgba(2, 132, 199, '
            : s.color;
          ctx.beginPath();
          ctx.arc(s.x, displayY, s.size, 0, Math.PI * 2);
          ctx.fillStyle = dotColor + curAlpha + ')';
          ctx.fill();
        }
      });

      // 4. Update & Draw Hot Air Balloons
      balloons.forEach((b) => {
        b.phase += 0.015;
        b.y += b.vy;
        b.x += b.vx + Math.sin(b.phase) * 0.12;

        if (b.y < -40) {
          b.y = height + 40;
          b.x = Math.random() * width;
        }

        const displayY = (b.y - parallaxOffset * 0.4 + height * 2) % (height + 80) - 40;
        drawBalloon({ ...b, y: displayY }, isLightMode);
      });

      // 5. Update & Draw Cruising Gliders / Planes with Contrails
      planes.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        const maxHistory = isMobile ? 14 : 26;
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > maxHistory) p.history.shift();

        // Draw dashed contrail tail
        if (p.history.length > 2) {
          ctx.save();
          ctx.setLineDash([4, 6]);
          ctx.lineWidth = isLightMode ? 1.5 : 1;
          for (let i = 0; i < p.history.length - 1; i++) {
            const trailAlpha = (i / p.history.length) * (isLightMode ? 0.6 : 0.35);
            ctx.strokeStyle = isLightMode
              ? `rgba(2, 132, 199, ${trailAlpha})`
              : `rgba(216, 180, 82, ${trailAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p.history[i].x, p.history[i].y);
            ctx.lineTo(p.history[i + 1].x, p.history[i + 1].y);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Screen wrapping
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

        drawPlane(p, isLightMode);
      });

      // 6. Interactive Mouse Compass Radar Ring (Desktop only)
      if (!isMobile && mouse.x !== null && mouse.y !== null) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 44, 0, Math.PI * 2);
        ctx.strokeStyle = isLightMode
          ? 'rgba(161, 116, 26, 0.35)'
          : 'rgba(216, 180, 82, 0.22)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = isLightMode
          ? 'rgba(2, 132, 199, 0.35)'
          : 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    }

    animFrameId = requestAnimationFrame(animate);

    return () => {
      animRunning = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* 1. Subtle Dot Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40" />

      {/* 2. Interactive Mouse Ambient Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-70 dark:opacity-50"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(216, 180, 82, 0.08), transparent 75%)`,
        }}
      />

      {/* 3. Floating Organic Ambient Orbs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#D8B452]/20 via-[#F3D887]/10 to-transparent blur-[120px] animate-orb-1" />
      <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-indigo-500/10 via-[#0b0c33]/40 dark:via-[#0b0c33]/70 to-transparent blur-[140px] animate-orb-2" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D8B452]/10 blur-[110px] animate-orb-1" />

      {/* 4. Dynamic Moving Interactive 2D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85 dark:opacity-75 transition-opacity duration-500"
      />

      {/* 5. Filmic Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-25 dark:opacity-45" />
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * HeroAnimatedBackground Component
 * Renders high-performance ambient ophthalmic particles, refractive rings,
 * and laser optic sweeps in the background of the Hero section.
 * - Auto-pauses when off-screen via IntersectionObserver
 * - Respects prefers-reduced-motion
 * - Dynamic color palette adapting to Light and Dark modes
 */
export default function HeroAnimatedBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Ophthalmic Floating Particles (optical bokeh + light points)
    const particleCount = width < 768 ? 14 : 26;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: (Math.random() - 0.5) * 0.45,
      baseAlpha: Math.random() * 0.35 + 0.15,
      alpha: Math.random() * 0.35 + 0.15,
      alphaSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      isRed: Math.random() > 0.65 // Brand accent particles
    }));

    // Expanding Concentric Refractive Rings (Eye diagnostic optical focus)
    const rings = [
      {
        x: width * 0.8,
        y: height * 0.45,
        radius: 40,
        maxRadius: 180,
        speed: 0.35,
        alpha: 0.25
      },
      {
        x: width * 0.8,
        y: height * 0.45,
        radius: 100,
        maxRadius: 260,
        speed: 0.3,
        alpha: 0.2
      },
      {
        x: width * 0.15,
        y: height * 0.7,
        radius: 30,
        maxRadius: 160,
        speed: 0.25,
        alpha: 0.15
      }
    ];

    // Sweeping Optical Laser Scan Beam
    let beamY = 0;
    const beamSpeed = 0.6;

    const render = () => {
      if (!isVisible || prefersReducedMotion) {
        if (!prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(render);
        }
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const isDark =
        theme === 'dark' ||
        document.documentElement.getAttribute('data-theme') === 'dark';

      // 1. Draw Expanding Optical Focus Rings
      rings.forEach((ring) => {
        ring.radius += ring.speed;
        if (ring.radius > ring.maxRadius) {
          ring.radius = 20;
        }

        const ringProgress = ring.radius / ring.maxRadius;
        const currentAlpha = (1 - ringProgress) * ring.alpha * (isDark ? 0.35 : 0.2);

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(227, 30, 36, ${currentAlpha})`
          : `rgba(227, 30, 36, ${currentAlpha * 0.8})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Secondary inner dash ring
        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.arc(ring.x, ring.y, ring.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(96, 165, 250, ${currentAlpha * 0.6})`
          : `rgba(37, 99, 235, ${currentAlpha * 0.5})`;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Draw Gentle Sweeping Laser Line
      beamY += beamSpeed;
      if (beamY > height) {
        beamY = 0;
      }

      const beamGradient = ctx.createLinearGradient(0, beamY, width, beamY);
      const beamColor = isDark
        ? 'rgba(227, 30, 36, 0.08)'
        : 'rgba(227, 30, 36, 0.04)';
      beamGradient.addColorStop(0, 'rgba(227, 30, 36, 0)');
      beamGradient.addColorStop(0.5, beamColor);
      beamGradient.addColorStop(1, 'rgba(227, 30, 36, 0)');

      ctx.fillStyle = beamGradient;
      ctx.fillRect(0, beamY - 1, width, 2);

      // 3. Draw Floating Optical Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += p.alphaSpeed;
        if (p.alpha > p.baseAlpha + 0.15 || p.alpha < p.baseAlpha - 0.1) {
          p.alphaSpeed *= -1;
        }

        const displayAlpha = Math.max(0.05, Math.min(p.alpha, 0.45));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isRed) {
          ctx.fillStyle = isDark
            ? `rgba(227, 30, 36, ${displayAlpha})`
            : `rgba(227, 30, 36, ${displayAlpha * 0.75})`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(148, 163, 184, ${displayAlpha * 0.8})`
            : `rgba(100, 116, 139, ${displayAlpha * 0.5})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Performance Optimization: IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <div className="hero-animated-bg-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-animated-canvas" />
      {/* Ambient optical gradient spheres */}
      <div className="hero-bg-orb hero-bg-orb--primary" />
      <div className="hero-bg-orb hero-bg-orb--secondary" />
      <div className="hero-bg-grid-overlay" />
    </div>
  );
}

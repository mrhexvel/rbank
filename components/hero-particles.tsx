"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = innerWidth * pixelRatio;
      canvas.height = innerHeight * pixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 100;
    const particleColor = "#10b981";
    const lineColor = "rgba(16, 185, 129, 0.1)";
    const particleRadius = 2;
    const lineWidth = 1;
    const maxDistance = 150;
    const animationSpeed = 0.5;

    const particles: {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        directionX: (Math.random() - 0.5) * animationSpeed,
        directionY: (Math.random() - 0.5) * animationSpeed,
        size: Math.random() * particleRadius + 1,
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.directionX;
        p.y += p.directionY;

        if (p.x < 0 || p.x > canvas.width) p.directionX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.directionY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth * (1 - distance / maxDistance);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}

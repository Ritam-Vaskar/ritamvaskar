'use client';

import { useEffect, useRef } from 'react';

const ParticleBackground = ({
  particleCount = 80,
  maxDistance = 120,
  backgroundColor = '#faf5ff', // Light purple background
  particleColor = '#9333ea', // Purple particles
  className = ''
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });
  const animationFrameRef = useRef();

  const createParticle = (canvas) => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    baseSize: Math.random() * 3 + 1,
    speedX: Math.random() * 2 - 1,
    speedY: Math.random() * 2 - 1,
    baseSpeedX: Math.random() * 2 - 1,
    baseSpeedY: Math.random() * 2 - 1,
    color: `${particleColor}AA`
  });

  const initParticles = (canvas) => {
    particlesRef.current = Array.from(
      { length: particleCount },
      () => createParticle(canvas)
    );
  };

  const updateParticle = (particle, canvas) => {
    if (mouseRef.current.x !== null) {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRef.current.radius) {
        const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
        const angle = Math.atan2(dy, dx);

        particle.speedX = Math.cos(angle) * force * 5;
        particle.speedY = Math.sin(angle) * force * 5;
        particle.size = particle.baseSize * (1.5 - force);
      } else {
        particle.speedX = particle.baseSpeedX;
        particle.speedY = particle.baseSpeedY;
        particle.size = particle.baseSize;
      }
    }

    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x > canvas.width || particle.x < 0) {
      particle.speedX *= -1;
    }
    if (particle.y > canvas.height || particle.y < 0) {
      particle.speedY *= -1;
    }
  };

  const drawParticle = (ctx, particle) => {
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawConnections = (ctx, particles) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `${particleColor}${Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = `${backgroundColor}10`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      updateParticle(particle, canvas);
      drawParticle(ctx, particle);
    });

    drawConnections(ctx, particlesRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 120
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null, radius: 100 };
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-0 left-0 w-full h-full ${className}`}
      style={{ background: backgroundColor }}
    />
  );
};

export default ParticleBackground;

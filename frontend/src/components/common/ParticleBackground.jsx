import React, { useEffect, useRef } from 'react';
import { useTheme, ACCENTS } from '../../contexts/ThemeContext';

export const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { accent } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Tracker for mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 120, // repulsion radius
    };

    // Track mouse move
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Get current accent RGB string
    const getAccentRGB = () => {
      return ACCENTS[accent]?.rgb || '168, 85, 247';
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1; // particle radius
        this.vx = (Math.random() - 0.5) * 0.4; // horizontal speed
        this.vy = (Math.random() - 0.5) * 0.4; // vertical speed
        this.density = Math.random() * 20 + 5;
      }

      draw() {
        if (!ctx) return;
        const rgb = getAccentRGB();
        ctx.fillStyle = `rgba(${rgb}, 0.6)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Slow float
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Interaction with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            // Push away particles (repulsion effect)
            const force = (mouse.radius - distance) / mouse.radius;
            const forceX = (dx / distance) * force * 15;
            const forceY = (dy / distance) * force * 15;
            
            this.x -= forceX;
            this.y -= forceY;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      // Scale count based on screen size
      const count = Math.floor((width * height) / 11000);
      const activeCount = Math.min(count, 130);
      for (let i = 0; i < activeCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      const rgb = getAccentRGB();
      const maxDistance = 140;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Calculate line opacity based on distance
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connection lines
      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accent]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none bg-dark-bg"
    />
  );
};

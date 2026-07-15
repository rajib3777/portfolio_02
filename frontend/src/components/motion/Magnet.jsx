import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const Magnet = ({ children, strength = 30, className = '' }) => {
  const magnetRef = useRef(null);

  useEffect(() => {
    const magnet = magnetRef.current;
    if (!magnet) return;

    const handleMouseMove = (e) => {
      const bound = magnet.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;

      // Translate the button towards the mouse coordinates
      gsap.to(magnet, {
        x: x * (strength / 100),
        y: y * (strength / 100),
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Snap back to normal on mouse leave
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
      });
    };

    magnet.addEventListener('mousemove', handleMouseMove);
    magnet.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      magnet.removeEventListener('mousemove', handleMouseMove);
      magnet.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magnetRef} className={`magnetic-btn ${className}`}>
      {children}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MouseFollower = () => {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Position of mouse cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor movement
  const springConfig = { damping: 30, stiffness: 250, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    if (isTouchDevice) return;

    const moveCursor = (e) => {
      mouseX.set(e.clientX - 10); // Offset half size
      mouseY.set(e.clientY - 10);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Find element with data-cursor attribute up the tree
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorType(type);
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorText(text);
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Add custom-cursor-active class to body
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Variants for different cursor modes
  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1.5px solid var(--accent-color)',
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
      border: '1.5px solid var(--accent-color)',
      scale: 1.1,
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'var(--accent-color)',
      border: '1px solid var(--accent-color)',
      scale: 1,
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: '#F3F4F6',
      border: '1px solid #F3F4F6',
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] flex items-center justify-center text-center overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        ...variants[cursorType],
      }}
      animate={cursorType}
      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
    >
      {cursorType === 'view' && (
        <span className="text-[10px] uppercase font-bold tracking-widest text-dark-bg font-mono select-none">
          {cursorText || 'VIEW'}
        </span>
      )}
    </motion.div>
  );
};

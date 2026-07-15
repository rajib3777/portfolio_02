import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

export const ScrollReveal = ({ children, type = 'chars', className = '', delay = 0 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text using SplitType library
    const split = new SplitType(element, {
      types: type === 'chars' ? 'words,chars' : 'lines,words',
      tagName: 'span'
    });

    const targets = type === 'chars' ? split.chars : split.words;

    // Set initial visual styles
    gsap.set(targets, { y: '105%', opacity: 0 });

    // GSAP ScrollTrigger timeline animation
    const anim = gsap.to(targets, {
      y: '0%',
      opacity: 1,
      duration: 0.9,
      ease: 'power4.out',
      stagger: type === 'chars' ? 0.025 : 0.05,
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });

    return () => {
      anim.kill();
      split.revert();
    };
  }, [children, type, delay]);

  return (
    <span ref={textRef} className={`inline-block line-reveal ${className}`}>
      {children}
    </span>
  );
};

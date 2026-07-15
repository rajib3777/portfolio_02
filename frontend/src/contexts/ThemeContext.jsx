import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ACCENTS = {
  purple: {
    hex: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.15)',
    rgb: '168, 85, 247',
  },
  blue: {
    hex: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.15)',
    rgb: '59, 130, 246',
  },
  cyan: {
    hex: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.15)',
    rgb: '6, 182, 212',
  },
  emerald: {
    hex: '#10B981',
    glow: 'rgba(16, 185, 129, 0.15)',
    rgb: '16, 185, 129',
  },
  orange: {
    hex: '#F97316',
    glow: 'rgba(249, 115, 22, 0.15)',
    rgb: '249, 115, 22',
  },
};

export const ThemeProvider = ({ children }) => {
  const [accent, setAccentState] = useState(() => {
    return localStorage.getItem('portfolio-accent') || 'purple';
  });

  const changeAccent = (colorName) => {
    if (ACCENTS[colorName]) {
      setAccentState(colorName);
      localStorage.setItem('portfolio-accent', colorName);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    const currentAccent = ACCENTS[accent] || ACCENTS.purple;
    
    // Apply styling variables to document root
    root.style.setProperty('--accent-color', currentAccent.hex);
    root.style.setProperty('--accent-glow', currentAccent.glow);
    root.style.setProperty('--accent-rgb', currentAccent.rgb);
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ accent, changeAccent, accents: Object.keys(ACCENTS), activeColors: ACCENTS[accent] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

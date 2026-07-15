import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ParticleBackground } from '../components/common/ParticleBackground';
import { MouseFollower } from '../components/common/MouseFollower';
import { ThemeCustomizer } from '../components/common/ThemeCustomizer';
import { SmoothScroll } from '../components/motion/SmoothScroll';

export const MainLayout = ({ children }) => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-white select-none selection:bg-accent/40 selection:text-white">
        {/* Procedural Grain Overlay */}
        <div className="noise-overlay" />

        {/* 3D Particle Canvas */}
        <ParticleBackground />

        {/* Custom Follower Cursor */}
        <MouseFollower />

        {/* Settings Floating Widget */}
        <ThemeCustomizer />

        {/* Primary Navbar */}
        <Navbar />

        {/* Subpages Content */}
        <main className="pt-24 min-h-[calc(100vh-80px)]">
          {children}
        </main>

        {/* Primary Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};
export default MainLayout;

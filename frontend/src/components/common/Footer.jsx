import React from 'react';
import { Magnet } from '../motion/Magnet';
import { FiArrowUp, FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06060A] border-t border-dark-border py-12 px-6 md:px-12 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
            AR<span className="text-accent">.</span>
          </h3>
          <p className="text-xs text-gray-500 mt-2 font-mono">
            Designed & developed by Alex Rivers © {new Date().getFullYear()}
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <Magnet strength={20}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="w-10 h-10 rounded-full bg-white/5 border border-dark-border flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-colors"
            >
              <FiGithub size={18} />
            </a>
          </Magnet>
          <Magnet strength={20}>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="w-10 h-10 rounded-full bg-white/5 border border-dark-border flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-colors"
            >
              <FiLinkedin size={18} />
            </a>
          </Magnet>
          <Magnet strength={20}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="w-10 h-10 rounded-full bg-white/5 border border-dark-border flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-colors"
            >
              <FiTwitter size={18} />
            </a>
          </Magnet>
          <Magnet strength={20}>
            <a
              href="mailto:alex.rivers@example.com"
              data-cursor="pointer"
              className="w-10 h-10 rounded-full bg-white/5 border border-dark-border flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-colors"
            >
              <FiMail size={18} />
            </a>
          </Magnet>
        </div>

        {/* Back to top */}
        <Magnet strength={25}>
          <button
            onClick={scrollToTop}
            data-cursor="pointer"
            className="w-12 h-12 rounded-full glass-panel border border-dark-border flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-all shadow-md"
            title="Back to top"
          >
            <FiArrowUp size={20} />
          </button>
        </Magnet>
      </div>
    </footer>
  );
};

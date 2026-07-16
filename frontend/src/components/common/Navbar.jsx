import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Magnet } from '../motion/Magnet';
import { FiMenu, FiX } from 'react-icons/fi';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Activities', path: '/#activities' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleLinkClick = (path) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-6 py-3 rounded-full border border-dark-border shadow-xl">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-white font-sans" data-cursor="pointer">
          RS<span className="text-accent">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path || (link.path.startsWith('/#') && location.pathname === '/');
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                data-cursor="pointer"
                className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-white"
              >
                {/* Glide Background */}
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="navHover"
                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions (Availability indicator) */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Available for Hire
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none"
          data-cursor="pointer"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden absolute top-20 left-6 right-6 glass-panel rounded-3xl p-6 border border-dark-border flex flex-col gap-4 shadow-2xl"
        >
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleLinkClick(link.path)}
              className="text-lg font-medium text-gray-300 hover:text-white py-2 border-b border-white/5 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 justify-center mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-bold">
              AVAILABLE FOR HIRE
            </span>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

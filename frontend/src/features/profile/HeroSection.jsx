import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
const CountUpComponent = typeof CountUp === 'object' && CountUp.default ? CountUp.default : CountUp;
import { FiDownload, FiMail, FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Magnet } from '../../components/motion/Magnet';
import { getProfile, getSiteSettings } from '../profile/profileService';

const TYPING_TITLES = [
  'Full Stack Architect',
  'UI/UX Craftsman',
  'Motion Designer',
  'Open Source Builder',
  'Backend Engineer',
];

const TypingEffect = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_TITLES[titleIndex];
    let timer;
    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TYPING_TITLES.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, titleIndex]);

  return (
    <span className="text-accent font-mono">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export const HeroSection = () => {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: getProfile });
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: getSiteSettings });
  const { data: stats = [] } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await apiClient.get('stats/');
      return response.data;
    }
  });

  const socialLinks = settings?.social_links || {};

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
      {/* Ambient Glow Blobs */}
      <div className="gradient-blob w-[600px] h-[600px] bg-accent top-[-150px] left-[-150px] animate-drift" />
      <div className="gradient-blob w-[400px] h-[400px] bg-purple-800 bottom-[-100px] right-[-100px] animate-drift" style={{ animationDelay: '-8s' }} />

      <div className="max-w-7xl mx-auto w-full pt-20 pb-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                {settings?.availability_status || 'Available for hire'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white"
            >
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="relative z-10">
                  {profile?.full_name?.split(' ')[0] || 'Alex'}
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-1 left-0 w-full h-2 bg-accent/30 origin-left rounded"
                />
              </span>
            </motion.h1>

            {/* Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-3xl md:text-4xl font-bold mt-4 text-gray-300 tracking-tight"
            >
              I'm a <TypingEffect />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl"
            >
              {profile?.bio_summary || 'Crafting premium digital experiences where engineering precision meets cinematic design.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <Magnet strength={30}>
                <a
                  href="/#projects"
                  data-cursor="pointer"
                  className="px-8 py-4 bg-accent text-dark-bg rounded-full font-bold text-sm hover:bg-opacity-90 transition-all shadow-lg shadow-accent/25 flex items-center gap-2"
                >
                  View Projects
                </a>
              </Magnet>
              <Magnet strength={30}>
                <a
                  href="/#contact"
                  data-cursor="pointer"
                  className="px-8 py-4 glass-panel border border-dark-border text-white rounded-full font-bold text-sm flex items-center gap-2 hover:border-accent/40 transition-all"
                >
                  <FiMail size={16} />
                  Hire Me
                </a>
              </Magnet>
              {settings?.resume_pdf && (
                <Magnet strength={20}>
                  <a
                    href={settings.resume_pdf}
                    download
                    data-cursor="pointer"
                    className="px-6 py-4 text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors font-medium"
                  >
                    <FiDownload size={16} />
                    Resume
                  </a>
                </Magnet>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-center gap-4 mt-8"
            >
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Follow</span>
              <div className="h-px w-12 bg-white/10" />
              {[
                { icon: FiGithub, href: socialLinks.github || '#', label: 'GitHub' },
                { icon: FiLinkedin, href: socialLinks.linkedin || '#', label: 'LinkedIn' },
                { icon: FiTwitter, href: socialLinks.twitter || '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <Magnet key={label} strength={20}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="pointer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full glass-panel border border-dark-border flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                </Magnet>
              ))}
            </motion.div>
          </div>

          {/* Profile Image / Visual Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            <div className="relative w-[320px] h-[380px] md:w-[380px] md:h-[460px]">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-accent/20 rotate-3" />
              {/* Inner container */}
              <div className="absolute inset-2 rounded-[2rem] overflow-hidden glass-panel border border-dark-border">
                {settings?.profile_image ? (
                  <img
                    src={settings.profile_image}
                    alt={profile?.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Placeholder gradient avatar */
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent/10 via-transparent to-purple-900/10">
                    <div className="w-24 h-24 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-5xl font-extrabold text-accent">
                      {profile?.full_name?.[0] || 'A'}
                    </div>
                    <span className="text-xs font-mono text-gray-500 tracking-widest">PROFILE PHOTO</span>
                  </div>
                )}
              </div>
              {/* Floating tag — tech label */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-6 glass-panel border border-dark-border px-4 py-2 rounded-2xl shadow-xl"
              >
                <span className="text-xs font-mono text-accent font-bold">
                  6+ yrs experience
                </span>
              </motion.div>
              {/* Floating tech badge */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -top-4 -right-6 glass-panel border border-dark-border px-4 py-2 rounded-2xl shadow-xl"
              >
                <span className="text-xs font-mono text-gray-300 font-bold">
                  React · Django · WebGL
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-8 border-t border-dark-border"
        >
          {stats.map((stat, idx) => (
            <div key={stat.label} className="flex flex-col">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                <CountUpComponent end={stat.value} duration={2.5} delay={1.2 + idx * 0.1} />
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <span className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="/#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors"
            data-cursor="pointer"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
            <FiArrowDown size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

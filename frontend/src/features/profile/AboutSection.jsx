import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getProfile } from './profileService';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import { FiMapPin, FiGlobe, FiAward } from 'react-icons/fi';

const TimelineItem = ({ year, title, desc, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="relative pl-8"
  >
    {/* Dot */}
    <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-accent border-2 border-dark-bg shadow-[0_0_10px_var(--accent-color)]" />
    {/* Line down */}
    {!isLast && (
      <div className="absolute left-[5px] top-4 bottom-[-20px] w-px bg-gradient-to-b from-accent/50 to-transparent" />
    )}
    <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1">{year}</div>
    <h4 className="text-sm font-bold text-white">{title}</h4>
    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
  </motion.div>
);

const CAREER_JOURNEY = [
  { 
    year: '2023', 
    title: 'CSE Fundamentals — Phitron', 
    desc: 'Started a rigorous 2-year software engineering training program covering C, C++, Data Structures, Algorithms, and OOP.' 
  },
  { 
    year: '2025', 
    title: 'Software Developer Intern — Somadhan Soft', 
    desc: 'Collaborated on VisaFarm and JobsAlign, developing backend authentication flows and responsive Bootstrap interfaces.' 
  },
  { 
    year: '2025', 
    title: 'Software Developer — Code Astro', 
    desc: 'Engineered web platforms (LMS portals, furniture customization, and e-commerce) using React, Django, Celery, and WebSockets.' 
  },
  { 
    year: '2026', 
    title: 'Automation Engineer — Galaxy TV', 
    desc: 'Built Python automation scripts and cron jobs to streamline manual scheduling and administrative tasks.' 
  },
  { 
    year: 'Present', 
    title: 'B.Sc. in CSE — University of Scholars', 
    desc: 'Currently pursuing Bachelor of Computer Science and Engineering, maintaining a perfect CGPA of 4.00.' 
  },
];

export const AboutSection = () => {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: getProfile });

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section label */}
      <div className="mb-16">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">About Me</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
          <ScrollReveal type="words">The Story Behind the Code</ScrollReveal>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Bio + Meta */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel p-8 rounded-3xl border border-dark-border"
          >
            <div
              className="text-gray-300 leading-relaxed space-y-4 text-sm md:text-base prose prose-invert"
              dangerouslySetInnerHTML={{ __html: profile?.detailed_bio || '<p>Loading biography...</p>' }}
            />
          </motion.div>

          {/* Quick Meta Info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FiMapPin, label: 'Location', value: profile?.location || '—', full: false },
              { icon: FiGlobe, label: 'Nationality', value: profile?.nationality || '—', full: false },
              { icon: FiAward, label: 'Languages', value: profile?.languages?.join(', ') || '—', full: true },
            ].map(({ icon: Icon, label, value, full }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`glass-panel p-3 rounded-2xl border border-dark-border flex items-start gap-2.5 ${
                  full ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Icon size={13} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</div>
                  <div className="text-xs font-bold text-white mt-0.5 break-words">{value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Career Journey Timeline */}
        <div>
          <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-8">
            Career Timeline
          </h3>
          <div className="space-y-8">
            {CAREER_JOURNEY.map((item, idx) => (
              <TimelineItem
                key={`${item.year}-${idx}`}
                {...item}
                isLast={idx === CAREER_JOURNEY.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

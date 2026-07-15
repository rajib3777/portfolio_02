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
  { year: '2018', title: 'First Line of Code', desc: 'Discovered Python and built my first web scraper. Never looked back.' },
  { year: '2020', title: 'First Freelance Client', desc: 'Delivered a full Django + Bootstrap dashboard for a local business.' },
  { year: '2022', title: 'Computer Science Degree', desc: 'Graduated from UC Berkeley with a focus on Computer Graphics and HCI.' },
  { year: '2023', title: 'Senior Frontend Role', desc: 'Joined StripeCraft Agency, engineering award-winning React interfaces.' },
  { year: '2024', title: 'Lead Architect @ Aether', desc: 'Leading a team of six engineers building cloud-scale analytics tools.' },
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
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FiMapPin, label: 'Location', value: profile?.location || '—' },
              { icon: FiGlobe, label: 'Nationality', value: profile?.nationality || '—' },
              { icon: FiAward, label: 'Languages', value: profile?.languages?.join(', ') || '—' },
            ].map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-4 rounded-2xl border border-dark-border flex items-start gap-3 col-span-1"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Icon size={15} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{value}</div>
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
                key={item.year}
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

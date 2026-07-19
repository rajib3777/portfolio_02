import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getSkills } from '../../services/portfolioService';
import { ScrollReveal } from '../../components/motion/ScrollReveal';

const LEVEL_ORDER = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const LEVEL_STYLES = {
  Beginner:     { bar: 'w-1/4',  dot: 'bg-sky-500',      text: 'text-sky-400',      badge: 'bg-sky-500/10 border-sky-500/30' },
  Intermediate: { bar: 'w-2/4',  dot: 'bg-amber-500',    text: 'text-amber-400',    badge: 'bg-amber-500/10 border-amber-500/30' },
  Advanced:     { bar: 'w-3/4',  dot: 'bg-accent',       text: 'text-accent',       badge: 'bg-accent/10 border-accent/30' },
  Expert:       { bar: 'w-full', dot: 'bg-emerald-500',  text: 'text-emerald-400',  badge: 'bg-emerald-500/10 border-emerald-500/30' },
};

const SkillPill = ({ skill, delay = 0 }) => {
  const style = LEVEL_STYLES[skill.level] || LEVEL_STYLES.Intermediate;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel border rounded-2xl p-3 flex flex-col gap-2 group hover:scale-[1.02] transition-transform duration-300 min-w-0 ${style.badge}`}
    >
      {/* Name row — name wraps, badge stays on right */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <span className="text-xs sm:text-sm font-bold text-white leading-snug break-words min-w-0">
          {skill.name}
        </span>
        <span
          className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 mt-0.5 ${style.badge} ${style.text}`}
        >
          {skill.level}
        </span>
      </div>
      {/* Level Bar */}
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: undefined }}
          viewport={{ once: true }}
          className={`h-full ${style.dot} ${style.bar} rounded-full transition-all duration-1000 ease-out`}
        />
      </div>
    </motion.div>
  );
};

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Soft Skills'];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const inCat = skills.filter((s) => s.category === cat);
    if (inCat.length) acc[cat] = inCat;
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">Expertise</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
          <ScrollReveal type="words">Skills &amp; Proficiency</ScrollReveal>
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl text-sm leading-relaxed">
          Rated honestly — no inflated percentages. Just real-world, battle-tested familiarity.
        </p>
      </div>

      {/* Level Legend */}
      <div className="flex flex-wrap gap-2 mb-8">
        {LEVEL_ORDER.map((level) => {
          const style = LEVEL_STYLES[level];
          return (
            <div key={level} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold ${style.badge} ${style.text}`}>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
              {level}
            </div>
          );
        })}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            data-cursor="pointer"
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-accent text-dark-bg border border-accent shadow-md shadow-accent/20'
                : 'bg-white/5 border border-dark-border text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="glass-panel rounded-2xl h-20 animate-pulse" />
          ))}
        </div>
      ) : activeCategory === 'All' ? (
        /* Grouped Display */
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category}>
              <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-3">
                {category}
                <span className="h-px flex-1 bg-white/5" />
              </h3>
              {/* On mobile: single column for long names, 2-col for short */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {catSkills.map((skill, idx) => (
                  <SkillPill key={skill.id} skill={skill} delay={idx * 0.05} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((skill, idx) => (
            <SkillPill key={skill.id} skill={skill} delay={idx * 0.05} />
          ))}
        </div>
      )}
    </section>
  );
};

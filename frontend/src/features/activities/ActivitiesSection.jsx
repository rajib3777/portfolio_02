import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getActivities } from '../../services/portfolioService';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import { FiExternalLink, FiCode, FiMic, FiUsers, FiHeart, FiBook, FiFileText } from 'react-icons/fi';

const ACTIVITY_ICONS = {
  'Open Source': FiCode,
  'Speaking':    FiMic,
  'Mentoring':   FiUsers,
  'Volunteer':   FiHeart,
  'Research':    FiBook,
  'Publications':FiFileText,
};

const ACTIVITY_COLORS = {
  'Open Source': 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
  'Speaking':    'bg-blue-500/10 border-blue-500/25 text-blue-400',
  'Mentoring':   'bg-purple-500/10 border-purple-500/25 text-purple-400',
  'Volunteer':   'bg-rose-500/10 border-rose-500/25 text-rose-400',
  'Research':    'bg-amber-500/10 border-amber-500/25 text-amber-400',
  'Publications':'bg-cyan-500/10 border-cyan-500/25 text-cyan-400',
};

const ActivityCard = ({ activity, index }) => {
  const Icon = ACTIVITY_ICONS[activity.category] || FiCode;
  const colorClass = ACTIVITY_COLORS[activity.category] || 'bg-white/5 border-white/10 text-gray-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel glass-panel-hover p-6 rounded-3xl border border-dark-border flex flex-col gap-4 h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorClass}`}>
          <Icon size={18} />
        </div>
        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${colorClass}`}>
          {activity.category}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-base font-bold text-white">{activity.title}</h3>
        {activity.association && (
          <p className="text-xs text-accent mt-1 font-medium">{activity.association}</p>
        )}
        <div
          className="text-xs text-gray-400 mt-3 leading-relaxed prose prose-invert prose-xs max-w-none"
          dangerouslySetInnerHTML={{ __html: activity.description }}
        />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-[10px] font-mono text-gray-500">{activity.date_or_duration}</span>
        {activity.link && (
          <a
            href={activity.link}
            target="_blank"
            rel="noreferrer"
            data-cursor="pointer"
            className="text-gray-500 hover:text-accent transition-colors flex items-center gap-1 text-xs"
          >
            <FiExternalLink size={13} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ALL_CATS = ['All', 'Open Source', 'Speaking', 'Mentoring', 'Volunteer', 'Research', 'Publications'];

export const ActivitiesSection = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities', activeCategory],
    queryFn: () => getActivities(activeCategory !== 'All' ? { category: activeCategory } : {}),
  });

  return (
    <section id="activities" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">Beyond Code</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
          <ScrollReveal type="words">Professional Activities</ScrollReveal>
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl text-sm leading-relaxed">
          Open source contributions, community speaking, mentorship, research publications, and volunteer work.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {ALL_CATS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            data-cursor="pointer"
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-accent text-dark-bg border border-accent'
                : 'bg-white/5 border border-dark-border text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-panel rounded-3xl h-52 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act, idx) => (
            <ActivityCard key={act.id} activity={act} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
};

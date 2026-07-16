import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getExperience, getEducation, getCertifications } from '../../services/portfolioService';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import { FiExternalLink, FiUsers, FiMapPin, FiBriefcase, FiAward } from 'react-icons/fi';

const ExperienceCard = ({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="relative pl-6 md:pl-0 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 group"
  >
    {/* Timeline connector (desktop) */}
    <div className="hidden md:block">
      <div className="text-xs font-mono text-gray-500 mt-2 text-right pr-8 border-r border-dark-border">
        <span className="block text-accent font-bold">{exp.duration}</span>
        <span className="block mt-1">{exp.remote_onsite}</span>
        <span className="block mt-1">{exp.employment_type}</span>
      </div>
    </div>
    {/* Card */}
    <div className="glass-panel glass-panel-hover p-6 rounded-3xl border border-dark-border relative">
      {/* Current Badge */}
      {exp.current && (
        <span className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Current
        </span>
      )}
      <div className="flex items-start gap-4">
        {exp.company_logo ? (
          <img src={exp.company_logo} alt={exp.company_name} className="w-12 h-12 rounded-xl object-cover border border-dark-border" />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-extrabold text-lg">
            {exp.company_name?.[0]}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white">{exp.position}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-sm text-accent font-medium">{exp.company_name}</span>
            {exp.company_website && (
              <a href={exp.company_website} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" data-cursor="pointer">
                <FiExternalLink size={13} />
              </a>
            )}
          </div>
          {/* Mobile metadata */}
          <div className="flex flex-wrap gap-3 mt-2 md:hidden text-xs font-mono text-gray-500">
            <span>{exp.duration}</span>
            <span>{exp.remote_onsite}</span>
            <span>{exp.employment_type}</span>
          </div>
        </div>
      </div>
      
      {/* Quick stats row */}
      <div className="flex flex-wrap gap-4 mt-4 py-3 border-y border-white/5 text-xs font-mono text-gray-400">
        {exp.team_size && (
          <span className="flex items-center gap-1">
            <FiUsers size={12} className="text-accent" />
            Team of {exp.team_size}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FiBriefcase size={12} className="text-accent" />
          {exp.employment_type}
        </span>
        <span className="flex items-center gap-1">
          <FiMapPin size={12} className="text-accent" />
          {exp.remote_onsite}
        </span>
      </div>

      {/* Responsibilities */}
      <div
        className="mt-4 text-sm text-gray-400 leading-relaxed prose prose-invert prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: exp.responsibilities }}
      />

      {/* Achievements */}
      {exp.achievements?.length > 0 && (
        <ul className="mt-4 space-y-2">
          {exp.achievements.map((ach, i) => (
            <li key={i} className="flex gap-3 text-xs text-gray-300">
              <span className="text-accent font-mono font-bold mt-0.5">▸</span>
              <span>{ach}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech Tags */}
      {exp.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-5">
          {exp.technologies.map((tech) => (
            <span key={tech} className="text-[10px] font-mono bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const CertificationCard = ({ cert, index }) => {
  const [showModal, setShowModal] = React.useState(false);

  const getMediaUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';
    const domain = baseUrl.replace('/api/', '');
    let cleanPath = path;
    if (!path.startsWith('media/') && !path.startsWith('/media/')) {
      cleanPath = `media/${path}`;
    }
    return `${domain}/${cleanPath.replace(/^\//, '')}`;
  };

  const imgUrl = getMediaUrl(cert.image);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glass-panel p-6 rounded-3xl border border-dark-border flex flex-col sm:flex-row gap-6 items-start hover:border-accent/40 transition-colors duration-300"
      >
        {cert.image ? (
          <div 
            onClick={() => setShowModal(true)}
            className="w-full sm:w-28 h-20 rounded-2xl overflow-hidden border border-white/5 flex-shrink-0 bg-white/5 relative group cursor-zoom-in"
          >
            <img 
              src={imgUrl} 
              alt={cert.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-[10px] font-mono text-white bg-black/60 px-2 py-1 rounded-full uppercase tracking-wider">Zoom</span>
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
            <FiAward size={22} />
          </div>
        )}

        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white leading-tight">{cert.name}</h3>
              <p className="text-sm text-accent font-medium mt-1">{cert.issuing_organization}</p>
            </div>
            <span className="text-xs font-mono text-gray-400">{cert.issue_date}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-white/5">
            {cert.credential_id && (
              <span className="text-[10px] font-mono text-gray-500">
                ID: {cert.credential_id}
              </span>
            )}
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-accent hover:text-white flex items-center gap-1 transition-colors"
                data-cursor="pointer"
              >
                Verify <FiExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img 
              src={imgUrl} 
              alt={cert.name} 
              className="max-w-full max-h-[85vh] object-contain"
            />
            <button 
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const EducationCard = ({ edu, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="glass-panel p-6 rounded-3xl border border-dark-border"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-base font-bold text-white">{edu.degree}</h3>
        <p className="text-sm text-accent font-medium mt-0.5">{edu.institution}</p>
      </div>
      <div className="text-right">
        <span className="text-xs font-mono text-gray-400">{edu.passing_year}</span>
        {edu.result && <span className="block text-xs text-gray-500 mt-1">{edu.result}</span>}
      </div>
    </div>
    {edu.achievements && (
      <p className="text-xs text-gray-400 mt-3 leading-relaxed">{edu.achievements}</p>
    )}
    {edu.relevant_courses?.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {edu.relevant_courses.map((c) => (
          <span key={c} className="text-[10px] font-mono bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded">
            {c}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

export const ExperienceSection = () => {
  const { data: experience = [], isLoading: expLoading } = useQuery({
    queryKey: ['experience'],
    queryFn: getExperience,
  });
  const { data: education = [], isLoading: eduLoading } = useQuery({
    queryKey: ['education'],
    queryFn: getEducation,
  });
  const { data: certifications = [], isLoading: certsLoading } = useQuery({
    queryKey: ['certifications'],
    queryFn: getCertifications,
  });

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Experience */}
      <div className="mb-16">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">Work History</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
          <ScrollReveal type="words">Work Experience</ScrollReveal>
        </h2>
      </div>

      <div className="space-y-8 mb-24">
        {expLoading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="glass-panel rounded-3xl h-48 animate-pulse" />
            ))
          : experience.map((exp, idx) => (
              <ExperienceCard key={exp.id} exp={exp} index={idx} />
            ))}
      </div>

      {/* Education */}
      <div className="mb-12">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">Academic</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
          <ScrollReveal type="words">Education</ScrollReveal>
        </h2>
      </div>

      <div className="space-y-4 mb-24">
        {eduLoading
          ? Array.from({ length: 1 }).map((_, i) => (
              <div key={i} className="glass-panel rounded-3xl h-32 animate-pulse" />
            ))
          : education.map((edu, idx) => (
              <EducationCard key={edu.id} edu={edu} index={idx} />
            ))}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <div className="mb-12">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">Credentials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
              <ScrollReveal type="words">Certifications</ScrollReveal>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certsLoading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="glass-panel rounded-3xl h-36 animate-pulse" />
                ))
              : certifications.map((cert, idx) => (
                  <CertificationCard key={cert.id} cert={cert} index={idx} />
                ))}
          </div>
        </>
      )}
    </section>
  );
};

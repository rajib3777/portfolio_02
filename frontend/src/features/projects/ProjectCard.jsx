import React from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getProjectDetail } from './projectService';
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi';

export const ProjectCard = ({ project }) => {
  const queryClient = useQueryClient();

  // Prefetch project details when mouse hovers over the card
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['project', project.slug],
      queryFn: () => getProjectDetail(project.slug),
    });
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col h-full border border-dark-border group"
      data-cursor="view"
      data-cursor-text="PREVIEW"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden border-b border-dark-border">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center text-accent/40 font-mono text-sm">
            {project.title} Image
          </div>
        )}
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/85 via-dark-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 justify-between" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold font-mono text-gray-300 uppercase tracking-widest">
          {project.project_status}
        </div>

        {/* Version Badge */}
        <div className="absolute top-4 right-4 bg-accent/20 backdrop-blur-md border border-accent/30 px-3 py-1 rounded-full text-[10px] font-bold font-mono text-accent uppercase tracking-widest">
          {project.version}
        </div>
      </div>

      {/* Info Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category & Status */}
        <span className="text-[10px] font-bold font-mono text-accent uppercase tracking-widest">
          {project.category}
        </span>
        
        <h3 className="text-xl font-bold mt-2 text-white group-hover:text-accent transition-colors duration-300 flex items-center justify-between">
          <Link to={`/project/${project.slug}`} className="focus:outline-none">
            {project.title}
          </Link>
          <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 text-accent" />
        </h3>

        <p className="text-sm text-gray-400 mt-3 flex-grow line-clamp-3">
          {project.short_description}
        </p>

        {/* Technologies tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.technologies?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="text-[10px] font-mono text-accent px-1 py-0.5">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/5 my-4" />

        {/* Metrics Row */}
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500 uppercase">Perf</span>
              <span className={`font-bold ${getScoreColor(project.performance_score)}`}>
                {project.performance_score}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500 uppercase">SEO</span>
              <span className={`font-bold ${getScoreColor(project.seo_score)}`}>
                {project.seo_score}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500 uppercase">Sec</span>
              <span className={`font-bold ${getScoreColor(project.security_score)}`}>
                {project.security_score}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                title="Github repository"
              >
                <FiGithub size={15} />
              </a>
            )}
            {project.demo_link && (
              <a
                href={project.demo_link}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                title="Live preview"
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectDetail } from './projectService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCpu, FiGlobe, FiDatabase, FiLock } from 'react-icons/fi';
import { ScrollReveal } from '../../components/motion/ScrollReveal';

// Import swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export const ProjectDetailView = () => {
  const { slug } = useParams();

  // TanStack Query to fetch detailed data
  const { data: project, isLoading, isError } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => getProjectDetail(slug),
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'border-emerald-500 text-emerald-400';
    if (score >= 70) return 'border-amber-500 text-amber-400';
    return 'border-red-500 text-red-400';
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 animate-pulse font-mono">
        <div className="h-6 w-20 bg-white/5 rounded-md mb-8" />
        <div className="h-10 w-3/4 bg-white/5 rounded-md mb-4" />
        <div className="h-4 w-1/2 bg-white/5 rounded-md mb-12" />
        <div className="aspect-video bg-white/5 rounded-3xl w-full" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 text-center font-mono">
        <h2 className="text-xl text-red-400">Project Not Found</h2>
        <Link to="/" className="text-xs text-accent hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-6xl mx-auto py-12 px-6 md:px-12">
      {/* Return home link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white mb-8 transition-colors group"
        data-cursor="pointer"
      >
        <FiArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
        Back to Portfolio
      </Link>

      {/* Header Banner */}
      <div className="border-b border-dark-border pb-8 mb-12">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/25">
            {project.category}
          </span>
          <span className="text-xs font-mono font-bold text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            {project.version}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mt-2">
          {project.title}
        </h1>
        
        <p className="text-lg text-gray-400 mt-4 max-w-3xl leading-relaxed">
          {project.short_description}
        </p>
      </div>

      {/* Metadata Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Case Details Table */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Visual Carousel / Screenshot */}
          {project.images && project.images.length > 0 ? (
            <div className="rounded-3xl overflow-hidden border border-dark-border bg-white/5 select-none">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                className="w-full aspect-video"
              >
                {project.images.map((img) => (
                  <SwiperSlide key={img.id}>
                    <img src={img.image} alt={img.caption || project.title} className="w-full h-full object-cover" />
                    {img.caption && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono border border-white/10 text-gray-300">
                        {img.caption}
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : project.thumbnail ? (
            <div className="rounded-3xl overflow-hidden border border-dark-border aspect-video">
              <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
            </div>
          ) : null}

          {/* Project description (HTML output from Summernote editor) */}
          <div className="glass-panel p-8 rounded-3xl border border-dark-border space-y-6">
            <h3 className="text-xl font-bold border-b border-white/5 pb-3">Project Overview</h3>
            <div 
              className="text-gray-300 leading-relaxed space-y-4 font-sans text-sm md:text-base prose prose-invert"
              dangerouslySetInnerHTML={{ __html: project.long_description }}
            />
          </div>
        </div>

        {/* Project Meta Info Panel */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-dark-border font-mono text-xs space-y-4">
            <h3 className="text-sm font-bold font-sans text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Specs & Stats
            </h3>
            
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-500">Status</span>
              <span className="font-bold text-accent">{project.project_status}</span>
            </div>
            {project.client && (
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-500">Client</span>
                <span className="font-bold text-white">{project.client}</span>
              </div>
            )}
            {project.industry && (
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-500">Industry</span>
                <span className="font-bold text-white">{project.industry}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-500">Team Size</span>
              <span className="font-bold text-white">{project.team_size} Person</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-500">Repo Visibility</span>
              <span className="font-bold text-white">{project.repository_visibility}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-500">Deployment</span>
              <span className="font-bold text-white">{project.deployment}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-500">Database</span>
              <span className="font-bold text-white">{project.database}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-500">CI/CD</span>
              <span className="font-bold text-white">{project.ci_cd}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-500">Testing</span>
              <span className="font-bold text-white">{project.testing}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-500">Role</span>
              <span className="font-bold text-white font-sans">{project.role}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Duration</span>
              <span className="font-bold text-white">{project.duration}</span>
            </div>

            {/* CTA Links */}
            <div className="pt-4 flex flex-col gap-2">
              {project.demo_link && (
                <a
                  href={project.demo_link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="w-full bg-accent text-dark-bg py-2.5 rounded-xl font-bold font-sans text-center flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors"
                >
                  <FiExternalLink size={16} />
                  Visit Live Project
                </a>
              )}
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl font-bold border border-white/10 font-sans text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <FiGithub size={16} />
                  View Source Code
                </a>
              )}
            </div>
          </div>

          {/* Lighthouse Scores Widget */}
          <div className="glass-panel p-6 rounded-3xl border border-dark-border space-y-4">
            <h4 className="text-xs uppercase font-mono font-bold text-gray-400">
              Lighthouse Performance Audit
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-extrabold text-sm ${getScoreColor(project.performance_score)}`}>
                  {project.performance_score}
                </div>
                <span className="text-[10px] text-gray-400 mt-2 font-mono">Performance</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-extrabold text-sm ${getScoreColor(project.seo_score)}`}>
                  {project.seo_score}
                </div>
                <span className="text-[10px] text-gray-400 mt-2 font-mono">SEO</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-extrabold text-sm ${getScoreColor(project.security_score)}`}>
                  {project.security_score}
                </div>
                <span className="text-[10px] text-gray-400 mt-2 font-mono">Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {project.problem && (
          <div className="glass-panel p-8 rounded-3xl border border-dark-border">
            <h4 className="text-lg font-bold text-white mb-3">The Challenge</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">{project.problem}</p>
          </div>
        )}
        {project.solution && (
          <div className="glass-panel p-8 rounded-3xl border border-dark-border">
            <h4 className="text-lg font-bold text-white mb-3">The Solution</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">{project.solution}</p>
          </div>
        )}
        {project.challenges && (
          <div className="glass-panel p-8 rounded-3xl border border-dark-border">
            <h4 className="text-lg font-bold text-white mb-3">Technical Hurdles</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">{project.challenges}</p>
          </div>
        )}
        {project.lessons_learned && (
          <div className="glass-panel p-8 rounded-3xl border border-dark-border">
            <h4 className="text-lg font-bold text-white mb-3">Key Lessons</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">{project.lessons_learned}</p>
          </div>
        )}
      </div>

      {/* Future Roadmap */}
      {project.future_roadmap && project.future_roadmap.length > 0 && (
        <div className="glass-panel p-8 rounded-3xl border border-dark-border mb-12">
          <h4 className="text-lg font-bold text-white mb-4">Future Roadmap</h4>
          <ul className="space-y-2 font-mono text-xs">
            {project.future_roadmap.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-gray-400">
                <span className="text-accent font-bold">[{idx + 1}]</span>
                <span className="font-sans text-sm text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};
export default ProjectDetailView;

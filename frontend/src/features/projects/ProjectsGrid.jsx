import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from './projectService';
import { ProjectCard } from './ProjectCard';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import { FiSearch, FiSliders } from 'react-icons/fi';

export const ProjectsGrid = () => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  
  // Dynamic categories list
  const categories = ['All', 'Web App', 'Open Source', 'E-Commerce'];

  // Fetch projects list matching filters
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects', { category, search }],
    queryFn: () => {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      return getProjects(params);
    },
    // Keep previous data when fetching new query states to prevent layout shifts
    placeholderData: (prev) => prev,
  });

  return (
    <section id="projects" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Title */}
      <div className="mb-12">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">
          Works Showcase
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
          <ScrollReveal type="words">Selected Digital Projects</ScrollReveal>
        </h2>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              data-cursor="pointer"
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                category === cat
                  ? 'bg-accent text-dark-bg border border-accent shadow-lg shadow-accent/20'
                  : 'bg-white/5 border border-dark-border text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full lg:max-w-xs">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-dark-border rounded-full pl-10 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>
      </div>

      {/* Grid container */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-panel rounded-3xl h-[420px] p-6 flex flex-col justify-between animate-pulse">
              <div className="aspect-video bg-white/5 rounded-2xl w-full" />
              <div className="h-6 bg-white/5 rounded-md w-3/4 mt-4" />
              <div className="h-4 bg-white/5 rounded-md w-1/2 mt-2" />
              <div className="h-10 bg-white/5 rounded-md w-full mt-6" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-10 font-mono text-red-400 text-sm">
          Failed to load projects. Please try refreshing.
        </div>
      ) : projects?.length === 0 ? (
        <div className="text-center py-16 font-mono text-gray-500 text-sm">
          No projects found matching the criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};
export default ProjectsGrid;

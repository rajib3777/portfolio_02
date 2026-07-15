import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../../services/portfolioService';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import { FiClock, FiArrowUpRight, FiSearch } from 'react-icons/fi';

const BlogCard = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.55, delay: index * 0.08 }}
    className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-dark-border group flex flex-col h-full"
    data-cursor="view"
    data-cursor-text="READ"
  >
    {post.image && (
      <div className="aspect-video overflow-hidden border-b border-dark-border">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
    )}
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 border border-accent/25 px-2 py-0.5 rounded-full uppercase tracking-widest">
          {post.category}
        </span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
          <FiClock size={11} /> {post.read_time}
        </span>
      </div>
      <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors flex items-start justify-between gap-2 flex-1">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 text-accent mt-0.5" />
      </h3>
      <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">{post.summary}</p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {post.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export const BlogSection = () => {
  const [search, setSearch] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog', search],
    queryFn: () => getBlogPosts(search ? { search } : {}),
    placeholderData: (prev) => prev,
  });

  return (
    <section id="blog" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">Writing</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
            <ScrollReveal type="words">Latest Articles</ScrollReveal>
          </h2>
        </div>
        <div className="relative w-full md:max-w-xs">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-dark-border rounded-full pl-10 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-panel rounded-3xl h-64 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 font-mono text-gray-500 text-sm">No articles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => <BlogCard key={post.id} post={post} index={idx} />)}
        </div>
      )}
    </section>
  );
};

// Blog Detail standalone view
export const BlogDetailView = () => {
  const { slug } = window.__blog_slug || {};
  // Will be handled by Router params in the page component
  return null;
};

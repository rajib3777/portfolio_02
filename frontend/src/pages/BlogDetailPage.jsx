import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogDetail } from '../services/portfolioService';
import { MainLayout } from '../layouts/MainLayout';
import { FiArrowLeft, FiClock, FiUser } from 'react-icons/fi';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getBlogDetail(slug),
  });

  return (
    <MainLayout>
      <article className="max-w-3xl mx-auto py-12 px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white mb-8 transition-colors group" data-cursor="pointer">
          <FiArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {isLoading && <div className="space-y-4 animate-pulse"><div className="h-10 bg-white/5 rounded-xl w-3/4" /><div className="h-4 bg-white/5 rounded w-1/2" /><div className="h-64 bg-white/5 rounded-3xl mt-8" /></div>}
        {isError && <p className="text-red-400 font-mono text-sm">Failed to load article.</p>}
        {post && (
          <>
            <div className="mb-8">
              <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 border border-accent/25 px-3 py-1 rounded-full uppercase tracking-widest">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 text-xs font-mono text-gray-500">
                <span className="flex items-center gap-1"><FiUser size={12} /> {post.author}</span>
                <span className="flex items-center gap-1"><FiClock size={12} /> {post.read_time}</span>
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</span>
              </div>
            </div>

            {post.image && (
              <div className="rounded-3xl overflow-hidden border border-dark-border mb-10 aspect-video">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="glass-panel p-8 rounded-3xl border border-dark-border">
              <div
                className="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
            )}
          </>
        )}
      </article>
    </MainLayout>
  );
};

export default BlogDetailPage;

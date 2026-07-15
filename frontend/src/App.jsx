import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

// Lazy-loaded pages for route-based code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));

// Global page loading skeleton
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Loading</span>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="*" element={
            <MainLayout>
              <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
                <h1 className="text-6xl font-extrabold text-white">404</h1>
                <p className="text-gray-400 font-mono text-sm">Page not found.</p>
                <a href="/" className="text-accent text-xs font-mono hover:underline" data-cursor="pointer">Return Home</a>
              </div>
            </MainLayout>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

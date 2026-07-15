import React from 'react';
import { ProjectDetailView } from '../features/projects/ProjectDetailView';
import { MainLayout } from '../layouts/MainLayout';

const ProjectDetailPage = () => {
  return (
    <MainLayout>
      <ProjectDetailView />
    </MainLayout>
  );
};

export default ProjectDetailPage;

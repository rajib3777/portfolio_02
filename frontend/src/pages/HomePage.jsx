import React from 'react';
import { HeroSection } from '../features/profile/HeroSection';
import { AboutSection } from '../features/profile/AboutSection';
import { SkillsSection } from '../features/skills/SkillsSection';
import { ExperienceSection } from '../features/experience/ExperienceSection';
import { ActivitiesSection } from '../features/activities/ActivitiesSection';
import { ProjectsGrid } from '../features/projects/ProjectsGrid';
import { BlogSection } from '../features/blog/BlogSection';
import { ContactSection } from '../features/contact/ContactSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ActivitiesSection />
      <ProjectsGrid />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default HomePage;

import apiClient from './apiClient';

export const getSkills = async () => {
  const response = await apiClient.get('skills/');
  return response.data;
};

export const getExperience = async () => {
  const response = await apiClient.get('experience/');
  return response.data;
};

export const getEducation = async () => {
  const response = await apiClient.get('education/');
  return response.data;
};

export const getActivities = async (params = {}) => {
  const response = await apiClient.get('activities/', { params });
  return response.data;
};

export const getCertifications = async () => {
  const response = await apiClient.get('certifications/');
  return response.data;
};

export const getAchievements = async () => {
  const response = await apiClient.get('achievements/');
  return response.data;
};

export const getTestimonials = async () => {
  const response = await apiClient.get('testimonials/');
  return response.data;
};

export const getBlogPosts = async (params = {}) => {
  const response = await apiClient.get('blog/', { params });
  return response.data;
};

export const getBlogDetail = async (slug) => {
  const response = await apiClient.get(`blog/${slug}/`);
  return response.data;
};

export const getGallery = async () => {
  const response = await apiClient.get('gallery/');
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await apiClient.post('messages/', messageData, { cache: false });
  return response.data;
};

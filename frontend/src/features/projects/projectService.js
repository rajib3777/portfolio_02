import apiClient from '../../services/apiClient';

export const getProjects = async (params = {}) => {
  const response = await apiClient.get('projects/', { params });
  return response.data;
};

export const getProjectDetail = async (slug) => {
  const response = await apiClient.get(`projects/${slug}/`);
  return response.data;
};

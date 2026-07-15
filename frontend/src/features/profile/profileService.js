import apiClient from '../../services/apiClient';

export const getSiteSettings = async () => {
  const response = await apiClient.get('settings/');
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get('profile/');
  return response.data;
};

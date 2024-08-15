import api from './axios';

const header = {
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
};

const handleGetMethod = async (url, params) => {
  const response = await api.get(url, params);
  return response?.data;
};

const handlePostMethod = async (url, data) => {
  const response = await api.post(url, data, header);
  return response?.data;
};

const handlePatchMethod = async (url, data) => {
  const response = await api.patch(url, data, header);

  return response?.data;
};

const handleDeleteMethod = async (url, data) => {
  const response = await api.delete(url, data, header);

  return response?.data;
};

export {
  handleGetMethod,
  handlePostMethod,
  handlePatchMethod,
  handleDeleteMethod,
};

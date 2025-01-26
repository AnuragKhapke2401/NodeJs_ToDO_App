import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getMessages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMessage = async (content) => {
  const response = await axios.post(API_URL, { content });
  return response.data;
};

export const updateMessage = async (id, content) => {
  await axios.put(`${API_URL}/${id}`, { content });
};

export const deleteMessage = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

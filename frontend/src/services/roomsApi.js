import api from './api';

export const fetchUserRooms = async (userId) => {
  const response = await api.get(`/rooms/${userId}`);
  return response.data.rooms;
};

export const createRoom = async (userId, name) => {
  const response = await api.post('/rooms', { userId, name });
  return response.data;
};

export const joinRoom = async (userId, roomId) => {
  const response = await api.post('/rooms/join', { userId, roomId });
  return response.data;
};

export const deleteRoom = async (roomId, userId) => {
  const response = await api.delete(`/rooms/${roomId}?userId=${userId}`);
  return response.data;
};

export const fetchMyRequests = async () => {
  return [];
};
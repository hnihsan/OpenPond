import axios from 'axios';

export const login = (payload: any) => {
  return axios.post('/api/login', payload).then((res) => res.data);
};

export const logout = () => axios.post('/api/logout').then((res) => res.data);

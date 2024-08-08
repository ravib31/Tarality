import axios from 'axios';

const API_URL = 'https://stgapi-bnpl.tarality.io/api/v2';

const api = axios.create({
  baseURL: API_URL,
});

export const checkEmailExist = (email) => api.post('/user/chackEmailExist', { email });
export const register = (data) => api.post('/user/register', data);
export const verifyOtp = (data) => api.post('/user/verifyOtp', data);
export const resendOtp = (data) => api.post('/user/resendOtp', data);
export const login = (data) => api.post('/user/loginOtp', data);
export const verifyLoginOtp = (data) => api.post('/user/verifyLoginOtp', data);
export const forgotPassword = (data) => api.post('/user/forgotPassword', data);
export const resetPassword = (data) => api.post('/user/resetPassword', data);
export const updateProfile = (data) => api.put('/user/updateProfile', data);

export default api;

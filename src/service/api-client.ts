import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true
});

export { axiosInstance as apiClient };

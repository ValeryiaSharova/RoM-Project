import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.jsonbin.io/v3',
});

export default axiosInstance;

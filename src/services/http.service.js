/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { toast } from 'react-toastify';

const http = axios.create({
  baseURL: 'https://roulette-of-marks-48f51-default-rtdb.europe-west1.firebasedatabase.app/',
});

http.interceptors.request.use(
  function (config) {
    const containSlash = /\$/gi.test(config.url);
    config.url = `${containSlash ? config.url.slice(0, -1) : config.url}.json`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id ? Object.keys(data).map(key => ({ ...data[key] })) : data;
}

http.interceptors.response.use(
  res => {
    res.data = { content: transformData(res.data) };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      toast.error('Something was wrong, Try it later');
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;

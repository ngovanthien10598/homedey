import axios from 'axios';
import apiPrefix from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/news-category`;

export function getAllNewsCategoriesAPI() {
  return axios.get(`${endpointPrefix}/`);
}
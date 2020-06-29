import axios from 'axios';
import apiPrefix from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/project-category`;

export function getAllProjectCategoriesAPI() {
  return axios.get(`${endpointPrefix}/`);
}
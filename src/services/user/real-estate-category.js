import axios from 'axios';
import apiPrefix from '../apiPrefix';

export function getAllRealEstateCategoriesAPI() {
  return axios.get(`${apiPrefix}/user/real-estate-category/`);
}
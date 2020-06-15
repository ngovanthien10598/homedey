import axios from 'axios';
import apiPrefix from '../apiPrefix';

export function getAllRealEstateCategories() {
  return axios.get(`${apiPrefix}/user/real-estate-category/`);
}
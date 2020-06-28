import axios from 'axios';
import apiPrefix from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/news`;

export function getAllNewsAPI() {
  return axios.get(`${endpointPrefix}/`);
}

export function getNewsDetailsAPI(slug) {
  return axios.get(`${endpointPrefix}/${slug}/`);
}

export function getNewsByCategoryAPI(categorySlug) {
  return axios.get(`${endpointPrefix}/?news_category__slug=${categorySlug}`);
}
import axios from 'axios';
import apiPrefix from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/project`;

export function getAllProjectsAPI() {
  return axios.get(`${endpointPrefix}/`);
}

export function getProjectsByCategoryAPI(category_slug) {
  return axios.get(`${endpointPrefix}/?project_category__slug=${category_slug}`);
}

export function getProjectDetailsAPI(slug) {
  return axios.get(`${endpointPrefix}/${slug}/`);
}

export function getProjectsByDistrictAPI(district_id) {
  return axios.get(`${endpointPrefix}/name-list/?district_id=${district_id}`);
}
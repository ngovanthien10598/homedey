import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/admin/project-category`;

export function createProjectCategoryAPI(token, body) {
  return axios.post(`${endpointPrefix}/`, body, withAuthorization(token));
}

export function updateProjectCategoryAPI(token, category_id, body) {
  return axios.put(`${endpointPrefix}/${category_id}/`, body, withAuthorization(token));
}

export function deleteProjectCategoryAPI(token, category_id) {
  return axios.delete(`${endpointPrefix}/${category_id}/`, withAuthorization(token));
}
import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/admin/news-category`;

export function createNewsCategoryAPI(token, body) {
  return axios.post(`${endpointPrefix}/`, body, withAuthorization(token));
}

export function updateNewsCategoryAPI(token, category_id, body) {
  return axios.put(`${endpointPrefix}/${category_id}/`, body, withAuthorization(token));
}

export function deleteNewsCategoryAPI(token, category_id) {
  return axios.delete(`${endpointPrefix}/${category_id}/`, withAuthorization(token));
}
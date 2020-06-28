import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/admin/news`;

export function createNewsAPI(token, body) {
  return axios.post(`${endpointPrefix}/`, body, withAuthorization(token));
}

export function updateNewsAPI(token, news_id, body) {
  return axios.put(`${endpointPrefix}/${news_id}/`, body, withAuthorization(token));
}

export function deleteNewsAPI(token, news_id) {
  return axios.delete(`${endpointPrefix}/${news_id}/`, withAuthorization(token));
}

export function uploadNewsImage(token, images) {
  const formData = new FormData();
  images.forEach(image => {
    formData.append("images[]", image);
  });

  return axios.post(`${endpointPrefix}/upload-image/`, formData, withAuthorization(token));
}
import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/profile`;

export function getProfileAPI(token) {
  return axios.get(`${endpointPrefix}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function updateProfileAPI(token, body) {
  return axios.put(`${endpointPrefix}/`, body, withAuthorization(token));
}

export function updateAvatarAPI(token, image) {
  const formData = new FormData();
  formData.append('image', image);
  return axios.patch(`${endpointPrefix}/avatar/`, formData, withAuthorization(token));
}
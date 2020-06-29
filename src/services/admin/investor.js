import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/admin/project-investor`;

export function createInvestorAPI(token, body) {
  return axios.post(`${endpointPrefix}/`, body, withAuthorization(token));
}

export function updateInvestorAPI(token, investor_id, body) {
  return axios.put(`${endpointPrefix}/${investor_id}/`, body, withAuthorization(token));
}

export function deleteInvestorAPI(token, investor_id) {
  return axios.delete(`${endpointPrefix}/${investor_id}/`, withAuthorization(token));
}

export function updateInvestorAvatarAPI(token, investor_id, image) {
  const formData = new FormData();
  formData.append('image', image);
  return axios.patch(`${endpointPrefix}/${investor_id}/avatar/`, formData, withAuthorization(token));
}
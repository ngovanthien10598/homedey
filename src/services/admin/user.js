import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/admin/manage-user`;

export function getAllUsersAPI(token, page = 1) {
  return axios.get(`${endpointPrefix}/?page=${page}`, withAuthorization(token));
}

export function blockUserAPI(token, user_id) {
  return axios.get(`${endpointPrefix}/${user_id}/block/`, withAuthorization(token));
}

export function unblockUserAPI(token, user_id) {
  return axios.get(`${endpointPrefix}/${user_id}/unblock/`, withAuthorization(token));
}
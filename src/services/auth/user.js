import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/auth`;

export function changePasswordAPI(token, body) {
  return axios.put(`${endpointPrefix}/change-password/`, body, withAuthorization(token));
}
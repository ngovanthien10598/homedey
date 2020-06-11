import axios from 'axios';
import apiPrefix from '../apiPrefix';

export function getProfileAPI(token) {
  return axios.get(`${apiPrefix}/user/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
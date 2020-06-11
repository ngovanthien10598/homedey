import axios from 'axios';
import apiPrefix from '../apiPrefix';

export function registerAPI(body) {
  return axios.post(`${apiPrefix}/auth/signup/`, body);
}
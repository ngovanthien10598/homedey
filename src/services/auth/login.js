import axios from 'axios';
import apiPrefix from '../apiPrefix';

export function loginAPI(body) {
  return axios.post(`${apiPrefix}/auth/login/`, body);
}
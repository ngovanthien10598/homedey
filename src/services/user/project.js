import axios from 'axios';
import apiPrefix from '../apiPrefix'

export function getAllProjects() {
  return axios.get(`${apiPrefix}/user/project/`);
}
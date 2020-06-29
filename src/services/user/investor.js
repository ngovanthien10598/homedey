import axios from 'axios';
import apiPrefix from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/project-investor`;

export function getAllInvestorsAPI() {
  return axios.get(`${endpointPrefix}/`);
}
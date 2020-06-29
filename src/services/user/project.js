import axios from 'axios';
import apiPrefix from '../apiPrefix'

export function getAllProjectsAPI() {
  return axios.get(`${apiPrefix}/user/project/`);
}

export function getProjectsByDistrictAPI(district_id) {
  return axios.get(`${apiPrefix}/user/project/`, {
    params: {
      district_id: district_id
    }
  })
}
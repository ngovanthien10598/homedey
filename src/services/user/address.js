import axios from 'axios';
import apiPrefix from '../apiPrefix';

const addressAPI = apiPrefix + '/user/address';

export function getAllCitiesAPI() {
  return axios.get(`${addressAPI}/city/?ordering=name`);
}

export function getAllDistrictsAPI() {
  return axios.get(`${addressAPI}/district/`);
}

export function getAllWardsAPI() {
  return axios.get(`${addressAPI}/ward/`);
}

export function getDistrictsByCityAPI(city_id) {
  return axios.get(`${addressAPI}/district/`, {
    params: {
      city_id: city_id
    }
  })
}

export function getWardsByDistrictAPI(district_id) {
  return axios.get(`${addressAPI}/ward/`, {
    params: {
      district_id: district_id
    }
  })
}

export function getStreetsByDistrictAPI(district_id) {
  return axios.get(`${addressAPI}/street/`, {
    params: {
      district_id: district_id
    }
  })
}
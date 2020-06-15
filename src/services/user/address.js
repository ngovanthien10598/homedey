import axios from 'axios';
import apiPrefix from '../apiPrefix';

const addressAPI = apiPrefix + '/user/address';

export function getAllCities() {
  return axios.get(`${addressAPI}/city/?ordering=name`);
}

export function getAllDistricts() {
  return axios.get(`${addressAPI}/district/`);
}

export function getAllWards() {
  return axios.get(`${addressAPI}/ward/`);
}

export function getDistrictsByCity(city_id) {
  return axios.get(`${addressAPI}/district/`, {
    params: {
      city_id: city_id
    }
  })
}

export function getWardsByDistrict(district_id) {
  return axios.get(`${addressAPI}/ward/`, {
    params: {
      district_id: district_id
    }
  })
}

export function getStreetsByDistrict(district_id) {
  return axios.get(`${addressAPI}/street/`, {
    params: {
      district_id: district_id
    }
  })
}
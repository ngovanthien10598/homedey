import axios from 'axios';
import apiPrefix from '../apiPrefix';

export function getAllRealEstate() {
  return axios.get(`${apiPrefix}/user/real-estate/`);
}

export function createRealEstate(token, body) {
  return axios.post(`${apiPrefix}/user/real-estate/listings/`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function uploadImages(images) {
  return axios.post(`${apiPrefix}/user/real-estate/upload-image/`, {
    "images[]": images
  })
}
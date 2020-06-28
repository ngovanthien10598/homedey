import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/real-estate`;

export function getAllRealEstateAPI() {
  return axios.get(`${endpointPrefix}/`);
}

export function createRealEstate(token, body) {
  return axios.post(`${endpointPrefix}/listings/`, body, withAuthorization(token))
}

export function getRealEstateDetailsAPI(slug) {
  return axios.get(`${endpointPrefix}/${slug}/`);
}

export function uploadImages(images) {
  const formData = new FormData();
  images.forEach(image => {
    formData.append('images[]', image);
  })
  
  return axios.post(`${endpointPrefix}/upload-image/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
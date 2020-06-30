import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/real-estate/listings`;

export function getUserRealEstateAPI(token) {
  return axios.get(`${endpointPrefix}/`, withAuthorization(token));
}

export function getUserRealEstateDetailsAPI(token, realEstateId) {
  return axios.get(`${endpointPrefix}/${realEstateId}/`, withAuthorization(token));
}

export function getWaitingRealEstateAPI(token) {
  return axios.get(`${endpointPrefix}/waiting/`, withAuthorization(token));
}

export function getRejectedRealEstateAPI(token) {
  return axios.get(`${endpointPrefix}/reject/`, withAuthorization(token));
}

export function updateRealEstateAPI(token, real_estate_id, body) {
  return axios.put(`${endpointPrefix}/${real_estate_id}/`, body, withAuthorization(token));
}

export function deleteRealEstateAPI(token, realEstateId) {
  return axios.delete(`${endpointPrefix}/${realEstateId}/`, withAuthorization(token));
}


export function uploadRealEstateImagesAPI(token, images) {
  const formData = new FormData();
  images.forEach(image => {
    formData.append('images[]', image);
  })
  
  return axios.post(`${endpointPrefix}/upload-image/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  })
}
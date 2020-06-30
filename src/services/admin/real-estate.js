import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/admin/real-estate`;

export function getPendingRealEstateAPI(token) {
  return axios.get(`${endpointPrefix}/`, withAuthorization(token));
}

export function getRealEstateDetailsAPI(token, realEstateId) {
  return axios.get(`${endpointPrefix}/${realEstateId}/`, withAuthorization(token));
}

export function approveRealEstateAPI(token, realEstateId) {
  const body = {
    is_active: "True"
  }
  return axios.get(`${endpointPrefix}/${realEstateId}/accepted/`, body, withAuthorization(token));
}

export function rejectRealEstateAPI(token, realEstateId) {
  return axios.get(`${endpointPrefix}/${realEstateId}/rejected/`, withAuthorization(token));
}
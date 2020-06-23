import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const listingPrefix = `${apiPrefix}/user/real-estate/listings`;

export function getUserRealEstateAPI(token) {
  return axios.get(`${listingPrefix}/`, withAuthorization(token));
}

export function getUserRealEstateDetailsAPI(token, realEstateId) {
  return axios.get(`${listingPrefix}/${realEstateId}/`, withAuthorization(token));
}

export function getWaitingRealEstateAPI(token) {
  return axios.get(`${listingPrefix}/waiting/`, withAuthorization(token));
}

export function getRejectedRealEstateAPI(token) {
  return axios.get(`${listingPrefix}/reject/`, withAuthorization(token));
}

export function deleteRealEstateAPI(token, realEstateId) {
  return axios.delete(`${listingPrefix}/${realEstateId}/`, withAuthorization(token));
}
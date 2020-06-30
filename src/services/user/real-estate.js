import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/user/real-estate`;

export function getAllRealEstateAPI() {
  return axios.get(`${endpointPrefix}/`);
}

export function getRealEstateForSaleAPI(query) {
  return axios.get(`${endpointPrefix}/for-sale/${query ? `?${query}` : ''}`);
}

export function getRealEstateForRentAPI(query) {
  return axios.get(`${endpointPrefix}/for-rent/${query ? `?${query}` : ''}`);
}

export function createRealEstateAPI(token, body) {
  return axios.post(`${endpointPrefix}/listings/`, body, withAuthorization(token))
}

export function getRealEstateDetailsAPI(slug) {
  return axios.get(`${endpointPrefix}/${slug}/`);
}

export function getFeaturedRealEstatesAPI(limit = 3) {
  return axios.get(`${endpointPrefix}/featured/?limit=${limit}`);
}
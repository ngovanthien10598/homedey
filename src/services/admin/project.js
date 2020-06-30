import axios from "axios";
import apiPrefix, { withAuthorization } from "../apiPrefix";
const endpointPrefix = `${apiPrefix}/admin/project`;

export function createProjectAPI(token, body) {
  return axios.post(`${endpointPrefix}/`, body, withAuthorization(token));
}

export function updateProjectAPI(token, project_id, body) {
  return axios.put(`${endpointPrefix}/${project_id}/`, body, withAuthorization(token));
}

export function deleteProjectAPI(token, project_id) {
  return axios.delete(`${endpointPrefix}/${project_id}/`, withAuthorization(token));
}

export function uploadProjectImagesAPI(token, images) {
  const formData = new FormData();
  images.forEach(image => {
    formData.append("images[]", image);
  });
  return axios.post(`${endpointPrefix}/upload-image/`, formData, withAuthorization(token));
}
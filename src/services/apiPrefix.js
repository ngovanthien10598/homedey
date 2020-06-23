const apiPrefix = "https://homedey.herokuapp.com/api";

export const withAuthorization = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export default apiPrefix;
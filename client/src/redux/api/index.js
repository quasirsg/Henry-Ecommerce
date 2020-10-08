import axios from 'axios';

const baseURL = 'http://localhost:3001';

export default (url, data, headers, method) => {
  return axios({
    method,
    url: baseURL + url,
    data,
    headers
  });
}

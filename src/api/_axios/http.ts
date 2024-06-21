import Axios from 'axios';
const http = Axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 30000,
  // TODO: [Axios config]
  // turn to `true` for forwarding cookies value to backend
  // only use if and only if CORS credentials are enabled at backend
  // withCredentials: true,
});
console.log('Axios instance was created');
export default http;

import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:53000`,
});

export default instance;

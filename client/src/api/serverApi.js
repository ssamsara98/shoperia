import axios from 'axios';

const serverApi = axios.create({
  baseURL: '/api/v1',
});

export default serverApi;

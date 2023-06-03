import axios from 'axios';

const rajaOngkirApi = axios.create({
  baseURL: 'https://api.rajaongkir.com/starter',
  headers: {
    key: process.env.RAJA_ONGKIR_API_KEY!,
  },
});

// module.exports = rajaOngkirApi;
export default rajaOngkirApi;

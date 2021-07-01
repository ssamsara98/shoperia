const { default: axios } = require('axios');
const express = require('express');

const rajaOngkirApi = require('../api/raja-ongkir-api');

const rajaOngkirRouter = express.Router();

rajaOngkirRouter.get('/province', async (req, res) => {
  try {
    const resp = await rajaOngkirApi.get('/province', { params: req.query });
    return res.json(resp.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      res.status(err.response.status);
      return res.json(err.response.data);
    }
    throw err;
  }
});

rajaOngkirRouter.get('/city', async (req, res) => {
  try {
    const resp = await rajaOngkirApi.get('/city', { params: req.query });
    return res.json(resp.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      res.status(err.response.status);
      return res.json(err.response.data);
    }
    throw err;
  }
});

rajaOngkirRouter.post('/cost', async (req, res) => {
  try {
    const resp = await rajaOngkirApi.post('/cost', req.body, { params: req.query });
    return res.json(resp.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      res.status(err.response.status);
      return res.json(err.response.data);
    }
    throw err;
  }
});

module.exports = rajaOngkirRouter;

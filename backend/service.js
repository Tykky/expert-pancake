const axios = require('axios')
const config = require('./config')

const getData = response => response.data

const getCategory = category => axios
  .get(`${config.reaktor_api_url}/${config.product_url}/${category}`)
  .then(getData)

const getAvailability = manufacturer => axios
  .get(`${config.reaktor_api_url}/${config.availability_url}/${manufacturer}`)
  .then(getData)

module.exports = { getCategory, getAvailability }


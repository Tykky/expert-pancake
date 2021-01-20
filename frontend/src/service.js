import axios from 'axios'
import config from './config'

const getData = response => response.data

const getCategory = category => axios
  .get(`${config.api_url}/products/${category}`)
  .then(getData)

const getAvailability = manufacturer => axios
  .get(`${config.api_url}/availability/${manufacturer}`)
  .then(getData)

export default { getCategory, getAvailability }
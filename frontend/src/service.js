import axios from 'axios'
import config from './config'

const getData = response => response.data

const getCategory = category => axios
  .get(`${config.api_url}/products/${category}`)
  .then(getData)
  .catch(error => {
    console.log(error)
  })

const getAvailability = manufacturer => axios
  .get(`${config.api_url}/availability/${manufacturer}`)
  .then(getData)
  .catch(error => {
    console.log(error)
  })

const service = { getCategory, getAvailability }

export default service
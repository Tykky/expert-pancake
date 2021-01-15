const axios = require('axios')
const config = require('./config')

const getData = response => response.data

const getCategory = category => axios
    .get(`${config.reaktor_api_url}/${config.version}/${config.product_url}/${category}`)
    .then(getData)
    .catch(error => {
        console.log(error)
})

const getAvailability = manufacturer => axios
    .get(`${config.reaktor_api_url}/${config.version}/${config.availability_url}/${manufacturer}`)
    .then(getData)
    .catch(error => {
        console.log(error)
})

module.exports = { getCategory, getAvailability }


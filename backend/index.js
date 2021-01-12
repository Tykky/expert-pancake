const express = require('express')
const cors = require('cors')
const config = require('./config')
const axios = require('axios')
const morgan = require('morgan')
const mcache = require('memory-cache')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())

const version = 'v2'
const product_url = `products`
const manufacturer_url = `availability`

const cache = duration => {
    return (request, response, next) => {
        let key = request.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            response.send(cachedBody)
            return
        } else {
            response.sendResponse = response.send
            response.send = (body) => {
                mcache.put(key, body, duration * 1000)
                response.sendResponse(body)
            }
            next()
        }
    }
}


app.get(`/api/${product_url}/:category`, cache(300), (request, response) => {
    axios
        .get(`${config.reaktor_api_url}/${version}/${product_url}/${request.params.category}`)
        .then(res => response.json(res.data))
})

app.get(`/api/${manufacturer_url}/:manufacturer`, (request, response) => {
    axios
        .get(`${config.reaktor_api_url}/${version}/${manufacturer_url}/${request.manufacturer}`)
        .then(res => response.json(res.data))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
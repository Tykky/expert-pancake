const express = require('express')
const config = require('./config')
const morgan = require('morgan')
const mcache = require('memory-cache')
const service = require('./service')
const parseXmlString = require('xml2js').parseString
const path = require('path')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const cache = duration => {
  return (request, response, next) => {
    let key = request.originalUrl || request.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      response.setHeader('Content-type', 'application/json')
      response.send(cachedBody)
      return
    } else {
      response.tmp = response.send
      response.send = (body) => {
        mcache.put(key, body, duration * 1000)
        response.tmp(body)
      }
      next()
    }
  }
}

const parseAvailabilityString = xml => {
  let instockvalue
  parseXmlString(xml, (error, result) => {
    instockvalue = result.AVAILABILITY.INSTOCKVALUE[0]
  })
  return instockvalue
}

app.get(`/api/${config.product_url}/:category`, cache(config.cache_duration_seconds), (request, response) => {
  service.getCategory(request.params.category).then(data => {
    response.json(data)
  }).catch(() => response.status(500).end())
})

app.get(`/api/${config.availability_url}/:manufacturer`, cache(config.cache_duration_seconds), (request, response) => {
  const fetch = () => {
    service.getAvailability(request.params.manufacturer).then(data => {
      let availability = {}
      if(data.response !== '[]') {
        data.response.forEach(product => {
          availability[product.id.toLowerCase()] = parseAvailabilityString(product.DATAPAYLOAD)
        })
        response.json(availability)
      } else {
        console.log(`Invalid response from ${config.availability_url}/${request.params.manufacturer}`)
        fetch()
      }
    }).catch(() => response.status(500).end())
  }
  fetch()
})

app.get('*', (request, response) => response.sendFile(path.resolve('build', 'index.html')))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`The app is served at http://localhost:${PORT}`)
})
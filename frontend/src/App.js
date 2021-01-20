import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import service from './service'
import config from './config'
import ProductTable from './components/ProductTable'
import Notification from './components/ErrorNotification'
import { Button } from '@material-ui/core'
import errorMessages from './errorMessages'



const App = () => {

  const [ products, setProducts ] = useState([])
  const [ availability, setAvailability ] = useState({})
  const [ notification, setNotification ] = useState({ title: '', body: '', open: false })

  const availRef = useRef(availability)

  const errorCodes = {
    500: errorMessages.internalError,
    503: errorMessages.timeoutError,
    404: errorMessages.notFoundError
  }

  const errorHandler = error => (
    setNotification(errorCodes[error.response.status])
  )

  const updateAvailability = (data, manufacturer) => {
    const copy = JSON.parse(JSON.stringify(availRef.current))
    copy[manufacturer] = data
    availRef.current = copy
    setAvailability(copy)
  }

  const fetchAvailability = products => {
    products.forEach(product => {
      if (!availRef.current[product.manufacturer]) {
        updateAvailability({}, product.manufacturer)
        service.getAvailability(product.manufacturer).then(data => {
          updateAvailability(data, product.manufacturer)
        }).catch(errorHandler)
      }
    })
  }

  const updateProducts = (data, index) => {
    setProducts(products => {
      const copy = [...products]
      copy[index] = data
      return copy
    })
  }

  useEffect(() => {
    config.categories.forEach(category => {
      service.getCategory(category.name).then(data => {
        if (data) {
          fetchAvailability(data)
          updateProducts(data, category.id)
        }
      }).catch(errorHandler)
    })
  },[])

  return (
    <div>
      <Notification notification={notification} setNotification={setNotification} />
      <div style={{ width: 1000, margin: 'auto' }}>
        <Router>
          <div>
            {config.categories.map(category => (
              <Button
                key={category.name}
                component={Link}
                to={`/${category.name}`}
                color='primary'
              >
                {category.name}
              </Button>
            ))}
          </div>
          <Switch>
            {config.categories.map(category => (
              <Route key={category.id.toString()} path={`/${category.name}`}>
                <ProductTable products={products[category.id]} availability={availability} />
              </Route>
            ))}
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App

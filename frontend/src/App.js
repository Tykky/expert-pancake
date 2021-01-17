import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import service from './service'
import config from './config'
import ProductTable from './components/ProductTable'

const App = () => {

  const [ products, setProducts ] = useState([])
  const [ availability, setAvailability ] = useState({})

  const availRef = useRef(availability)

  const updateAvailability = (data, manufacturer) => {
    const copy = JSON.parse(JSON.stringify(availRef.current))
    copy[manufacturer] = data
    availRef.current = copy
    setAvailability(copy)
  }

  const parseAvailability = products => {
    products.forEach(product => {
      if (!availRef.current[product.manufacturer]) {
        updateAvailability({}, product.manufacturer)
        service.getAvailability(product.manufacturer).then(data => {
          updateAvailability(data, product.manufacturer)
        })
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
          parseAvailability(data)
          updateProducts(data, category.id)
        }
      })
    })
  },[])

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Router>
        <div>
          {config.categories.map(category => (
            <Link key={category.id} style={padding} to={`/${category.name}`}>{category.name}</Link>
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
  )
}

export default App

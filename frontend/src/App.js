import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import service from './service'
import config from './config'
import ProductTable from './components'

const App = () => {

  const [ products, setProducts ] = useState([])

  useEffect(() => {
    config.categories.map(category => {
      service.getCategory(category.name).then(data => {
        const copy = [...products]
        copy[category.id] = data
        setProducts(copy)
      })
    })
  },[])

  return (
    <div>
      <Router>
        <Switch>
          {config.categories.map(category => (
            <Route path={`/${category.name}`}>
              <ProductTable products={products[category.id]} />
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

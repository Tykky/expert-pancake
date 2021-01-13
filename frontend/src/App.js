import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import service from './service'
import config from './config'
import ProductTable from './components'

const App = () => {

  const [ products, setProducts ] = useState([])

  useEffect(() => {
    config.categories.forEach(category => {
      service.getCategory(category.name).then(data => {
        setProducts(products => {
          const copy = [...products]
          copy[category.id] = data
          return copy
        })
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

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import config from './config'

const ProductTable = (props) => {

  const [ productDisplay, setProductDisplay ] = useState(props.products.splice(0,config.infinite_scroll_default))

  return (
    <InfiniteScroll
      dataLength={props.products.length}
      next={() => setProductDisplay(ProductDisplay => (
        props.products.splice(0, ProductDisplay.length + config.infinite_scroll_increment)
      ))}
      hasMore={props.products.length > setProductDisplay.length}
    >
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Colors</th>
            <th>Price</th>
            <th>Manufacturer</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {productDisplay ? productDisplay.map(product => (
            <tr key={ product.id }>
              <td>{ product.name }</td>
              <td>{ product.color.join(', ') }</td>
              <td>{ product.price }</td>
              <td>{ product.manufacturer }</td>
              <td>
                {
                  props.availability[product.manufacturer][product.id.toUpperCase()] ?
                    props.availability[product.manufacturer][product.id.toUpperCase()] :
                    'fetching ...'
                }
              </td>
            </tr>
          )) : <tr></tr>}
        </tbody>
      </table>
    </InfiniteScroll>
  )
}

ProductTable.propTypes = {
  products: PropTypes.array,
  availability: PropTypes.object
}

export default ProductTable
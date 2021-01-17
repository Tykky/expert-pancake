import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import config from '../config'

const ProductTable = (props) => {

  const [ productDisplay, setProductDisplay ] = useState()

  const instockValue = {
    INSTOCK: 'in stock',
    OUTOFSTOCK: 'out of stock',
    LESSTHAN10: 'less than 10'
  }

  useEffect(() => {
    if (props.products) {
      setProductDisplay(
        props.products.length > config.infinite_scroll_default ?
          props.products.slice(1, config.infinite_scroll_default) :
          [...props.products]
      )
    }
  },[props.products])

  return (
    productDisplay ?
      <InfiniteScroll
        dataLength={productDisplay.length}
        next={() => setProductDisplay(ProductDisplay => (
          props.products.slice(1, ProductDisplay.length + config.infinite_scroll_increment)
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
            {productDisplay.map(product => (
              <tr key={ product.id }>
                <td>{ product.name }</td>
                <td>{ product.color.join(', ') }</td>
                <td>{ product.price }</td>
                <td>{ product.manufacturer }</td>
                <td>
                  {
                    props.availability[product.manufacturer][product.id] ?
                      instockValue[props.availability[product.manufacturer][product.id]] :
                      'fetching ...'
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
      : <p>Loading...</p>
  )
}

ProductTable.propTypes = {
  products: PropTypes.array,
  availability: PropTypes.object
}

export default ProductTable
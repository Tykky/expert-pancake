import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import config from '../config'
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@material-ui/core'

const ProductTable = (props) => {

  const [ productDisplay, setProductDisplay ] = useState()

  useEffect(() => {
    if (props.products) {
      setProductDisplay(
        props.products.length > config.infinite_scroll_default ?
          props.products.slice(1, config.infinite_scroll_default) :
          [...props.products]
      )
    }
  },[props.products])

  const instockValue = {
    INSTOCK: <b style={{ color: 'green' }}>in stock</b>,
    OUTOFSTOCK: <b style={{ color: 'red' }}>out of stock</b>,
    LESSTHAN10: <b style={{ color: 'orange' }}>less than 10</b>
  }

  return (
    productDisplay ?
      <InfiniteScroll
        dataLength={productDisplay.length}
        next={() => setProductDisplay(ProductDisplay => (
          props.products.slice(1, ProductDisplay.length + config.infinite_scroll_increment)
        ))}
        hasMore={props.products.length > setProductDisplay.length}
      >
        <TableContainer component={Paper} variant='outlined'>
          <Table size="small" stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Colors</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productDisplay.map(product => (
                <TableRow key={ product.id }>
                  <TableCell>{ product.name }</TableCell>
                  <TableCell>{ product.color.join(', ') }</TableCell>
                  <TableCell>{ product.price }</TableCell>
                  <TableCell>{ product.manufacturer }</TableCell>
                  <TableCell>
                    {
                      props.availability[product.manufacturer][product.id] ?
                        instockValue[props.availability[product.manufacturer][product.id]] :
                        'fetching ...'
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
      : <p>Loading...</p>
  )
}

ProductTable.propTypes = {
  products: PropTypes.array,
  availability: PropTypes.object
}

export default ProductTable
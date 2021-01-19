import React from 'react'
import PropTypes from 'prop-types'
//import config from '../config'
import { Table, /*TableHead, TableBody, TableRow,*/ TableCell } from '@material-ui/core'
import { WindowScroller, Table as VirtualTable, Column, AutoSizer } from 'react-virtualized'
import 'react-virtualized/styles.css'

const ProductTable = (props) => {

  const instockValue = {
    INSTOCK: <b style={{ color: 'green' }}>in stock</b>,
    OUTOFSTOCK: <b style={{ color: 'red' }}>out of stock</b>,
    LESSTHAN10: <b style={{ color: 'orange' }}>less than 10</b>
  }

  const cellRenderer = ({ cellData }) => (
    <TableCell
      component='div'
      variant='body'
    >
      {cellData}
    </TableCell>
  )

  const headerRenderer = (label) => (
    <TableCell
      component='div'
      variant='head'
    >
      {label.toUpperCase()}
    </TableCell>
  )

  const columns = [
    {
      width: 220,
      label: 'Id',
      'dataKey': 'id',
      cell: cellRenderer,
      head: () => headerRenderer('Id')
    },
    {
      width: 250,
      label: 'Name',
      dataKey: 'name',
      cell: cellRenderer,
      head: () => headerRenderer('Name')
    },
    {
      width: 100,
      label: 'Colors',
      dataKey: 'color',
      cell: ({ cellData }) => cellData.join(', '),
      head: () => headerRenderer('Colors')
    },
    {
      width: 100,
      label: 'Price',
      dataKey: 'price',
      cell: cellRenderer,
      head: () => headerRenderer('Price')
    },
    {
      width: 150,
      label: 'Manufacturer',
      dataKey: 'manufacturer',
      cell: cellRenderer,
      head: () => headerRenderer('Manufacturer')
    },
    {
      width: 100,
      label: 'Availability',
      dataKey: 'manufacturer',
      cell: ({ cellData, rowIndex }) => {
        const product = props.products[rowIndex]
        let avail
        if (props.availability[cellData]) {
          avail = props.availability[cellData][product.id]
        }
        return avail ? instockValue[avail] : 'fetching...'
      },
      head: () => headerRenderer('Availability')
    }
  ]

  return (
    props.products ?
      <Table size='small'>
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer>
              {({ width }) => (
                <VirtualTable
                  autoHeight
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={props.products.length}
                  rowHeight={20}
                  headerHeight={20}
                  scrollTop={scrollTop}
                  width={width}
                  rowGetter={({ index }) => props.products[index]}
                >
                  {columns.map(col => (
                    <Column
                      key={col.dataKey}
                      label={col.label}
                      dataKey={col.dataKey}
                      headerRenderer={col.head}
                      cellRenderer={col.cell}
                      width={col.width}
                    />
                  ))}
                </VirtualTable>
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </Table>
      : <p>loading...</p>
  )
}

ProductTable.propTypes = {
  products: PropTypes.array,
  availability: PropTypes.object
}

export default ProductTable
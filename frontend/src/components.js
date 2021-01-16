const ProductTable = (props) => (
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
        {props.products ? props.products.map(product => (
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
)

export default ProductTable
const ProductTable = (props) => (
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Colors</th>
            <th>Price</th>
            <th>Manufacturer</th>
        </tr> 
        </thead>
        <tbody>
        {props.products ? props.products.map(product => (
            <tr key={ product.id }>
                <td>{ product.name }</td>
                <td>{ product.color.join(', ') }</td>
                <td>{ product.price }</td>
                <td>{ product.manufacturer }</td>
            </tr>
        )) : <tr></tr>}
        </tbody>
    </table>
)

export default ProductTable
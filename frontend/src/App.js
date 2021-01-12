import { useEffect, useState } from 'react'
import './App.css';
import service from './service'

function App() {
  
  const [ gloves, setGloves ] = useState([])
  
  useEffect(() => {
    service.getCategory('gloves').then(data => {
      setGloves(data)
    })},[])

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Color</th>
          <th>Price</th>
        </tr>
        {gloves.map(gloves => (
          <tr>
            <td>{ gloves.name }</td>
            <td>{ gloves.color.join(', ') }</td>
            <td>{ gloves.price } $</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;

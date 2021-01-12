import { useEffect, useState } from 'react'
import './App.css';
import api from './api'

function App() {
  
  const [ gloves, setGloves ] = useState([])
  
  useEffect(() => {
    api.getCategory('gloves').then(data => {
      setGloves(data)
    })},[])

  return (
    <div>
      {gloves.map(glove => {
        return <p key={glove.id}>{ glove.name }</p>
      })}
    </div>
  );
}

export default App;

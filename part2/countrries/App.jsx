import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
 import Text from './components/Text' 

 const App = () => {
  const [value,setValue]=useState('')
  const [filteredCountries,setFilteredCountries]=useState([])
  const [message, setMessage] = useState('')

  useEffect(()=> {

    if(value){
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response)=>{
        const countriesData=response.data

        const filtCountries = countriesData.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase()));

        if (filtCountries.length >= 10) {
          setFilteredCountries([])
          setMessage('Too many matches, specify another filter');      
        } else {
          setFilteredCountries(filtCountries);
        }

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });   
    }else{
      setFilteredCountries([])
    }
    setMessage('')
  },[value]) 

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <div>Find countries: <input value={value} onChange={handleChange} /> </div>
       <Text text={message} /> 
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca2}>{country.name.common}</li>
        ))}
      </ul> 
    </div>
  )
}

export default App


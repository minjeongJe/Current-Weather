import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities}) => {
    console.log("cities",cities);
  return (
    <div>
       {cities.map((item)=>(
        <Button variant="info" className='weather-btn'>{item}</Button>
       ))}
    </div>
  )
}

export default WeatherButton

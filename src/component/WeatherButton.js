import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity,getCurrentLocation, selectedCity}) => {
    // console.log("cities",cities);

  return (
    <div>    
      {/* 현재 위치 버튼 */}
      <Button variant="info"
        className={`weather-button ${selectedCity === 'current' ? 'active' : ''}`}
        onClick={getCurrentLocation}
      >
        Current Location
      </Button>

      {/* 도시별 */}
      {cities.map((item)=>(
        <Button variant="info" className={`weather-btn ${selectedCity === item ? 'active' : ''}`} 
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
       ))}
    </div>
  );
};

export default WeatherButton
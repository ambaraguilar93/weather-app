import React from 'react'
import { Wind, Water } from 'react-bootstrap-icons';



export const WeatherDisplay = ({ weatherData, error }) => {

    //console.log({weatherData});

  if (error) {
    return <div className="not-found">
        <img src={"/images/404-notfound.png"}  />
        <p>City not found</p>
    </div>;
    
  }

  if (!weatherData) {
    return null;
  }

  const { main, weather, wind } = weatherData;
  const { temp, humidity } = main;
  const { description } = weather[0];

  let weatherImageSrc = '';
  switch (weather[0].main) {
    case 'Clear':
      weatherImageSrc = 'images/clear.png';
      break;
    case 'Rain':
      weatherImageSrc = 'images/rain.png';
      break;
    case 'Snow':
      weatherImageSrc = 'images/snow.png';
      break;
    case 'Clouds':
      weatherImageSrc = 'images/cloud.png';
       
      break;
    case 'Fog':
      weatherImageSrc = 'images/mist.png';
      break;
    default:
      weatherImageSrc = '';
  }

  return (
    <div className="weather-box">
      <img src={weatherImageSrc} alt="Weather" />
      <div className="temperature">{parseInt(temp)}<span>°C</span></div>
      <div className="description">{description}</div>
      <div className='details-content'>
        <div className="weather-details">
        <Water id='water-icon' />
        <div className="humidity">Humidity: <span>{humidity}%</span></div>
        <Wind id='wind-icon'/>
        <div className="wind"> Wind: <span>{parseInt(wind.speed)} Km/h</span></div>
        
        </div>
      </div>
    </div>

  );
};
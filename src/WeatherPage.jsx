import React, { useState, useEffect } from 'react';

const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search-box">
      <input type="text" placeholder="Ingrese una ciudad" value={city} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherDisplay = ({ weatherData, error }) => {

    console.log({weatherData});

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
    case 'Haze':
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
      <div className="weather-details">
        <div className="humidity">Humidity: <span>{humidity}%</span></div>
        <div className="wind">Wind: <span>{parseInt(wind.speed)} Km/h</span></div>
      </div>
    </div>
  );
};

export const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const APIKey = '7abd4d15956620992b29321544dfdea5';

  const fetchWeatherData = (city) => {
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(json => {
        setWeatherData(json);
        setError(null);
      })
      .catch(error => {
        setWeatherData(null);
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchWeatherData(''); // Initial default city (you can change this)
  }, [setWeatherData]);

  return (
    <div className="container">
      <SearchForm onSearch={fetchWeatherData} />
      <WeatherDisplay weatherData={weatherData} error={error} />
    </div>
  );
};



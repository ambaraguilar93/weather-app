import React, { useState, useEffect } from 'react';
import { SearchForm } from './SearchForm';
import { WeatherDisplay } from './WeatherDisplay';


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



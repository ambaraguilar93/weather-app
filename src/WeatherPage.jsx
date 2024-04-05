import React, { useEffect, useState } from 'react'

const container = document.getElementById("contenedor");
const search = document.querySelector("#button-search");
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const errorNotFound = document.querySelector('.not-found');

export const WeatherPage = () => {


search.addEventListener('click', () => {

    const APIKey = '7abd4d15956620992b29321544dfdea5';
    const city = document.querySelector('.search-box input').value;

    // const [apiUrl, setApiUrl] = useState(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);

    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [third])
   

    if( city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then( response => response.json() )
        .then( json => {

            if( json.cod === 404 ){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                errorNotFound.style.display = 'block';
                errorNotFound.classNameList.add('fadeIn');
                return;
            }

            errorNotFound.style.display = 'none';
            errorNotFound.classNameList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch ( json.weather[0].main ) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                    
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;     

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;  

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classNameList.add('fadeIn');
            weatherDetails.classNameList.add('fadeIn');
            container.style.height = '590px';

                
        });
        

});


  return (
    <>
        <div className="container" id="contenedor">
          <div className="search-box">
            <i className="fa-solid fa-location-dot"></i>
            <input type="text" placeholder="Enter your location"/>
            <button id="button-search" className="fa-solid fa-magnifying-glass"></button>
          </div>

        <div className="not-found">
          <img src="images/404-notfound.png"/>
          <p>Location not found :/</p>
        </div>

        <div className="weather-box">
          <img src=""/>
          <p className="temperature"></p>
          <p className="description"></p>
        </div>

        <div className="weather-details">
          <div className="humidity">
            <i className="fa-solid fa-water"></i>
            <div className="text">
              <span></span>
              <p>Humidity</p>
            </div>
          </div>
          <div className="wind">
            <i className="fa-solid fa-water"></i>
            <div className="text">
              <span></span>
              <p>Wind speed</p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

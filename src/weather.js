import React, { useState, useEffect } from "react";
import axios from "axios";
import App from "./App";
import "./styles.css"; 

const SearchWeather = () => {
  const defaultCity = "Gaborone"; 
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState(null);
  

  const apiKey = "9fb4b1ec478c718ebf8daf5d8d38e4b9";

  
  const fetchWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(
        apiUrl
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Err fetching weather:", error);
    }
  };

  
  useEffect(() => {
    fetchWeatherData(defaultCity);
   }, []); 
  

  
  let handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeatherData(city);
      setCity("");
    }
  };

  
  return (
    <div className="weather-card">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          id="cityInput"
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {city !== "" && (
          <i onClick={() => setCity("")} className="clear-icon">
            ✖️
          </i>
        )}
        <button id="searchButton" type="submit">
          Search
        </button>
      </form>

      {weatherData && (
        <div className="weather-info">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
            className="weather-icon"
          />
          <App />
          <h1 className="defaultCity">{weatherData.name}</h1>
          <h2 className="temp">{Math.round(weatherData.main.temp)}℃</h2>
          <h2 className="descr">{weatherData.weather[0].description}</h2>
          <div className="description">
            <div className="col">
              <p>🌡️ Humidity: {Math.round(weatherData.main.humidity)}%</p>
            </div>
            <div className="col">
              <p>🌫️ Windy: {Math.round(weatherData.wind.speed)} km/h</p>
            </div>
          </div>
        </div>
      )}
      
      <p className="link">
        This project was coded by Gabo John
        {" "}
        <a href="https://github.com/GaboJohnK/react-weather-app" target="_blank" rel="noopener noreferrer">
          open-sourced on GitHub 
        </a>{" "}
      </p>
    </div>
  );
};

export default SearchWeather;
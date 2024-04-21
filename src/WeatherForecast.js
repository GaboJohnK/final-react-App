import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
                const apiKey = '9fb4b1ec478c718ebf8daf5d8d38e4b9';
                const city = 'Gaborone'; // Replace with desired city name
                const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

                const response = await axios.get(apiUrl);
                const nextFiveDaysData = parseForecastData(response.data.list);
                setForecastData(nextFiveDaysData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    const parseForecastData = (data) => {
        // Extract and parse necessary data for the next 5 days
        const parsedData = [];
        const uniqueDates = {};

        data.forEach((item) => {
            const date = item.dt_txt.split(' ')[0]; // Extract date (YYYY-MM-DD)

            if (!uniqueDates[date]) {
                uniqueDates[date] = true;
                parsedData.push({
                    date,
                    maxTemp: item.main.temp_min,
                    minTemp: item.main.temp_max,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                });
            }
        });

        return parsedData.slice(0, 5); // Return data for the next 5 days
    };

    return (
        <div className="weather-forecast">
            <h2>5-Day Weather Forecast</h2>
            <div className="forecast-days">
                {forecastData.map((dayData, index) => (
                    <div className="forecast-day" key={index}>
                        <div className="day-name">{new Date(dayData.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <img
                            className="weather-icon"
                            src={`https://openweathermap.org/img/wn/${dayData.icon}.png`}
                            alt="Weather Icon"
                        />
                        <div className="temperature">
                            <span className="max-temp">{Math.round(dayData.maxTemp)}°</span>  <span className="min-temp">{Math.round(dayData.minTemp)}°</span>
                        </div>
                        <div className="weather-description">{dayData.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;

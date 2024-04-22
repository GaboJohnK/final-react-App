import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import "./forecast.css";

const WeatherForecast = () => {
    const [forecastData, setForecastData] = useState([]);

    const parseForecastData = (data) => {
        const parsedData = [];
        const uniqueDates = {};

        data.forEach((item) => {
            const toDay = item.dt_txt.split(' ');
            const date = new Date(toDay[0]);

            const dayOfWeek = getDayOfWeek(date);

            if (!uniqueDates[dayOfWeek]) {
                uniqueDates[dayOfWeek] = true;
                parsedData.push({
                    date: dayOfWeek,
                    minTemp: item.main.temp_min,
                    maxTemp: item.main.temp_max,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                });
            }
        });

        return parsedData.slice(0, 5);
    };

     useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = '9fb4b1ec478c718ebf8daf5d8d38e4b9';
                const city = 'Gaborone';
                const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

                const response = await axios.get(apiUrl);
                const nextFiveDaysData = parseForecastData(response.data.list);
                setForecastData(nextFiveDaysData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, 
);

    const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
};

    return (
        <div className="weather-forecast">
            
            <Row>
                {forecastData.map((dayData, index) => (
                     <Col key={index} sm={2} className="text-center"> 
                        <div className="forecast-day">
                            <div className="day-name">{dayData.date}</div>
                            
                            <div className="temperature">
                                <span className="max-temp">{Math.round(dayData.maxTemp)}°</span>{' '} 
                                <span className="min-temp">{Math.round(dayData.minTemp)}°</span>
                            </div>
                            <img
                                className="weather_icon"
                                src={`https://openweathermap.org/img/wn/${dayData.icon}.png`}
                                alt="Weather Icon"
                            />
                            <div className="weather-description">{dayData.description}</div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default WeatherForecast;
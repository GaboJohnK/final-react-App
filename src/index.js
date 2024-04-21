import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import SearchWeather from "./weather";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchWeather />
  </React.StrictMode>
);
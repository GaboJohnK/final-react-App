import React from "react";
import "./timeDate.css";



function App() {
    const date = new Date();

    const showTime = `${date.getHours()}:${
      date.getMinutes()}`; 

    const showDate = `${date.toLocaleString('default', 
     { weekday: 'long' })}, ${date.getDate()} 
     ${date.toLocaleString('default', { month: 'long' })}
     ${date.getFullYear()}`;   
 
    return (
        <div className="App">
  
            <h2 className="time"> {showTime}</h2>
            <h2 className="date"> {showDate}</h2>
        </div>
    );
}
 
export default App;
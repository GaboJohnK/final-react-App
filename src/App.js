import React from "react";

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
  
            <h2 align="center"> {showTime}</h2>
            <h2 align="center"> {showDate}</h2>
        </div>
    );
}
 
export default App;
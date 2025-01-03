// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const API_KEY="aee85b6d695d03beb0e8fe8f1a7219cc";
// const Weather=()=>{
    
//     const [value, setValue]=useState("")
//     useEffect(()=>{
//         axios({
//             url:"https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}",
//             method:"GET",
//         }).then(Response=>{
//             console.log(response)
//         })
//     },[])

//     return(
//         <div>
//             <input className="search" value={value} onChange={(e)=>setValue(e.target.value)}></input>
//             <div className="weather">

//             </div>
//         </div>
//     )
// }

// export default Weather;

import "regenerator-runtime/runtime.js";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API = "130573acc059bc64f8d3016e0b5f49fe";

const Weather = () => {
    const [value, setValue] = useState(""); // City name input
    const [weatherData, setWeatherData] = useState(null); // Weather data

    useEffect(() => {
        if (value.trim() !== "") {
            const fetchWeather = async () => {
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API}`
                    );
                    console.log(response)
                    setWeatherData(response.data);
                    setValue("")
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                    setWeatherData(null); // Clear weather data on error
                }
            };
            fetchWeather();
        }
    }, [value]); // Run effect when 'value' changes

    return (
        <div className="main">
            <input
                className="search"
                placeholder="Enter city name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className="weather">
                {weatherData ? (
                    <div >
                        <h2>Weather in {weatherData.name}</h2>
                        <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    </div>
                ) : (
                    value.trim() && <p>No weather data available. Please try again.</p>
                )}
            </div>
        </div>
    );
};

export default Weather;

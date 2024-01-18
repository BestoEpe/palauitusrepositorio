import axios from "axios"

const Weather = (city, weather, icon) => {

     if (weather.main === undefined) {
         console.log(weather)
        return <p></p>
    }
    

     if (weather.main !== undefined && city !== undefined) {
         console.log(weather)
     return (
         <div>
             <h2>
                 Weather in {city}
             </h2>
             <p>temperature  {weather.main.temp}</p>

             <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={icon} />
            <p>wind {weather.wind.speed} m/s</p>
         </div>
     )
     }



}


export default Weather
import { useEffect, useState } from 'react';
import './App.css';
import CurrentDayReport from './Components/currentDayReport';
import ForecastReport from './Components/forecastReports';
import SearchLocation from './Components/searchLocation';
import axios from 'axios';


function App() {
  const[locat,setLocat] = useState('');

  const searchForWeather=(location)=>{
    setLocat(location);
  }

  useEffect(()=>{

     function getLocation() {
      if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        alert("Geolocation is not supported by this browser.");
      }
    }
    getLocation();

    function showPosition(position) {
      var lat = position.coords.latitude
      var lon = position.coords.longitude
      
      axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.bf6cb578024313ec5fdbda72c9a26622&lat=${lat}&lon=${lon}&format=json`)
    .then(res=>{
      console.log(res.data.address?.city);
      setLocat(res.data.address?.city);
    }
    ).catch(err=>console.log(err));
    }
    
  },[])

  return (
    <div className="App">
     <SearchLocation 
     searchForWeather={searchForWeather}
     />
     { locat === ""?null :
      <CurrentDayReport 
     loc = {locat}
     />}
     { locat === ""?null :
      <ForecastReport 
     loc = {locat}
     />}
    </div>
  );
}

export default App;

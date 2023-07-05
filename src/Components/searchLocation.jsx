import { useState } from "react";
import styles from './searchLocation.module.css';

export default function SearchLocation({searchForWeather}){
    const[location,setLocation] = useState('');
    return(
        <div className={styles.SearchLocation_mainDiv}>
            <h2>WEATHER APP</h2>
            <input onChange={(e)=> setLocation(e.target.value)} type="text" placeholder="Search for your city" />
            <button onClick={()=>searchForWeather(location)}>Search</button>
        </div>
    )
}
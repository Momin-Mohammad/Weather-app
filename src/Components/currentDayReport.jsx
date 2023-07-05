import { useEffect, useState } from "react";
import styles from "./currentDayReport.module.css";
import axios from "axios";
import {AiFillHeart} from "react-icons/ai";

import  umbrella from "../images/umbrella.png";
import  droplet from "../images/droplet.png";
import windy from "../images/windy.png";
import HourlyForecast from "./hourlyForecast";
import ExtraInfo from "./extraInfo";
import baseUrl from "../utilities";
import OtherCity from "./otherCity";

export default function CurrentDayReport({loc}){
    const[currentDay,setCurrentDay] = useState([]);
    const[forecast,setForecast] = useState([]);
    const[location,setLocation] = useState('');
    const[hourlyForecast,setHourlyForecast] = useState([]);

    useEffect(()=>{
        axios.get(`${baseUrl}&q=${loc}&days=7`)
        .then(res=>{
            setCurrentDay(res.data.current);
            setForecast(res.data.forecast.forecastday)
            setLocation(res.data.location);

            let timeEpoch = res.data.current.last_updated_epoch;
            let hourly_forecast = res.data.forecast?.forecastday[0]?.hour.filter((ele)=> ele.time_epoch >= timeEpoch);
           var a=0;
            while(hourly_forecast.length < 4){
                hourly_forecast.push(res.data.forecast?.forecastday[0]?.hour[a]);
                a++;
            }
            while(hourly_forecast.length > 4){
                hourly_forecast.pop();
            }
            setHourlyForecast(hourly_forecast);
            console.log(res.data);
        })
        .catch(err=>console.log("Error:",err))
    },[loc]);

    let display = currentDay.last_updated?.split(" ");


    console.log({CurrentDay:currentDay,Forecast:forecast,location:location,hourly:hourlyForecast});
    return(
        <div className={styles.CurrentDayReport_mainDiv}>
            <div className={styles.CurrentDayReport_city}>
                <div onClick={()=>alert("Added To Favourites")} style={{color:"red",cursor:"pointer"}}><AiFillHeart/></div>
                <p>{location.name}</p>
            </div>
        {/* Temperature section */}
            <div className={styles.CurrentDayReport_temp}>
                <p>{currentDay.condition?.text}</p>
                <div 
                style={{backgroundImage:`url(${currentDay.condition?.icon})`}} 
                className={styles.CurrentDayReport_tempDisplay}>
                    <p>{currentDay.temp_c}<span>&#176;</span>C</p>
                </div>
                <p className={styles.CurrentDayReport_dateAndTime}>{display?.join(" | ")}</p>
            </div>
        {/* Extra Information */}
            <div className={styles.CurrentDayReport_Info}>
                <ExtraInfo 
                image={umbrella} 
                precip_mm ={(Number(currentDay.precip_mm)*100) + "%"}
                text = {"Precipitation"}
                />

               <ExtraInfo 
                image={droplet} 
                precip_mm ={Number(currentDay.humidity) + "%"}
                text = {"Humidity"}
                />

                <ExtraInfo 
                image={windy} 
                precip_mm ={Number(currentDay.wind_kph) + " " + "km/h"}
                text = {"Wind Speed"}
                />
            </div>

            <p style={{textAlign:"start"}}>Today</p>
            {/* Hourly Forecast */}
            <div className={styles.CurrentDayReport_HourlyForecast}>
            {
                hourlyForecast?.map((ele)=>
                <HourlyForecast data={ele} />
                )
            }
            </div>

            <p style={{textAlign:"start"}}>Other cities</p>
            <OtherCity />
        </div>
    )
}
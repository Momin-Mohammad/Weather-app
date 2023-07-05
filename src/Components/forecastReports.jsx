import { useEffect, useState } from "react";
import ForecastDisplayComp from "./forecastDisplayComp";
import styles from "./forecastReports.module.css";
import baseUrl from "../utilities";
import axios from "axios";
import WeeksDayReport from "./weeksDayReport";

export default function ForecastReport({loc}){
    const[forecast,setForecast] = useState([]);

    useEffect(()=>{

        axios.get(`${baseUrl}&q=${loc}&days=7`)
        .then(res=>{
            setForecast(res.data.forecast.forecastday);
        })
    },[loc])
    console.log("GVYTCHGV:",forecast)
    return(
        <div className={styles.forecastReports_mainDiv}>
            <p className={styles.ForecastReport_7days}>7 Days</p>
            <ForecastDisplayComp 
            forecast={forecast}
            />

            {
             forecast?.map((ele,index)=>
             index > 0?
             <WeeksDayReport 
             day = {ele.date}
             image={ele.day?.condition?.icon}
             condition={ele.day?.condition?.text}
             dayTemp={ele.day?.maxtemp_c}
             nightTemp={ele.hour[0]?.temp_c}
             />
             :
             null
             )
            }
        </div>
    )
}
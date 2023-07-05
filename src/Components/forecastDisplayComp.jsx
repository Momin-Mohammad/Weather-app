import  umbrella from "../images/umbrella.png";
import  droplet from "../images/droplet.png";
import windy from "../images/windy.png";
import night from "../images/night.png"

import styles from "./forecastDisplayComp.module.css";
import style from "./currentDayReport.module.css";
import ExtraInfo from "./extraInfo";

export default function ForecastDisplayComp({forecast}){ 
    
    return(
        <div>
            <div className={styles.ForecastDisplayComp_tomTempMainDiv}>
        <div className={styles.ForecastDisplayComp_tomTemp}>
            <div 
            className={styles.ForecastDisplayComp_wetherIconDiv}
            style={{backgroundImage:`url(${night})`}}>
                <p><span className={styles.ForecastDisplayComp_dayTemp}>{forecast[1]?.day.maxtemp_c}<span>&#176;</span>C</span><span> / </span>{forecast[1]?.hour[0]?.temp_c}<span>&#176;</span>C</p>
            </div>
            <div className={styles.ForecastDisplayComp_wetherCondDiv}>
                <p>Tomorrow</p>
                <p>{forecast[1]?.hour[0]?.condition.text}</p>
            </div>
        </div>

        {/* Extra Info section */}
        <div className={style.CurrentDayReport_Info}>
               <ExtraInfo
                image={umbrella} 
                precip_mm ={(Number(forecast[1]?.hour[0]?.precip_mm)*100) + "%"}
                text = {"Precipitation"}
                />

                <ExtraInfo 
                image={droplet} 
                precip_mm ={Number(forecast[1]?.hour[0]?.humidity) + "%"}
                text = {"Humidity"}
                />

                <ExtraInfo 
                image={windy} 
                precip_mm ={Number(forecast[1]?.hour[0]?.wind_kph) + " " + "km/h"}
                text = {"Wind Speed"}
                />
        </div>
        </div>
        </div>
    )
}
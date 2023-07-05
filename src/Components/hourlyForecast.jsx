import styles from "./hourlyForecast.module.css";

export default function HourlyForecast({data}){
    let time = Number(data.time[11] + data.time[12]);
    if(time === 0){
        time = 12;
        time += "am";
    }else if(time > 6){
        if(time > 12){
            time = Math.abs(time-12);
        }
        time += "pm"
    }else{
        if(time > 12){
            time = Math.abs(time-12);
        }
        time += "am"
    }
    return(
        <div className={styles.HourlyForecast_mainDiv}>
            <p>{time}</p>
            <img src={data.condition?.icon} alt="weather icon" />
            <p>{data.temp_c}<span>&#176;</span>C</p>
        </div>
    )
}
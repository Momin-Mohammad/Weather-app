import styles from "./weeksDayReport.module.css";

export default function WeeksDayReport({day,image,condition,dayTemp,nightTemp}){
    return(
        <div className={styles.WeeksDayReport_mainDiv}>
            <div>{day}</div>
            <div className={styles.WeeksDayReport_conditionDiv}>
                <img src={image} alt="weather icon"/>
                <p>{condition}</p>
            </div>
            <div className={styles.WeeksDayReport_tempDiv}>
                <p>+{Math.floor(dayTemp)}<span>&#176;</span>C</p>
                <span> / </span>
                <p>+{Math.floor(nightTemp)}<span>&#176;</span>C</p>
            </div>
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react"
import baseUrl from "../utilities";
import styles from "./otherCity.module.css";

export default function OtherCity(){
    const[report,setReport] = useState([]);
    const[location,setLocation] = useState({});

    useEffect(()=>{
        axios.get(`${baseUrl}&q=mumbai`)
        .then(res=>{
            setReport(res.data.current);
            setLocation(res.data.location)
        })
    },[])

    return(
        <div className={styles.otherCity_mainDiv}>
            <div>
                <img src={report.condition?.icon} alt="weather icon" />
            </div>
            <div>
                <h5>{location.name}</h5>
                <p>{report.condition?.text}</p>
            </div>
            <div>
                <h4>{report.temp_c}<span>&#176;</span>C</h4>
            </div>
        </div>
    )
}
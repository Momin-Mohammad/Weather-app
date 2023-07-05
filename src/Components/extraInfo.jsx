export default function ExtraInfo({image,precip_mm,text}){
    return(
        <div>
                    <img src={image} alt="weather icon" />
                    <p>{precip_mm}</p>
                    <p>{text}</p>
                </div>
    )
}
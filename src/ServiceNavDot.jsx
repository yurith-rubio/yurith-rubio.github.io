import {useState} from "react";

export default function ServiceNavDot() {
    const [hover, setHover] = useState(false);

    function handleMouseEnter(){
        setHover(true);
    }

    function handleMouseLeave(){
        setHover(false);
    }

    return <button className={hover === true ? 'service-nav-dot active' : 'service-nav-dot'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></button>
}
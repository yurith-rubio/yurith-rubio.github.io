import React, {useState, useEffect} from 'react';
import svggirl from "/intro-girl.svg";

export default function IntroContent(props){
    const [delayedOneSec, setDelayOneSec] = useState(false);

    useEffect(() => {
        setDelayOneSec(true);
    },[])

    return <div className="full-height">
        <h1><span className="h1-main text-up">Creative <br></br>Frontend Development<br></br></span>
        {delayedOneSec && 
            <span className="intro-subheading text-up delayed-oneSec">that blends aesthetics with functionality</span>       
        }
        </h1>
        <img src={svggirl} className="intro-girl" />
        </div>
}
import Path from './Path.jsx';
import arrow from '/arrow-small.svg';

export default function ServiceBall(props) {
    const {tag, arrowStyle, textClassName, arrowClassName} = props;
    

    return <>
        <div className="service-ball-content">
            <div>
                <div className={`service-ball-info ${textClassName}`} dangerouslySetInnerHTML={{__html: tag}}></div>
                <img src={arrow} className={`service-ball-arrow ${arrowClassName}`}/>
            </div>
            <svg className="svg-service-ball" viewBox="0 0 200 200">
                <Path/>
            </svg>
        </div>
    </>
}
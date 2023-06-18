import ServiceBall from './ServiceBall.jsx';
import ServiceNavDot from './ServiceNavDot.jsx';

export default function Services(){
    return<>
        <div id='Services' className='content-boundary'>
            <div className='big-text center'>I can help you with some of the following services</div>
            <div id='ServicesContent'>
                <div id='ServicesIntroGraphics'>
                    <ServiceBall tag='data-visualization'/>
                    <ServiceBall tag='shopify-development'/>
                    <ServiceBall tag='web-app-development'/>
                    <ServiceBall tag='prototyping'/>
                </div>
                <div id='ServicesNavDots'>
                    <ServiceNavDot/>
                    <ServiceNavDot/>
                    <ServiceNavDot/>
                    <ServiceNavDot/>
                </div>
            </div>
        </div>
    </>
}
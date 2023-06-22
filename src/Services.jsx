import ServiceBall from './ServiceBall.jsx';
import ServiceNavDot from './ServiceNavDot.jsx';
import ServiceGraph from './ServiceGraph.jsx';
import ServiceInfo from './ServiceInfo.jsx';

export default function Services(){
    return<>
        <div id="ServicesSection" className='text-light-green'>
            <section id='Services' className='content-boundary'>
                <div className='big-text center'>I can help you with the following services</div>
                <div id='ServicesContent'>
                    <div id='ServicesIntroGraphics'>
                        <ServiceBall tag='data<br>visualization' textClassName='up-text' arrowClassName='up-arrow'/>
                        <ServiceBall tag='shopify<br>development' textClassName="down-text" arrowClassName='down-arrow'/>
                        <ServiceBall tag='web-app<br>development' textClassName='up-text' arrowClassName='up-arrow'/>
                        <ServiceBall tag='prototyping' textClassName="down-text" arrowClassName='down-arrow'/>
                    </div>
                </div>
            </section>
            <section id='DataVisualization' className='content-boundary'>
                <div className='data-visualization-content'>
                    <ServiceGraph serviceName='data visualization'/>
                    <ServiceInfo/>
                    <div className='service-info'>
                        <h2 className='h2-heading'>Data Visualization</h2>
                        <p>
                        A well-designed website has the power to attract and convert visitors into customers, ultimately boosting your revenue and profitability.
                        </p>
                        <p>
                        When visitors arrive at your website, they make split-second judgments based on its visual appeal and ease of use. 
                        A special web design that captivates their attention and provides a seamless browsing experience increases the likelihood of them staying on your site longer, exploring your products or services, and ultimately making a purchase.
                        </p>
                    </div>
                    <div id='ServicesNavDots'>
                        <ServiceNavDot/>
                        <ServiceNavDot/>
                        <ServiceNavDot/>
                        <ServiceNavDot/>
                    </div>
                </div>
            </section>
        </div>
    </>
}
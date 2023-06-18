import Path from './Path.jsx';

export default function ServiceBall(props) {
    const {tag} = props;

    return <>
        <div className="service-ball-content">
            <div className="service-ball-info">{tag}</div>
                <svg viewBox="0 0 200 200">
                    <Path/>
                </svg>
        </div>
    </>
}
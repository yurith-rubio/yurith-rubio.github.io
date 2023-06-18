
import { useState, useEffect, useRef } from "react";
import { spline } from 'https://cdn.skypack.dev/@georgedoescode/spline@1.0.1';
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@2.4.0';
import { render } from "react-dom";

const simplex = new SimplexNoise();
let noiseStep = 0.005;

function createInitialPoints(numPoints) {
    const pointsArr = [];
    const angleStep = (Math.PI * 2) / numPoints;
    const rad = 75;
    for (let i = 1; i <= numPoints; i++) {
        const theta = i * angleStep;
        const x = 100 + Math.cos(theta) * rad;
        const y = 100 + Math.sin(theta) * rad;
        pointsArr.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
        });
    }
    return pointsArr;
}

function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function noise(x, y) {
    return simplex.noise2D(x, y);
}

export default function Path() {
    
    const points = useRef(createInitialPoints(6));
    const [renderedPoints, setRenderedPoints] = useState(points.current);
    const stopAnimation = useRef(false);
    const [stop, setStop] = useState("");

    useEffect(() => {
        function animate() {

            if(stopAnimation.current){
                return;
            }

            // for every point...
            const newAnimatedPoints = [];
            for (let i = 0; i < renderedPoints.length; i++) {
                const point = renderedPoints[i];
        
                // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
                const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
                const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
                // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
                const x = map(nX, -1, 1, point.originX - 5, point.originX + 5);
                const y = map(nY, -1, 1, point.originY - 5, point.originY + 5);
        
                // update the point's current coordinates
                point.x = x;
                point.y = y;
        
                // progress the point's x, y values through "time"
                point.noiseOffsetX += noiseStep;
                point.noiseOffsetY += noiseStep;
                newAnimatedPoints.push(point);
            }
        
            setRenderedPoints(newAnimatedPoints);
            requestAnimationFrame(animate);
        };

        animate();
    }, [
        
    ],[stopAnimation.current === false]);

    let rerender = "";

    function handleMouseEnter() {
        console.log("mouse enters");
        stopAnimation.current = true;
        console.log(stopAnimation.current);
        setStop("stoping");
    }

    function handleMouseLeave() {
        console.log("mouse leaves");
        stopAnimation.current = false;
        console.log(stopAnimation.current);
        setStop("rendering");
    }
    

    return <path stop={stop} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} d={spline(renderedPoints, 1, true)} className="service-ball-path" />;
}






/*import { useState, useEffect, useRef } from "react";
import { spline } from 'https://cdn.skypack.dev/@georgedoescode/spline@1.0.1';
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@2.4.0';

const simplex = new SimplexNoise();
let noiseStep = 0.003;

function createInitialPoints(numPoints) {
    const pointsArr = [];
    const angleStep = (Math.PI * 2) / numPoints;
    const rad = 75;
    for (let i = 1; i <= numPoints; i++) {
        const theta = i * angleStep;
        const x = 100 + Math.cos(theta) * rad;
        const y = 100 + Math.sin(theta) * rad;
        pointsArr.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
        });
    }
    return pointsArr;
}

function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function noise(x, y) {
    return simplex.noise2D(x, y);
}

export default function Path() {
    const [points, setPoints] = useState(createInitialPoints(6));
    const stopAnimation = useRef(false);

    useEffect(() => {
        function animate() {
            if(stopAnimation.current){
                return
            }
            // for every point...
            const newAnimatedPoints = [];
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
        
                // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
                const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
                const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
                // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
                const x = map(nX, -1, 1, point.originX - 5, point.originX + 5);
                const y = map(nY, -1, 1, point.originY - 5, point.originY + 5);
        
                // update the point's current coordinates
                point.x = x;
                point.y = y;
        
                // progress the point's x, y values through "time"
                point.noiseOffsetX += noiseStep;
                point.noiseOffsetY += noiseStep;
                newAnimatedPoints.push(point);
            }
        
            setPoints(newAnimatedPoints);
            requestAnimationFrame(animate);
        };

        animate();
    }, [
        
    ]);

    function handleMouseEnter() {
        stopAnimation.current = true;
    }

    function handleMouseLeave() {
        stopAnimation.current = false;
    }

    

    return <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} d={stopAnimation.current ? 'M 45, 45, 45' : spline(points, 1, true)} className="service-ball-path" />;
}

*/
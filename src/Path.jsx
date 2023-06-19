import { useState, useEffect, useRef } from "react";
import { spline } from 'https://cdn.skypack.dev/@georgedoescode/spline@1.0.1';
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@2.4.0';


export default function Path() {
    const simplex = new SimplexNoise();
    const noiseStep = 0.005;

    const points = useRef(createInitialPoints(6));
    const [renderedPoints, setRenderedPoints] = useState(points.current);
    const stopAnimation = useRef(false);
    const [stop, setStop] = useState("");

    const circle = 'M175,99.99999999999999C175,104.4639223699659,174.5917832619005,108.99958180888098,173.79471914489721,113.39176710989776C172.99765502789393,117.78395241091454,171.7861252354398,122.17383202350983,170.21761529798027,126.3531118061007C168.64910536052074,130.53239158869155,166.67320207809152,134.63539703221335,164.38365952013996,138.46744580544296C162.0941169621884,142.29949457867258,159.41734734706,145.9837518822019,156.48035995027084,149.34540444547844C153.54337255348167,152.707057008755,150.25177018353767,155.85415111113943,146.761735139405,158.63736118510224C143.27170009527234,161.42057125906504,139.4710597790222,163.92935196641628,135.5401496854749,166.04466488925533C131.60923959192758,168.15997781209438,127.42171703631284,169.94981084824653,123.17627457812105,171.3292387221365C118.93083211992926,172.70866659602646,114.49101774539244,173.7220252545181,110.06749493632417,174.3212321325951C105.64397212725589,174.9204390106721,101.09456522088601,175.124753110425,96.63513772371138,174.9244799905986C92.17571022653675,174.7242068707722,87.66293246956903,174.1129095885101,83.31092995327643,173.11959341363678C78.95892743698383,172.12627723876346,74.6278232196531,170.71901617211532,70.52312262595574,168.9645829413588C66.41842203225838,167.21014971060228,62.40819660775408,165.05215538814844,58.68272639109232,162.5929940290977C54.957256174430555,160.13383267004696,51.39680148752072,157.29446480491472,48.17030132598516,154.20961478705436C44.943801164449596,151.124764769194,41.94755315832338,147.69528298080843,39.32372542187895,144.0838939219355C36.699897685434514,140.47250486306257,34.36415823632989,136.56313551788935,32.42733490731857,132.54128043381687C30.490511578307245,128.51942534974438,28.89035327397126,124.2558187951772,27.70278544781101,119.95276341750065C26.51521762165076,115.64970803982409,25.702070866599392,111.16890009863388,25.30192795035707,106.72294816775752C24.901785034114745,102.27699623688116,24.90178503411475,97.72300376311885,25.30192795035707,93.27705183224249C25.70207086659939,88.83109990136613,26.515217621650745,84.35029196017594,27.702785447810996,80.04723658249938C28.890353273971247,75.74418120482282,30.490511578307242,71.48057465025562,32.42733490731857,67.45871956618315C34.36415823632989,63.43686448211067,36.69989768543451,59.52749513693744,39.32372542187894,55.91610607806452C41.94755315832337,52.30471701919161,44.94380116444958,48.87523523080601,48.17030132598514,45.790385212945644C51.396801487520705,42.705535195085275,54.95725617443054,39.86616732995305,58.6827263910923,37.40700597090231C62.408196607754064,34.94784461185157,66.41842203225838,32.78985028939772,70.52312262595572,31.0354170586412C74.62782321965307,29.280983827884686,78.9589274369838,27.87372276123652,83.3109299532764,26.880406586363222C87.662932469569,25.887090411489922,92.17571022653674,25.27579312922779,96.63513772371137,25.0755200094014C101.094565220886,24.875246889575013,105.64397212725588,25.079560989327874,110.06749493632415,25.678767867404886C114.49101774539243,26.2779747454819,118.93083211992925,27.291333403973518,123.17627457812104,28.670761277863477C127.42171703631283,30.050189151753436,131.60923959192755,31.840022187905596,135.5401496854749,33.95533511074464C139.47105977902223,36.07064803358369,143.27170009527237,38.579428740934944,146.761735139405,41.36263881489776C150.25177018353764,44.14584888886057,153.54337255348165,47.292942991245,156.4803599502708,50.65459555452154C159.41734734705997,54.016248117798085,162.09411696218837,57.7005054213274,164.38365952013993,61.53255419455702C166.6732020780915,65.36460296778665,168.64910536052074,69.46760841130842,170.21761529798027,73.64688819389929C171.7861252354398,77.82616797649015,172.99765502789393,82.21604758908545,173.79471914489721,86.60823289010223C174.5917832619005,91.00041819111901,175,95.53607763003407,175,99.99999999999999C175,104.4639223699659,174.5917832619005,108.99958180888098,173.79471914489721,113.39176710989776'

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
        console.log(pointsArr);
        return pointsArr;
    }

    function map(n, start1, end1, start2, end2) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    }

    function noise(x, y) {
        return simplex.noise2D(x, y);
    }

    function animate() {

        // for every point...
        const newAnimatedPoints = [];
        for (let i = 0; i < renderedPoints.length; i++) {
            const point = renderedPoints[i];
    
            // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
            const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
            const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
            // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
            const x = map(nX, -1, 1, point.originX - 10, point.originX + 7);
            const y = map(nY, -1, 1, point.originY - 10, point.originY + 7);
    
            // update the point's current coordinates
            point.x = x;
            point.y = y;
    
            // progress the point's x, y values through "time"
            point.noiseOffsetX += noiseStep;
            point.noiseOffsetY += noiseStep;
            newAnimatedPoints.push(point);
        }
    
        setRenderedPoints(newAnimatedPoints);
        if(stopAnimation.current){
            return;
        }
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        if(stopAnimation.current){
            return;
        }
        animate();
    },[]);

    function handleMouseEnter() {
        stopAnimation.current = true;
        setStop("stoping");
    }

    function handleMouseLeave() {
        stopAnimation.current = false;
        setStop("rendering");
        animate();
    }
    
    return <path stop={stop} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} d={stopAnimation.current ? circle : spline(renderedPoints, 1, true)} className={stopAnimation.current ? "service-ball-path selected": "service-ball-path"} />;
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
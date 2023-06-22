import gsap, { TweenMax, Elastic } from 'gsap';
import { useEffect, useState, useRef } from 'react';

export default function ServiceGraph(props) {

    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const circleLineVisible = useRef(false);

    const callbackFunction = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    }

    const options = {
        root: null,
        rootMargin: "50% 0px 0px 0px",
        threshold: 1
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);

        if(containerRef.current) {
            observer.observe(containerRef.current);
            let $leftUpSplit = document.getElementById("left-up-split").children;
            let $leftDownSplit = document.getElementById("left-down-split").children;
            let $rightUpSplit = document.getElementById("right-up-split").children;
            let $rightSplit = document.getElementById("right-split").children;

            if(isVisible){
                
                TweenMax.to($leftUpSplit, 1.5, { attr: { cx: 370, cy: 370 }, ease: Elastic.back});
    
                const timer = setTimeout(() => {
                    TweenMax.to($leftDownSplit, 1.5, { attr: { cx: 370, cy: 130 }, ease: Elastic.back});
                },100);
    
                const timer2 = setTimeout(() => {
                    TweenMax.to($rightUpSplit, 1.5, { attr: { cx: 130, cy: 370 }, ease: Elastic.back});
                },150);
    
                const timer3 = setTimeout(() => {
                    TweenMax.to($rightSplit, 1.5, { attr: { cx: 130, cy: 130 }, ease: Elastic.back});
                },200);

                const timer4 = setTimeout(() => {
                    let path = document.querySelector('#dotted-circle');
                    let l = path.getTotalLength();
    
                    TweenMax.set(path, {strokeDasharray:l});
                    TweenMax.fromTo(path, 3, {strokeDashoffset:l}, {strokeDashoffset:0});
                },1000)


            } else {
                console.log("not beeing observerd");
                TweenMax.to($leftUpSplit, 1.5, { attr: { cx: 250, cy: 250 }, ease: Elastic.back});
    
                const timer = setTimeout(() => {
                    TweenMax.to($leftDownSplit, 1.5, { attr: { cx: 250, cy: 250 }, ease: Elastic.back});
                },100);
    
                const timer2 = setTimeout(() => {
                    TweenMax.to($rightUpSplit, 1.5, { attr: { cx: 250, cy: 250 }, ease: Elastic.back});
                },200);
    
                const timer3 = setTimeout(() => {
                    TweenMax.to($rightSplit, 1.5, { attr: { cx: 250, cy: 250 }, ease: Elastic.back});
                },300);

                const timer4 = setTimeout(() => {
                    let path = document.querySelector('#dotted-circle');
                    let l = path.getTotalLength();
    
                    TweenMax.set(path, {strokeDasharray:0});
                    TweenMax.fromTo(path, 3, {strokeDashoffset:0}, {strokeDashoffset:0});
                    
                    circleLineVisible.current = true;
                },1000)
            }
        }

        return() => {
            if(containerRef.current){
                observer.unobserve(containerRef.current)
            }
        }
    }, [containerRef, options]);


    return <div className='service-graph' ref={containerRef}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 500 500">
            
            <g id="blobs__split" className='all-light-green'>
                <circle id="start-blob" cx="250" cy="250" r="110" />
                <circle id='dotted-circle' className={circleLineVisible.current && 'dotted-circle'} cx="250" cy="250" r="170" />
                
                <g id="left-down-split">
                    <circle cx="250" cy="250" r="28" />
                </g>
                <g id="left-up-split">
                    <circle cx="250" cy="250" r="28" />
                </g>
                <g id="right-up-split">
                    <circle cx="250" cy="250" r="28" />
                </g>
                <g id="right-split">
                    <circle cx="250" cy="250" r="28" />
                </g>
            </g>
            
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="goo" />
                </filter>
            </defs>
        </svg>
    </div>
}
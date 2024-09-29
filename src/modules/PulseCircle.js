import React, { useState, useEffect, useRef } from 'react';
import { gsap, Power3 } from "gsap";

function PulseCircle ({...props}) {

    const ref = useRef();
  
    const handleMouseEnter = () => {
      gsap.to([`.${props.pulseClass}`], {
        scale: 1.75,
        opacity: 0,
        duration: 2,
        stagger: {
          each: 0.5,
          repeat: -1
        }
      });
    };
  
    const handleMouseLeave = () => {
      gsap.killTweensOf([`.${props.pulseClass}`]);
    };



  return (
    <>
      
      <div 
            className={props.pulseClass}
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex', // Use Flexbox
        justifyContent: 'center', // Center children horizontally
        alignItems: 'center', // Center children vertically
        height: '100vh', // Make the parent div fill the screen
        backgroundColor: props.color,
        height: '20vmax',
        width: '20vmax',
        borderRadius: '100%',
        position: 'relative'
        }}>
<div style={{
  position: 'absolute',
  backgroundColor: 'inherit',
  height: '100%',
  width: '100%',
  borderRadius: '100%',
  opacity: 0.8
}} className={props.pulseClass}></div>
<div style={{
  position: 'absolute',
  backgroundColor: 'inherit',
  height: '100%',
  width: '100%',
  borderRadius: '100%',
  opacity: 0.8
}} className={props.pulseClass}></div>
<div style={{
  position: 'absolute',
  backgroundColor: 'inherit',
  height: '100%',
  width: '100%',
  borderRadius: '100%',
  opacity: 0.8
}} className={props.pulseClass}></div>
<div style={{
  position: 'absolute',
  backgroundColor: 'inherit',
  height: '100%',
  width: '100%',
  borderRadius: '100%',
  opacity: 0.8
}} className={props.pulseClass}></div>

        </div>



    </>
  );
};

export default PulseCircle;

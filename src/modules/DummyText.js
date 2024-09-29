import React, { useEffect } from "react";
import { gsap, Power3 } from "gsap";

const DummyText = ({...props}) => {

  useEffect(() => {
    let tl = gsap.timeline({
      reversed: false
    });
    tl.from(["#textdiv"], 4, {
      y: -200,
      ease: Power3.easeOut
    });
    tl.to(["#textdiv"], 4, { opacity: 1 }, 0);
  }, []);


  return (
    
     <div id="textdiv">
      <p>
     {props.text}    </p>
      </div>
  );
};

export default DummyText;

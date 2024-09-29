import React, { useState, useEffect, useRef } from "react";
import PulseCircle from "./modules/PulseCircle";
import DummyText from "./modules/DummyText";
import Bigben from "./modules/Bigben";

// Usage
function App() {
  const sectionOneRef = useRef();
  const sectionTwoRef = useRef();
  const sectionThreeRef = useRef();
  const sectionFourRef = useRef();

  // const onScreenSectionOne = useOnScreen(sectionOneRef, "-10%");
  const onScreenSectionTwo = useOnScreen(sectionTwoRef, "-10%");
  // const onScreenSectionThree = useOnScreen(sectionThreeRef, "-50%");
  // const onScreenSectionFour = useOnScreen(sectionFourRef, "-50%");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <DummyText text="Imagine it's 1868, London ..." />
      </div>

      <div className="section-three" ref={sectionThreeRef}>
        <Bigben
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flex: 1,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <DummyText text="the first traffic light is being installed in London" />
      </div>

      <div id="section-home">
        <DummyText text="and it's gas lit!" />
      </div>

      <div className="section-two-two" ref={sectionTwoRef}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <PulseCircle color="coral" pulseClass="ring1" pulse={false} />
          <PulseCircle color="#77dd77" pulseClass="ring2" pulse={true} />
          <PulseCircle color="gold" pulseClass="ring3" pulse={false} />
        </div>
      </div>

      <div id="section-home">
        <DummyText text="so it flickers like this" />
      </div>

      <div id="section-home">
        <DummyText text="and that's how you gas light a traffic light ;)" />
      </div>
    </div>
  );
}

// Hook
function useOnScreen(ref, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}

export default App;

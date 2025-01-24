"use client";
// components/CarAnimation.js
import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { Scrollama, Step } from "react-scrollama";

const CarAnimation = ({ path }) => {
  const [scrollIndex, setScrollIndex] = useState(0);

  // Define the animation using keyframes for smooth transition
  const carAnimation = useSpring({
    x: path[scrollIndex], // Animate to the current point in the path
    config: config.slow, // Smooth and slow transition
  });

  const handleStepEnter = ({ index }) => {
    setScrollIndex(index); // Update the scroll index based on user interaction
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      {/* Scrollama for triggering animations */}
      <Scrollama onStepEnter={handleStepEnter}>
        {path.map((_, index) => (
          <Step key={index} data={index}>
            <div style={{ height: "100vh" }}>{/* Spacer for each step */}</div>
          </Step>
        ))}
      </Scrollama>

      {/* Render path points */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
      >
        {path.map((point, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${point}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          />
        ))}
      </div>

      {/* Car component with smooth transition */}
      <animated.div
        style={{
          position: "absolute",
          bottom: "10%", // Adjust bottom offset as needed
          left: carAnimation.x.interpolate((x) => `${x}%`),
          transform: "translate(-50%, 0)",
        }}
      >
        {/* Render your car or custom element here */}
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "white",
            borderRadius: "10px", // Example: Make it look like a car
          }}
        />
      </animated.div>
    </div>
  );
};

export default CarAnimation;

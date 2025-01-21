"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./StepsToBid.scss";
import { Divider } from "@/Components";
import { assets } from "@/assets";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const cardsInfo = [
  {
    image: assets.images.howToBid.illustration_01,
    firstLine: "Select location and travel dates",
    secondLine: "",
  },
  {
    image: assets.images.howToBid.illustration_02,
    firstLine: "Choose car and verify yourself",
    secondLine: "",
  },
  {
    image: assets.images.howToBid.illustration_03,
    firstLine: "Score Your Wheels with Your Own Price Tag",
    secondLine: "",
  },
  {
    image: assets.images.howToBid.illustration_04,
    firstLine: "Make payment and get the car delivered at your doorstep",
    secondLine: "",
  },
];

const StepsToBid = () => {
  const carRef = useRef(null);
  const t1 = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 980;
      setIsMobile(isMobileDevice);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const context = gsap.context(() => {
      // Set initial position of the car
      gsap.set("#car", { y: -50, x: 0 });

      const carWidth = isMobile ? 90 * 1.13 : 120 * 1.13;
      const carHeight = isMobile ? 90 * 1.13 : 120 * 1.13;

      gsap.set("#car", { width: carWidth, height: carHeight });

      // Car animation along the path
      t1.current = gsap.timeline().to("#car", {
        scrollTrigger: {
          trigger: "#path1",
          scrub: 1,
          start: "top center",
          end: "bottom top",
        },
        motionPath: {
          path: "#path1",
          align: "#path1",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 20,
      });
    }, carRef);

    return () => {
      context.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div className="stepsToBid">
      <div className="stepsToBidContainer">
        <div className="SectionTitle">
          <h1>How To Bid</h1>
          <p>Bid a car for rent at your price in just 4 simple steps</p>
          <Divider />
        </div>
        <div className="stepsToBidAnimation" ref={carRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 697 2000"
            fill="none"
            className="svgContainer"
          >
            <path
              id="path1"
              d="M80.002 50C506.668 100 786.9 300 664.5 538C419.833 665.667 -260 950.7 -100 1223.5C219.669 1285.33 850.803 1488.5 758.003 1756.5"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40 30"
            />
            <image
              id="car"
              xlinkHref={assets.images.howToBid.car.src}
              x="0"
              y="0"
              style={{ position: "absolute" }}
            />
          </svg>
        </div>
        <div className="stepsToBidCardContainer">
          {cardsInfo.map((info, index) => (
            <div
              className={`cardcontainer ${index % 2 !== 0 ? "rightAlign" : ""}`}
              key={index}
            >
              <Card data={info} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepsToBid;

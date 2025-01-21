"use client"; // Add this line at the top of the file

import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Promises.scss";
import { Divider, Dividerwhite } from "@/Components";
import { IconButton } from "@mui/material";
import { assets } from "@/assets";
import Card from "./Card";
import { uid } from "react-uid";
import { useRef, useEffect, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const cardsInfo = [
  {
    image: assets.images.promisesAndCommitments.rideinfinitykmscard,
    firstLine: "Ride Infinity",
    secondLine: "Kilometers",
    overlayContent: {
      title: "Unlimited Adventures or Endless Journeys",
      content:
        "Whether it's a spontaneous road trip or an extensive travel plan, our infinity kilometers policy ensures you have the freedom to explore to your heart's content.",
    },
  },
  {
    image: assets.images.promisesAndCommitments.askyourpricecard,
    firstLine: "Ask your Price",
    secondLine: "",
    overlayContent: {
      title: "Your Price, Your Way",
      content:
        "With our innovative system, get the rental car at your affordable price. Simply tell us what you're willing to pay, and we'll work to match your offer.",
    },
  },
  {
    image: assets.images.promisesAndCommitments.zerosecuritydepositcard,
    firstLine: "Zero Security ",
    secondLine: "Deposit",
    overlayContent: {
      title: "Doorstep Delivery",
      content:
        "No need to navigate through traffic or visit rental offices – our team delivers the vehicle directly to your location at your preferred time, saving you time and effort.",
    },
  },
  {
    image: assets.images.promisesAndCommitments.freeCancellation,
    firstLine: "100% free cancellation",
    secondLine: "before 9 hours",
    overlayContent: {
      title: "100% free cancellation before 9 hours",
      content:
        "This policy ensures that your booking experience is risk-free, allowing you to plan with confidence. Experience worry-free planning with our 100% free cancellation policy, available up to 9 hours before your scheduled booking.",
    },
  },
  {
    image: assets.images.promisesAndCommitments.freeReschedule,
    firstLine: "Reschedule for",
    secondLine: "Free",
    overlayContent: {
      title: "Reschedule for Free",
      content:
        "Enjoy the flexibility of rescheduling without any additional fees! Life can be unpredictable, and we understand that plans might change. With our hassle-free policy, you can modify your booking dates at no extra cost.",
    },
  },
  {
    image: assets.images.promisesAndCommitments.zerosecuritydepositcard,
    firstLine: "Trust Over Deposits",
    secondLine: "Deposit",
    overlayContent: {
      title: "Trust Over Deposits",
      content:
        "Rent with ease, drive with peace of mind, and cherish every moment on the road with our no-security-deposit policy.",
    },
  },
];

const PromisesAndCommitments = () => {
  const swiperRef = useRef(null);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 500;
      const isTabDevice = window.innerWidth <= 1354;
      setIsMobile(isMobileDevice);
      setIsTab(isTabDevice);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
  });

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const [activeIndex, setActiveIndex] = useState(0);

  // Define the handleDotClick function
  const handleDotClick = (index) => {
    setActiveIndex(index);
    // You can also make the swiper jump to the selected slide
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="PromisesAndCommitments">
      <div className="PromisesAndCommitmentsContainer">
        <div className="scrollControllers">
          <IconButton onClick={goPrev}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="PromisesAndCommitmentsContainerRight">
          <div className="SectionTitle">
            <h1>Why BidrYde</h1>
            <p>Our Promise and commitments to you</p>
            <div
              className="divider"
              style={{ "--circle-color": "#ffffff", "--line-color": "#ffffff" }}
            ></div>
            <Divider />
          </div>

          <div className="CardSection">
            <Swiper
              spaceBetween={isMobile ? 80 : isTab ? 100 : 30}
              slidesPerView={isMobile ? 1 : isTab ? 2 : 3}
              ref={swiperRef}
              onSlideChange={handleSlideChange}
            >
              {cardsInfo.map((card) => (
                <SwiperSlide key={uid(card)}>
                  <Card data={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="scrollControllers">
          <IconButton onClick={goNext}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>

      {isMobile && (
        <div className="dot-indicators">
          {cardsInfo.map((_, index) => (
            <div
              key={index}
              className={`dot ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)} // Add the click handler
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromisesAndCommitments;

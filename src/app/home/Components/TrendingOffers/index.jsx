"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./TrendingOffers.scss";
import { Divider } from "@/Components";

// Import your local images
import offer1 from "@/assets/images/TrendingOffers/offer1.png";
import offer2 from "@/assets/images/TrendingOffers/offer2.png";

const TrendingOffers = () => {
  const [trendingOffers, setTrendingOffers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Start from the first slide

  // Static list of offers
  const staticOffers = [
    {
      title: "First Ride",
      content: "30% off on every drive",
      code: "RYD01",
      validity: "valid till 15 November",
      photo_url: offer1,
    },
    {
      title: "Diwali Offer",
      content: "20% off on every drive",
      code: "DIW01",
      validity: "valid till 15 November",
      photo_url: offer2,
    },
    {
      title: "Holiday Special",
      content: "25% off on every drive",
      code: "HOL01",
      validity: "valid till 15 November",
      photo_url: offer2,
    },
  ];

  useEffect(() => {
    setTrendingOffers(staticOffers);
  }, []);

  const totalSlides = Math.ceil(trendingOffers.length / 2); // Two offers per slide

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  // Render dots based on the total number of slides
  const renderDots = () => {
    return Array.from({ length: totalSlides }, (_, index) => (
      <span
        key={index}
        className={`dot ${index === currentSlide ? "active" : ""}`}
        onClick={() => setCurrentSlide(index)} // Allow manual click on dots
      ></span>
    ));
  };

  // Auto-scroll functionality to make sure the slide and dot are updated immediately
  useEffect(() => {
    if (totalSlides > 0) { // Only set interval if there are slides to show
      const interval = setInterval(() => {
        goToNextSlide(); // Change to the next slide every 3 seconds
      }, 3000); // 3 seconds interval

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [totalSlides]); // This effect runs when `totalSlides` changes

  
  return (
    <div className="trendingOffers">
      <div className="trendingOffersContainer">
        <div className="SectionTitle">
          <h1>Trending Offers</h1>
          <p>Shift into saving gears for your next car rental</p>
          <Divider />
        </div>

        <div className="carousel">
          <div className="trendingOffersContainerCards">
            {/* Display 2 cards per slide */}
            {trendingOffers
              .slice(currentSlide * 2, currentSlide * 2 + 2)
              .map((offer, key) => (
                <div className="trendingCardContainer" key={key}>
                  <Image
                    className="offerImage"
                    src={offer.photo_url}
                    alt={offer.title}
                    width={180}
                    height={210}
                  />
                  <div className="offerContent">
                    <h3>{offer.title}</h3>
                    <p>{offer.content}</p>
                    <p className="customOfferCode">Code: {offer.code}</p>
                    <p className="customOfferValidity">{offer.validity}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="dots">{renderDots()}</div>
        </div>
      </div>
    </div>
  );
};

export default TrendingOffers;

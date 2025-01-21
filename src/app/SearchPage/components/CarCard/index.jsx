import React from "react";
import "./CarCard.scss";
import { CssButtonSolid } from "../../../../Components/CssButton";

import { assets } from '@/assets'
import Image from 'next/image';

const SearchPageAssets = {
  FuelIcon: assets.images.searchPage.fuelIcon,
  GearIcon: assets.images.searchPage.manualTransmission,
  SeaterIcon: assets.images.searchPage.seaterIcon,
  CarIcon: assets.images.searchPage.hatchback
}

function CarCard({ image, carName, rating, bidrydePrice, price, fuel, gear, seat, originalPrice, onBookNow}) {

  const handleBookNowClick = () => {
    onBookNow()
  }

  return (
    <div className="carCardContainer">
      <div className="imgContainer">
        <img src={image} alt={carName} className="imgContainer_img" />
      </div>
      <div className="textContainer">
        <div className="miniContainer1">
          <p className="textStyling">{carName}</p>
        </div>
        <div className="miniContainer1">
          <div className="iconText">
            <Image src={SearchPageAssets.SeaterIcon} alt="seater" />
            <p>{seat}</p>
          </div>
          <div className="iconText">
            <Image src={SearchPageAssets.FuelIcon} alt="fuel" />
            <p>{fuel}</p>
          </div>
          <div className="iconText">
            <Image src={SearchPageAssets.GearIcon} alt="gear" />
            <p>{gear}</p>
          </div>



        </div>
        <div className="priceActionContainer">

          <div className="prices"><p className="priceStyle">&#8377;{bidrydePrice} /hr </p>
            <p className="originalPrice">&#8377;{price} /hr </p>
          </div>

          <CssButtonSolid
            title="Book Now"
            backgroundColor="#276EBC"
            textColor="#fff"
            // margin="0 1rem 0 1rem"
            fontSize="0.7rem"
            width="45%"
            height="40px"
            border="1px solid #276EBC"
            onClick={handleBookNowClick}
          />
        </div>
      </div>
    </div>
  );
}

export default CarCard;

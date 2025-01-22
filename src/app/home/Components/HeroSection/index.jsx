"use client";
import React from "react";
import { assets } from "@/assets";
import "./HeroSection.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LocationDateTimePickerHome from "@/Components/LocationDateTimeHome";
import Link from "next/link";
import { setCookie } from "cookies-next";

const HeroSection = () => {
  const router = useRouter();

  const handleGetYourCar = (searchObj) => {
    setCookie("carSearchParams", JSON.stringify(searchObj));
    router.push("/SearchPage");
  };

  return (
    <div className="heroSection">
      <div className="heroSectionContainer">
        <div className="heroSectionContainer__left">
          <div className="heroSectionContainer__left-top">
            <h1 className="desk__title">BID YOUR RYDE</h1>
            <p>Best self-drive car rentals at affordable price</p>
          </div>
          <div className="heroSectionContainer__left-middle">
            <p>App available on</p>
            <div className="heroSectionContainer__left-middleLogos">
              <a
                href="https://play.google.com/store/apps/details?id=com.bidryde.customer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={assets.images.GoogleButton}
                  alt="google download button"
                />
              </a>
              <a
                href="https://apps.apple.com/us/app/bid-ryde-self-drive-cars/id6448796800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <Image
                  src={assets.images.AppleButton}
                  alt="apple download button"
                />{" "}
              </a>
            </div>
          </div>
          <div className="heroSectionContainer__right">
            <Image src={assets.images.heroBgWeb} alt="herosection-image" />
          </div>
          <div className="heroSectionContainer__left-bottom">
            <p className="heading2">Reserve your drive now</p>
            <div className="heroSectionContainer__left-bottomWrapper">
              <LocationDateTimePickerHome actionHandler={handleGetYourCar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

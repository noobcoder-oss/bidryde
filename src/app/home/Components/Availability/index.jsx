import React from "react";
import { Divider } from "@/Components";
import "./Availability.scss";
import Image from "next/image";
import { assets } from "@/assets";

const Availability = () => {
  return (
    <div className="availability">
      <Image
        className="availabilityRightImage"
        src={assets.images.availability.iphone13ProMax}
        alt="Bidryde home page"
      />
      <div className="availabilityContainer">
        <div className="availabilityContainerTitle">
          <h1 className="avail__top__title">
            Hit the Road: Schedule Your Drive
          </h1>
          <p className="avail__bottom__title">
            30% OFF on first ride, bid your ride now{" "}
          </p>
        </div>
        <div className="availabilityContainerContent">
          <p>App available on</p>
          <div className="availabilityContainerContentBadges">
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
      </div>
    </div>
  );
};

export default Availability;

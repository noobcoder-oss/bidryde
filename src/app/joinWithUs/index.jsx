import React from "react";
import "./JoinWithUs.scss";
import Image from "next/image";

import { RectangularCard, Form } from "./components";

import { assets } from "@/assets";
import { Divider, Footer, Navbar, SectionHeader } from "@/Components";
import { uid } from "react-uid";
import FloatingButton from "@/Components/FloatingButton";

const JoinWithUsAssets = {
  INTRO_IMAGE: assets.images.joinWithUs.aboutusHero,
  BookingShareIllus: assets.images.joinWithUs.bookingShareIllus,
  DecorativeCircle: assets.images.joinWithUs.decorativeCircle,
  OrganicReach: assets.images.joinWithUs.illus02,
  MinimalBussiness: assets.images.joinWithUs.illus03,
  Branding: assets.images.joinWithUs.illus04,
  Dashboard: assets.images.joinWithUs.illus05,
};

const cardData = [
  {
    title: "Booking Share",
    text: "BidRyde offers a transparent and professional revenue-sharing system, providing businesses with 80% of the revenue generated for each booking made through the platform",
    illustration: JoinWithUsAssets.BookingShareIllus,
  },
  {
    title: "Offline Organic Reach",
    text: "Bid rYde's branding initiatives go beyond the online platform. The company proactively enhances its presence through offline channels, including events, partnerships, and collaborations. This comprehensive strategy contributes to increased booking opportunities",
    illustration: JoinWithUsAssets.OrganicReach,
  },
  {
    title: "Minimal Business Guarantee",
    text: "Bid rYde implements a modest business guarantee for its partners, fostering a mutually benefitting collaboration and motivating active engagement from the partnered self-drive car rentals",
    illustration: JoinWithUsAssets.MinimalBussiness,
  },
  {
    title: "Branding and Marketing",
    text: "One distinctive aspect of Bid rYde is its commitment to enhancing branding and marketing efforts for its partners. Through collaboration with Bid rYde, businesses can harness the power of the Bid rYde brand, both online and offline, to boost their credibility and exposure in the market",
    illustration: JoinWithUsAssets.Branding,
  },
  {
    title: "Dashboard for Management",
    text: "One distinctive aspect of Bid rYde is its commitment to enhancing branding and marketing efforts for its partners. Through collaboration with Bid rYde, businesses can harness the power of the Bid rYde brand, both online and offline, to boost their credibility and exposure in the market",
    illustration: JoinWithUsAssets.Dashboard,
  },
];

function JoinWithUs() {
  return (
    <>     <Navbar />
    <div className="joinWithUsLayout">
    
      <div className="left_right_margin">
      <div className="intro">
        <div className="clouds"></div>
        <div className="intro_content">
          <div className="intro_text">
            <p>
              <span>BidRyde</span> is a car-sharing marketplace where you can
              book any car you have,host any car you have. The doorstep delivery and collection of
              cars is our standard way of serving our customers, and it&apos;s
              available throughout Bidryde&apos;s service areas.
            </p>
          </div>
          <div className="intro_image">
            <Image src={JoinWithUsAssets.INTRO_IMAGE} alt="Intro Image" />
          </div>
        </div>
      </div>
      {/* <div className="sectionHeader">
        <SectionHeader
          title="Join with us"
          tagLine="Empowering self-drive car rentals"
          center
        />
      </div> */}

          <div className="joinSectionHeader__top">
            <h1 align="center">Join With Us</h1>
            <p className="p__header__join__top" align="center">Empowering Self-drive Car Rentals</p>
            <Divider />
          </div>
      <div className="cards">
        <p>BidRyde Pioneers</p>
        <p className="p">Self-Drive Rental Business Aggregation</p>
        {cardData.map((data, index) => (
          <RectangularCard
            key={uid(data)}
            switchDirection={index % 2 != 0}
            title={data.title}
            text={data.text}
            illustration={data.illustration}
          />
        ))}
      </div>
      <div className="formSection">
        <div className="heading">
          {/* <SectionHeader
            title="Ready to partner for sucess?"
            tagLine=""
          /> */}
          <div className="joinSectionHeader__bottom">
            <h1>Ready to partner for sucess?</h1>
            <p className="p__header__join__bottom">Reach out to us and join BidRyde</p>
            <Divider />
          </div>
          <Image src={JoinWithUsAssets.DecorativeCircle} alt="avatar" />
        </div>
        <div className="form">
          <Form />
        </div>
      </div>

      </div>
      <Footer />
      <div className="floatingButton">
        <FloatingButton />
      </div>
    </div>
  
    </>
    );
}

export default JoinWithUs;

"use client";
import React from "react";
import "./ContactUs.scss";
import { Footer, Navbar, SectionHeader } from "@/Components";
import { Grid } from "@mui/material";
import { assets } from "@/assets";
import { Card } from "./components";
import Image from "next/image";
import FloatingButton from "@/Components/FloatingButton";

const contactUsImages = {
  hyderabad: assets.images.operatingZones.hyderabad,
  bangalore: assets.images.operatingZones.bengaluru,
  chennai: assets.images.operatingZones.chennai,
  locationIcon: assets.images.operatingZones.locationPin,
};

const cardData = [
  {
    img: contactUsImages.hyderabad,
    place: "Hyderabad",
    address: "01, Complex Road",
  },
  {
    img: contactUsImages.bangalore,
    place: "Bangalore",
    address: "(Available Soon)",
  },
  {
    img: contactUsImages.chennai,
    place: "Chennai",
    address: "(Available Soon)",
  },
];

function ContactUs() {
  return (
    <>
      <div className="contactUsLayout">
        <Navbar />
        <div className="contactIntro">
          <SectionHeader title="At your service" />
        </div>
        <div className="locationSection">
          <div className="locationIcon">
            <Image src={contactUsImages.locationIcon} />
          </div>
          <div className="bgColor"></div>
          <div className="cardSection">
            <Grid container spacing={2} textAlign="center" direction="row">
              {cardData.map((item, index) => (
                <Grid item xs={12} sm={12} md={12} lg={4} key={index}>
                  <Card
                    className="contactCard"
                    img={item.img}
                    place={item.place}
                    address={item.address}
                  />
                </Grid>
              ))}
            </Grid>
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

export default ContactUs;

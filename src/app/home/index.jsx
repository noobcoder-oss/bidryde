import { Footer, Navbar } from "@/Components";
import React from "react";
import {
  PromisesAndCommitments,
  OperatingZones,
  Testimonials,
  Faq,
  HeroSection,
  TrendingOffers,
  Availability,
} from "./Components";
import StepsToBid from "./Components/StepsToBid";
import FloatingButton from "@/Components/FloatingButton";
import Head from "next/head"; // Import Head for meta tags
import "./Home.scss";

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <Navbar />
      <div className="home">
        <HeroSection />
        <div className="order">
          <TrendingOffers className="order-2-mob" />
          <StepsToBid className="order-1-mob" />
        </div>
        <PromisesAndCommitments />
        <OperatingZones />
        <Testimonials />
        <Availability />
        <Faq />
        <Footer />
        <div className="floatingButton">
          <FloatingButton />
        </div>
      </div>
    </>
  );
}

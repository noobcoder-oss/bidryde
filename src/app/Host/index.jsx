"use client";
import React from "react";
import Image from "next/image";
import {
  CssButtonOutline,
  Divider,
  Footer,
  Navbar,
  SectionHeader,
} from "@/Components";
import "./Host.scss";
import { Grid } from "@mui/material";
import { assets } from "@/assets";
import { Form, HostSquareCard } from "./components";
import { uid } from "react-uid";
import FloatingButton from "@/Components/FloatingButton";
import Faq from "./components/Faq";
import Link from "next/link";

const hostImages = {
  hostIntroImage: assets.images.host.hostPageHeroBg,
  decorativeCircle: assets.images.joinWithUs.decorativeCircle,
  clarityFormLine: assets.images.host.clarityFormLine,
  convenienceIcon: assets.images.host.convenienceIcon,
  privacyIcon: assets.images.host.privacyIcon,
  hassleFreeIcon: assets.images.host.hassleFreeIcon,
  hosturcarResponsive: assets.images.host.hosturcarResponsive,
  hostArrow: assets.images.host.hostArrow,
  hosturcarResponsiveMob: assets.images.host.hosturcarResponsiveMob,
  paper: assets.images.host.paper,
  carVerified: assets.images.host.carVerified,
  handsshake: assets.images.host.handsshake,
  verifiedBadge: assets.images.host.verifiedBadge,
};

const features = [
  {
    img: hostImages.convenienceIcon,
    feature: "Convenience",
    description:
      "Your buddy is always with you, except when you are busy doing other chores. We make sure that relation is intact and forever.",
  },
  {
    img: hostImages.privacyIcon,
    feature: "100% Privacy",
    description:
      "Being our partners, we value your privacy. Apart from us no other person will know who you are or your whereabouts.",
  },
  {
    img: hostImages.hassleFreeIcon,
    feature: "Hassle Free",
    description:
      "Service Excellence is what we preach and we make sure you see that. Your buddy will be taken and handed over safe and sound by our delivery partners without any trouble.",
  },
];

function Host() {
  return (
    <>
      <Navbar />
      <div className="hostLayout">
        <div className="left_right_margin"></div>

        <div className="hostIntro">
          <div className="hostIntroLeft">
            <div className="hostIntroHeader">
              <p className="p1">Share your ryde</p>
              <p className="p2">Earn on your terms</p>
            </div>
            <div className="hostIntroIcon">
              <Image src={hostImages.decorativeCircle} alt="decorativeCircle" />
              {/* <Link href="#InterestForm">
                <CssButtonOutline
                  title="Get Started"
                  backgroundColor="#FFFFFF"
                  textColor="#276EBC"
                  margin="0 0.8rem 0 0.8rem"
                  fontSize="1rem"
                  width="130px"
                  height="38px"
                  border="1px solid #276EBC"
                />
              </Link> */}
            </div>
          </div>
          <div className="hostIntroRight">
            <Image src={hostImages.hostIntroImage} alt="hostIntroImage" />
          </div>
        </div>

        <div className="route">
          <div className="hostSectionHeader">
            <h1>Host your Car</h1>
            <p className="p__header__host">Host a car in just 3 simple steps</p>
            <Divider />
          </div>

          <div className="stepsSection">
            <div className="steps">
              <div className="step__">
                <div className="icon__img">
                  <Image
                    alt="paper"
                    className="paper__img"
                    src={hostImages.paper}
                  />
                </div>
                <div className="matter__host">
                  Join us by filling the form <br />
                  and our experts will reach <br /> out for the onboarding
                  process.
                </div>
              </div>

              <div className="step__ step__2">
                <div className="icon__img car__ver">
                  <Image
                    alt="badge"
                    className="verifiedBadge"
                    src={hostImages.verifiedBadge}
                  />
                  <Image
                    alt="paper"
                    className="paper__img"
                    src={hostImages.carVerified}
                  />
                </div>
                <div className="matter__host">
                  After fixing the Appointment, our expert will visit to inspect
                  and install Safety Devices to your Car
                </div>
              </div>

              <div className="step__ step__3">
                <div className="icon__img">
                  <Image
                    alt="handsshake"
                    className="paper__img"
                    src={hostImages.handsshake}
                  />
                </div>
                <div className="matter__host">
                  Upon Confirmation, you will be part of next Generation Host
                  enablement Platform to achieve your Financial Freedom
                </div>
              </div>
            </div>

            <Image
              className="decCircle"
              src={hostImages.decorativeCircle}
              alt="decorative circle"
            />
          </div>
        </div>

        <div className="hformSection">
          <div className="hformSectionLeft">
            <div className="hostIntroIcon">
              <Image
                className="decImg"
                src={hostImages.decorativeCircle}
                alt="decorativeCircle"
              />
            </div>
            <div className="formSectionHeader">
              <p className="p1">Your Car&apos;s New Role</p>
              <p className="p2">Generating Income as a host</p>
            </div>
          </div>
          <div className="form" id="InterestForm">
            <Form />
          </div>
        </div>
        <div className="hostSection2">
          <div className="hostSectionHeader__">
            <h1 className="h1_headr__2">Why host with us?</h1>

            <p className="p__header__host">Trust and security at the core</p>
            <Divider />
          </div>
        </div>
        <div className="hostCardSection">
          <Grid container spacing={5} textAlign="center" direction="row">
            {features.map((item, index) => (
              <Grid key={uid(item)} item xs={12} sm={12} md={4} lg={4}>
                <HostSquareCard
                  img={item.img}
                  feature={item.feature}
                  description={item.description}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <Faq />
        <Footer />
        <div className="floatingButton">
          <FloatingButton />
        </div>
      </div>
    </>
  );
}

export default Host;

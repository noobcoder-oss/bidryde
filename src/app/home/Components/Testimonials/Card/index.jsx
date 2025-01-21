import React from "react";
import Image from "next/image";
import "./Card.scss";
import { assets } from "@/assets";

const Card = ({ data }) => {
  return (
    <div className="testimonialCard">
      {/* Testimonial Icon with overlay */}
      <Image
        src={assets.images.testimonials.testimonialIcon}
        alt="testimonial icon"
        width={75.25}
        height={80.26}
        style={{
          objectFit: "contain",
          position: "absolute",
          //marginTop: '-20px', // Adjusted for overlay effect
          left: "20px",
          width: "46px",
          height: "52px",
          marginTop: "-1.5rem",
        }}
      />

      <div className="testimonialCardContainer" style={{ paddingTop: "60px" }}>
        {/* Add spacing after content */}
        <p className="p-2" style={{ marginBottom: "3rem" }}>
          {data.content}
        </p>

        {/* Profile Section with Image and Name */}
        <div className="testimonialCardContainerProfile">
          <div className="profileImageWrapper">
            <Image
              src={data.avatar}
              alt="avatar"
              width={60.2}
              height={64.21}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h5 className="profileName">{data.name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

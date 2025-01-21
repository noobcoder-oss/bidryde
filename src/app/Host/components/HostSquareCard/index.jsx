import React from "react";

import "./HostSquareCard.css";
import Image from "next/image";

function HostSquareCard({ img, feature, description }) {
  return (
    <div className="">
      <div className="hostCard">
        <div>
          <Image className="image" src={img} alt="logo" />
        </div>
        <div className="hostCardcontainer">
          <h4>{feature}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default HostSquareCard;

import Image from "next/image";
import React from "react";
import "./Card.scss";

const Card = ({ data }) => {
  return (
    <div className="promiseCard">
      <div className="promiseCardContainer">
        <Image src={data.image} alt="Card Image" />
        <div className="promiseCardContainer__Content">
          <p className="promiseCardContainer__ContentTitle">
            {data.overlayContent.title}
          </p>
          {/* {console.log(data.overlayContent.content)} */}
        </div>
        <h3>{data.firstLine}</h3>
        <h3>{data.secondLine}</h3>
        <span className="promiseCardContainer__ContentContent">
          {data.overlayContent.content}
        </span>
      </div>
    </div>
  );
};

export default Card;

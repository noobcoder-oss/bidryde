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
          <span className="">{data.overlayContent.content}</span>
          {console.log(data.overlayContent.content)}
        </div>
        <h3>{data.firstLine}</h3>
        <h3>{data.secondLine}</h3>
      </div>
    </div>
  );
};

export default Card;

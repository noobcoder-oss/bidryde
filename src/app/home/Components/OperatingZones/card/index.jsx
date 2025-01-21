import React from "react";
import "./LocationCard.scss";
import Image from "next/image";

const Card = ({ data, comingSoon }) => {
  return (
    <div className="locationCard">
      <div className="locationCardContainer">
        <Image
          src={data.image}
          alt="location"
          style={{ background: data.bgColor }} 
        />
        <h3>{data.location}</h3>

        {/* {comingSoon ?<p >(Coming Soon)</p>:<div style={{height:'2%'}}
        >  </div> } */}
        <p className= {comingSoon ? "comingSoonStyle" :  "avaliableStyle"}>
        {comingSoon ? `(${comingSoon})` :  "Avaliable"}</p>
      </div>
    </div>
  );
};

export default Card;

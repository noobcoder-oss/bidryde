import Image from 'next/image';
import React from 'react';
import './Card.scss';

const CardNumber = ({ value }) => {
  const numberClass = `digit-${value + 1}`;
  return (
    <h1
      className={`${value % 2 === 0 ? 'translateLeft' : 'translateRight'} ${numberClass}`}
    >
      0{value + 1}
    </h1>
  );
};

const Card = ({ data, index }) => {
  return (
    <div className={`card card-${index + 1} ${index % 2 !== 0 ? 'leftShadow' : 'rightShadow'}`}>
      <div className="cardContainer">
        <CardNumber value={index} />
        <Image src={data.image} alt={`Card Image ${index + 1}`} className={`cardImage cardImage-${index + 1}`} />
        <h6 className={`cardText firstLine firstLine-${index + 1}`}>{data.firstLine}</h6>
        {data.secondLine && <h6 className="cardText secondLine">{data.secondLine}</h6>}
      </div>
    </div>
  );
};


export default Card;

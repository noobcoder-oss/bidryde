import React from 'react'
import "./Card.css"
import Image from 'next/image'

function Card({place,address,img}) {
  return (
    <div className=''>
          <div className="card">
                <div >
                  <Image className="image" src={img} alt="charminar" />
                </div>
                <div className="cardcontainer">
                  <h4>{place}</h4>
                  <p>{address}</p>
                </div>
              </div>
    </div>
  )
}

export default Card
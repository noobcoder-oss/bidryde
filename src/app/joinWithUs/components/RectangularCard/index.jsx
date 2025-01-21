import React from 'react'
import './RectangularCard.scss'
import Image from 'next/image'

function RectangularCard({title, text, illustration, switchDirection}) {
    return (
        <div className={`cardDiv ${switchDirection && 'flexReverse'}`}>
            <div className="image">
                <Image
                    src={illustration}
                    alt="avatar"
                />
            </div>
            <div className="text">
                <p className='heading'>{title}</p>
                <p className='plainText'>{text}</p>
            </div>
        </div>
    )
}

export default RectangularCard
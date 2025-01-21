import { assets } from '@/assets'
import Image from 'next/image'
import React from 'react'
import './NoCarsCard.scss'

function NoCars() {
  return (
    <div className='noCarsContainer'>
        <Image src={assets.images.searchPage.NoCarsImage} alt='no cars found'/>
    </div>
  )
}

export default NoCars
import React from 'react'
import './OperatingZones.scss'
import { Divider } from '@/Components'
import Image from 'next/image'
import { assets } from '@/assets'
import Card from './card'
import { uid } from 'react-uid'

const zonesInfo = [
  {
    image: assets.images.operatingZones.hyderabad,
    location: "Hyderabad",
    bgColor: "#96C9FF"
  },
  {
    image: assets.images.operatingZones.bengaluru,
    location: "Bengaluru",
    bgColor: "#FFFDC8"
  },
  {
    image: assets.images.operatingZones.chennai,
    location: "Chennai",
    bgColor: "#FFFDC8"
  },
]

const OperatingZones = () => {
  return (
    <div className='operatingZones'>
      <div className='operatingZonesContainer'>
        <div className='SectionTitle'>
          <h1>Operating Zones</h1>
          <p>Where You&apos;ll Find Us</p>
          <Divider />
        </div>
        <div className='operatingZonesContainerContent'>
          <div className='operatingZonesContainerContentBG'>
            <Image src={assets.images.operatingZones.roadBg} alt='Location Pin' />
          </div>
          <div className='operatingZonesContainerContentLocation'>
            <Image src={assets.images.operatingZones.locationPin} alt='Location Pin' />
          </div>
          <div className='operatingZonesContainerContentCards'>
            {/* {
              zonesInfo.map((zone, index) => (
                <Card key={uid(zone)} data={zone} />
              ))
            } */}

            <span className='card__1'>
              <Card data={zonesInfo[0]} />
            </span>
            
            <span className='card__2__3'>
              <Card data={zonesInfo[1]} comingSoon={"Available Soon"}/>
              <Card data={zonesInfo[2]} comingSoon={"Available Soon"}/>
            </span>
            
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperatingZones
import React from 'react'
import './FilterIcon.scss'
import Image from 'next/image'
import { Title } from '@mui/icons-material'

function FilterIcon({imgIcon, title, selected, onClick, isNotZero}) {
  return (
    <div className={`FilterIconLayout ${selected && `selected`} ${isNotZero && `reduceSize`}`} onClick={onClick}>
        <Image src={imgIcon} alt={title}/>
        <p>{title}</p>
    </div>
  )
}

export default FilterIcon
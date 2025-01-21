import React from 'react'
import './SectionHeader.css'

/**
 * 
 *
 * alignRight - Boolean : alignes the header to right of the page
 * dark - Boolean : Makes the title and tagline color to white
 */

function SectionHeader({ title, tagLine, children, alignRight, center, dark }) {
    return (
        <div className={`sectionHeaderWrapper ${alignRight && `alignRight`} ${center && 'center'}`}>
            {
                children &&
                <div>
                    {children}
                </div>
            }
            <div>
                <p className={`sectionTitleTextStyling  ${dark && `themeDark`}`}>{title}</p>
                <p className={`tagLinesTextStyling ${dark && `themeDark`}` }>{tagLine}</p>
                <div className='yellowLine'>
                    <div className='dot' />
                    <div className='line' />
                    <div className='dot' />
                </div>
            </div>
        </div>
    )
}

export default SectionHeader
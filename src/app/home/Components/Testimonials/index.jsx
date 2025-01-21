import React from 'react';
import { uid } from 'react-uid';
import { Divider } from '@/Components';
import './Testimonials.scss';
import Card from './Card';
import { assets } from '@/assets';


const testimonialsInfo = [
  {
    name: "Priya S, Hyderabad",
    content: "Booked a car for a family trip which was very comfortable and in great condition",
    avatar: assets.images.testimonials.sofia,
  },
  {
    name: "Rahul K, Hyderabad",
    content: "Booked a car for a family trip which was very comfortable and in great condition",
    avatar: assets.images.testimonials.arthim,
  },
  {
    name: "Aisha R, Hyderabad",
    content: "Booked a car for a family trip which was very comfortable and in great condition",
    avatar: assets.images.testimonials.sofia,
  },
];

const Testimonials = () => {
  return (
    <div className='testimonials'>
      <div className='testimonialsContainer'>
        <div className='SectionTitle'>
          <h1>Testimonials</h1>
          <p>Behind the Wheel, Behind the Words</p>
          <Divider />
        </div>
        <div className='testimonialsContainerCards'>
          {testimonialsInfo.map((testimonial) => (
            <Card data={testimonial} key={uid(testimonial)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

import React from 'react';
import Searchbar from './Components/Searchbar';
import { Divider, Footer, Navbar } from '@/Components';
import './faq.scss';
import { assets } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import FloatingButton from "@/Components/FloatingButton"; // Ensure the import is correct

const faqOptions = [
  {
    title: "General",
    icon: assets.images.faqPage.generalCar,
    link: "general"
  },
  {
    title: "Bid Help",
    icon: assets.images.faqPage.BidHelp,
    link: 'bidHelp'
  },
  {
    title: "Trip Help",
    icon: assets.images.faqPage.TripIcon,
    link: 'tripHelp'
  },
  {
    title: "Delivery & Collection",
    icon: assets.images.faqPage.DeliveryCollection,
    link: 'deliveryCollection'
  },
  {
    title: "Account Help",
    icon: assets.images.faqPage.accountHelp,
    link: 'accountHelp'
  },
  {
    title: "Payment & Charges",
    icon: assets.images.faqPage.PaymentCharges,
    link: "paymentCharges"
  },
  {
    title: "Host a car",
    icon: assets.images.faqPage.HostCar,
    link: "hostCar"
  },
];

const Faq = () => {
  return (
    <>
      <Navbar />
      <div className="faqPage">
        <div className="faqPageContainer">
          <div className="faqHeader">
            <div className="titleContainer">
              <div className="title">FAQ&apos;s</div>
              <div className="subtitle">On the road to answers</div>
              <Divider />
            </div>
            <div className="searchField">
              <Searchbar suggestions={faqOptions} />
            </div>
          </div>

          <div className="faqOptions">
            {faqOptions.map((faq, index) => (
              <Link href={"faq/" + faq.link} key={index}>
                <div className="faqOptionCard">
                  <p>{faq.title}</p>
                  <Image src={faq.icon} alt="faq Option" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
<div className='buttonn'>
      {/* FloatingButton component */}
      <FloatingButton />
      </div>
    </>
  );
};

export default Faq;

"use client";
import React, { useState } from "react";
import "./Faq.scss";
import { CollapsiblePanel, CssButtonOutline, Divider } from "@/Components";
import { assets } from "@/assets";
import Image from "next/image";
import { uid } from "react-uid";
import { useRouter } from "next/navigation";

const faqs = [
  {
    name: "General",
    icon: assets.images.faq.faqGeneralCategoryIcon,
    questions: [
      {
        header: "What is bidryde?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "What types of vehicle does Bidryde provide?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "Do the vehicles have manual or automatic transmission?",
        content: "Best car rentals at affordable price",
      },
    ],
  },
  {
    name: "Bid",
    icon: assets.images.faq.faqBidCategoryIcon,
    questions: [
      {
        header: "What is bidryde?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "What types of vehicle does Bidryde provide?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "Do the vehicles have manual or automatic transmission?",
        content: "Best car rentals at affordable price",
      },
    ],
  },
  {
    name: "Trip",
    icon: assets.images.faq.faqTripCategoryIcon,
    questions: [
      {
        header: "What is bidryde?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "What types of vehicle does Bidryde provide?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "Do the vehicles have manual or automatic transmission?",
        content: "Best car rentals at affordable price",
      },
    ],
  },
  {
    name: "Account",
    icon: assets.images.faq.faqAccountCategoryIcon,
    questions: [
      {
        header: "What is bidryde?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "What types of vehicle does Bidryde provide?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "Do the vehicles have manual or automatic transmission?",
        content: "Best car rentals at affordable price",
      },
    ],
  },
  {
    name: "Delivery & Collection",
    icon: assets.images.faq.faqDeliveryCategoryIcon,
    questions: [
      {
        header: "What is bidryde?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "What types of vehicle does Bidryde provide?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "Do the vehicles have manual or automatic transmission?",
        content: "Best car rentals at affordable price",
      },
    ],
  },
  {
    name: "Payment & Charges",
    icon: assets.images.faq.faqPaymentCategoryIcon,
    questions: [
      {
        header: "What is bidryde?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "What types of vehicle does Bidryde provide?",
        content: "Best car rentals at affordable price",
      },
      {
        header: "Do the vehicles have manual or automatic transmission?",
        content: "Best car rentals at affordable price",
      },
    ],
  },
];

const Faq = () => {
  const [questions, setQuestions] = useState(faqs[0].questions);
  const [activeChip, setActiveChip] = useState("General");
  const router = useRouter();

  const handleFaqChange = (faq) => {
    setActiveChip(faq.name);
    setQuestions(faq.questions);
  };

  const handleViewAllClick = () => {
    router.push("/host-faq");
  }

  return (
    <div className="faq">
      <div className="faqContainer">
        <div className="SectionTitle">
          <h1>FAQ&apos;s</h1>
          <p>On the road to answers</p>
          <Divider />
        </div>
        {/* TODO: This section to move into the new seperate FAQ page */}
        {/* <div className='faqContainerCategories'>
          {
            faqs.map((faq) => (
              <div className={`faqChip ${activeChip === faq.name ? 'active' : ''}`} key={uid(faq)} onClick={() => handleFaqChange(faq)}>
                <Image src={faq.icon} alt={faq.name} />
                <p>{faq.name}</p>
              </div>
            ))
          }
        </div> */}
        <div className="faqContainerQuestions">
  {questions.map((question) => (
    <CollapsiblePanel 
      data={question} 
      key={uid(question)} 
      bgColor="White" // Set background color to white on Home page
    />
  ))}
</div>


        

              
          <button onClick={handleViewAllClick} className="btn__FAQ">View All</button>
            {/* <CssButtonOutline
              title=""
              backgroundColor="#FFFFFF"
              textColor="#276EBC"
              margin="2rem 1rem"
              padding="10px 30px"
              fontSize="1rem"
              border="1px solid #276EBC"
              onClick={handleViewAllClick}
            /> */}
        
      </div>
    </div>
  );
};

export default Faq;

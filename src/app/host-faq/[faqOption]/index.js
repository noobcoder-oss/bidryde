"use client";
import { CollapsiblePanel, Divider, Footer, Navbar } from "@/Components";
import React, { useEffect, useState } from "react";
import "./FaqOption.scss";
import { uid } from "react-uid";
import { getFAQ } from "@/utils/faq_handler";
import FloatingButton from "@/Components/FloatingButton";
import Link from "next/link"; // Import for navigation to Faq

const FaqOption = ({ params }) => {
  const [faqData, setfaqData] = useState([]);

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    const option = params.faqOption;
    setfaqData(getFAQ(option));
  }, []);

  return (
    <div className="faqOption">
      <Navbar />
      <div className="faqOptionContainer">
        {/* Heading with breadcrumb and title */}
        <h1 className="faqHeading">
          <Link href="/faq">
            <span className="breadcrumb">FAQ&apos;s &gt;</span>
          </Link>
          <span className="pageTitle">{capitalize(params.faqOption)}</span>
        </h1>
        <div className="faqOptionContainerQuestions">
          {faqData.map((question) => (
            <div className="colored_Item" key={uid(question)}>
              <CollapsiblePanel data={question} />
            </div>
          ))}
        </div>
        <div className="floatingButton">
          <FloatingButton />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqOption;

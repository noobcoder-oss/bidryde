'use client'
import React,{useState,useEffect} from "react";

import PropTypes from "prop-types";
import "./SearchPageHeading.scss";

const SearchPageHeading = ({ icon, title, description }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
   

    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 650;
      setIsMobile(isMobileDevice);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      
    };

    
  }, []);
  return (
    <div className="infoCard">
      <div className="titleContainer">
        <div className="miniContainer">
          <div className="iconContainer">{ icon}</div>
          <div className="title">{title}</div>
        </div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

SearchPageHeading.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SearchPageHeading;

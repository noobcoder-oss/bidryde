import React from "react";

import PropTypes from "prop-types";
import "./SearchPageHeadingHome.scss";

const SearchPageHeadingHome = ({ icon, title, description, maskDescColor }) => {
  return (
    <div className="infoCardHome">
      <div className="titleContainerHome">
        <div className="miniContainerHome">
          <div className="iconContainerHome">{icon}</div>
          <div className="titleHome">{title}</div>
        </div>
        <div className={`descriptionHome${maskDescColor ? " maskedColorHome" : ""}`}>{description}</div>
      </div>
    </div>
  );
};

SearchPageHeadingHome.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.element.isRequired,
};

export default SearchPageHeadingHome;

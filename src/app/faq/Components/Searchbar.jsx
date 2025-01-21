"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.scss";
import Link from "next/link";

const Searchbar = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInputValue(input);

    const filtered = input
      ? suggestions.filter((option) =>
          option.title.toLowerCase().startsWith(input.toLowerCase())
        )
      : [];

    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.title);
    setFilteredSuggestions([]);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="searchbar">
        <SearchIcon />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search your requests"
        />
      </div>
      {filteredSuggestions.length > 0 && (
        <ul className="suggestionList">
          {filteredSuggestions.map((option, index) => (
            <Link href={"faq/" + option.link} key={index}>
              <li key={index} onClick={() => handleSuggestionClick(option)}>
                {option.title}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;

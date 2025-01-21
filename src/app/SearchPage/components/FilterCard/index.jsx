import React from "react";
import "./FilterCard.scss";
import FilterIcon from "../FilterIcon";

function FilterCard({ title, filters, handleOnTapCarsTypes, selectedFilters, isNotZero }) {


  return (
    <div className="filterCard"><p  className="filterCardTitle" >{title}</p>
      <div className="filterCardLayout">
        <div className="filterIconGrid">
          {filters.map((item) => {
            const isSelected = selectedFilters.includes(item.title.toLowerCase());
            return (
              <FilterIcon
                imgIcon={item.icon}
                title={item.title}
                selected={isSelected}
                onClick={() => handleOnTapCarsTypes(item.title.toLowerCase())}
                key={item.title}
                isNotZero={isNotZero}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterCard;

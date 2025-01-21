"use client";

import React, { useState } from "react";
import "./CollapsiblePanel.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FaMinusSquare } from "react-icons/fa";
import { Collapse } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

function CollapsiblePanel({ data, bgColor = "#F6F1F1" }) {
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <div
      className={`collapsiblePanel colored_Item ${isCollapse ? "open" : ""}`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="collapsiblePanel__header">
        <div
          className="collapsiblePanel__headerleft"
          onClick={() => setIsCollapse(!isCollapse)}
          role="button"
          tabIndex="0"
        >
          <h3>{data.header}</h3>
          {isCollapse ? (
            <FaMinusSquare
              style={{ color: "#276EBC", fontSize: "20px", marginRight: "0.2%" }}
            />
          ) : (
            <AddBoxIcon sx={{ color: "#276EBC" }} />
          )}
        </div>
      </div>
      <div className="collapsiblePanel__content">
        <Collapse in={isCollapse} timeout={1000}>
          {data.content && <p>{data.content}</p>}
          {data.component && data.component}
        </Collapse>
      </div>
    </div>
  );
}

export default CollapsiblePanel;

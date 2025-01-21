"use client";
import React, { useState } from "react";
import "./Form.scss";
import { CssButtonSolid } from "@/Components";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    jobTitle: "",
    businessName: "",
    contactNo: "",
    email: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = Object.values(formData).every(
      (field) => field.trim() !== ""
    );

    if (isFormValid) {
      console.log("Form submitted:", formData);

      setFormData({
        firstName: "",
        jobTitle: "",
        businessName: "",
        contactNo: "",
        email: "",
      });
      setFormSubmitted(true);
    } else {
      setError("Please fill in all mandatory fields.");
      console.error("Please fill in all mandatory fields.");
    }
  };

  return (
    <div className="formDiv">
      
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <br />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Job Title:
          <br />
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Business Name:
          <br />
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Contact No:
          <br />
          <input
            type="tel"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Email:
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>

        <CssButtonSolid
          title="Connect"
          backgroundColor="#276EBC"
          textColor="#fff"
          fontSize="1rem"
          width="100%"
          height="45px"
          border="1px solid #276EBC"
        //   onClick={() => handleBecomeHost(false)}
        />
        {formSubmitted ? (
          <p>Form submitted successfully!</p>
        ) : (
          error && <p>{error}</p>
        )}
      </form>
    </div>
  );
}

export default Form;

"use client";
import React, { useState } from 'react'
import './Form.css'

function Form() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isFormValid = Object.values(formData).every((field) => field.trim() !== '');

        if (isFormValid) {
            console.log('Form submitted:', formData);

            setFormData({
                fullName: '',
                email: '',
                phone: '',
                city: '',
            });
            setFormSubmitted(true);
        } else {
            setError("Please fill in all mandatory fields.")
            console.error('Please fill in all mandatory fields.');
        }
    };

    return (
        <div className='hformDiv'>
            <form onSubmit={handleSubmit} className='hForm'>
                <p className="hFormHeading">Submit Your interest</p>
                <label>
                    Full Name<br />
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="hinput"
                    />
                </label>

                <label>
                    Email<br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="hinput"
                    />
                </label>

                <label>
                    Phone<br />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="hinput"
                    />
                </label>

                <label>
                    City<br />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="hinput"
                    />
                </label>

                <button type="submit">Submit</button>
                {
                    formSubmitted ? <p>Form submitted successfully!</p> :
                        (error && <p>{error}</p>)
                }
            </form>

        </div>
    )
}

export default Form
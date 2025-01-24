"use client";
import React, { useState } from "react";
import { DateRange, defaultStaticRanges } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import "./LocationDateTimePickerHome.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CssButtonOutline, CssButtonSolid } from "../CssButton";
import { Divider, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { useEffect } from "react";
import SearchPageHeadingHome from "../SearchPageHeadingHome";
import { getLatLong, getLocations } from "@/app/SearchPage/utils/utils";
import { Black_And_White_Picture } from "next/font/google";
import { toast } from "react-toastify";

import { setCookie } from "cookies-next";

const SLIDER_MARKS = {
  0: "12:00 AM",
  1: "1:00 AM",
  2: "2:00 AM",
  3: "3:00 AM",
  4: "4:00 AM",
  5: "5:00 AM",
  6: "6:00 AM",
  7: "7:00 AM",
  8: "8:00 AM",
  9: "9:00 AM",
  10: "10:00 AM",
  11: "11:00 AM",
  12: "12:00 PM",
  13: "1:00 PM",
  14: "2:00 PM",
  15: "3:00 PM",
  16: "4:00 PM",
  17: "5:00 PM",
  18: "6:00 PM",
  19: "7:00 PM",
  20: "8:00 PM",
  21: "9:00 PM",
  22: "10:00 PM",
  23: "11:00 PM",
};

const BUFFER_TIME = 2;
const MIN_RENTAL_TIME = 12;

const LocationDateTimePickerHome = ({ actionHandler }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [gap, setGap] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  const getValidDate = (d, type) => {
    if (type == "start") {
      if (d.getHours() + BUFFER_TIME >= 22) {
        return new Date(d.setDate(d.getDate() + 1));
      } else {
        return d;
      }
    } else {
      if (d.getHours() + BUFFER_TIME + MIN_RENTAL_TIME >= 22) {
        return new Date(d.setDate(d.getDate() + 1));
      } else {
        return d;
      }
    }
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [tempDateRange, setTempDateRange] = useState(null);

  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);

  const handleDateRangeSelect = (ranges) => {
    if (
      startTime > endTime &&
      ranges.selection.startDate.getDate() == ranges.selection.endDate.getDate()
    ) {
      var d = ranges.selection.endDate;
      ranges.selection.endDate = new Date(d.setDate(d.getDate() + 1));
    }
    setTempDateRange([ranges.selection]);
  };

  const handleDateOpen = () => {
    setShowPicker(true);
  };

  const handleDateClose = () => {
    if (
      !dateRange[0].startDate ||
      !dateRange[0].endDate ||
      !startTime ||
      !endTime
    ) {
      toast.info(
        "Please select a date and time for  both pickup and drop off.",
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "light",
        }
      );
      return;
    }
    if (tempDateRange) {
      setDateRange(tempDateRange);
      setTempDateRange(null);
    }
    setIsDateTimeSelected(true);
    setShowPicker(false);
  };

  const handleDateTimeCancel = () => {
    setTempDateRange(null);
    setShowPicker(false);
  };

  const getTimefromSlider = (index) => {
    return SLIDER_MARKS[index];
  };

  const formatDate = (date, type) => {
    var timestamp = null;
    if (type === "start") {
      timestamp = getTimefromSlider(startTime);
    } else {
      timestamp = getTimefromSlider(endTime);
    }

    return (
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) +
      ", " +
      timestamp
    );
  };

  const handleSliderChange = (value, type) => {
    var dateRangeHolder = null;
    if (tempDateRange) {
      dateRangeHolder = tempDateRange;
    } else {
      dateRangeHolder = dateRange;
    }
    if (type == "start") {
      if (
        dateRangeHolder[0].startDate.getDate() === new Date().getDate() &&
        value < new Date().getHours() + BUFFER_TIME
      ) {
        setStartTime(new Date().getHours() + BUFFER_TIME);
        return;
      } else {
        setStartTime(value);
      }

      if (
        dateRangeHolder[0].startDate.getDate() ===
          dateRangeHolder[0].endDate.getDate() &&
        value - endTime < MIN_RENTAL_TIME
      ) {
        if (value + MIN_RENTAL_TIME > 21) {
          setTempDateRange([
            {
              startDate: getValidDate(new Date(), "start"),
              endDate: getValidDate(new Date(), "end"),
              key: "selection",
            },
          ]);
        }
        // setEndTime((value + MIN_RENTAL_TIME) % 23);
      } else if (23 - value + endTime < MIN_RENTAL_TIME) {
        setEndTime(value - 11);
      }
    } else {
      if (
        dateRangeHolder[0].startDate === dateRangeHolder[0].endDate &&
        startTime - value < MIN_RENTAL_TIME
      ) {
        if (value - MIN_RENTAL_TIME > 0) setStartTime(value - MIN_RENTAL_TIME);
      } else if (value + 23 - startTime < MIN_RENTAL_TIME) {
        setEndTime(MIN_RENTAL_TIME - (23 - startTime));
        return;
      }
      setEndTime(value);
    }
  };

  const handleSliderTooltip = (value) => {
    return `${value}:00`;
  };

  const getSlideMarks = (type) => {
    const marks = {};
    if (type == "start") {
      marks[startTime] = SLIDER_MARKS[startTime];
    } else {
      marks[endTime] = SLIDER_MARKS[endTime];
    }
    return marks;
  };

  const getMaxDate = () => {
    var d = new Date();
    return new Date(d.setMonth(d.getMonth() + 3));
  };

  const getMinDate = () => {
    var d = new Date();
    if (d.getHours() + BUFFER_TIME >= 24) {
      return new Date(d.setDate(d.getDate() + 1));
    }
    return new Date();
  };

  // Location related notice point
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const [location, setLocation] = useState(null);

  const handleLocationOpen = () => {
    setShowLocationPicker(true);
  };

  const handleLocationClose = () => {
    if (city === "Bangalore" || city === "Chennai") {
      // Don't close the modal if Bangalore or Chennai is selected
      toast.info(`${city} will be live soon.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      });
      return; // Prevent closing the modal for Bangalore and Chennai
    }
    setIsLocationSelected(true);
    setShowLocationPicker(false);
  };

  const handleLocationCancel = () => {
    setShowLocationPicker(false);
  };

  const CitiesList = ["Hyderabad", "Bangalore", "Chennai"];
  const AreasList = getLocations();

  const [city, setCity] = useState(CitiesList[0]);
  const [area, setArea] = useState(AreasList[0]);

  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleGetCar = async () => {
    if (!isDateTimeSelected) {
      toast.info("Please select valid date and time", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    if (!isLocationSelected) {
      toast.info("Please select valid location", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    setIsLoading(true); // Start loader

    try {
      // Simulate an API call or loading process
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulates a 5-second delay
      console.log("Search completed!");

      // Navigate to SearchPage after loading
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false); // Stop loader
    }

    // Function to convert UTC Date to IST
    function convertToIST(date) {
      const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hours and 30 minutes in milliseconds
      return new Date(date.getTime() + istOffset);
    }

    // Fetching parameters
    var fetchCarParams = {
      city: city,
      dateObj: dateRange.map((date) => ({
        startDate: convertToIST(date.startDate).toISOString(), // Convert to IST and to ISO string
        endDate: convertToIST(date.endDate).toISOString(), // Convert to IST and to ISO string
        key: date.key,
      })),
      areaLocation: area,
      e_time: endTime,
      s_time: startTime,
    };

    // Setting the cookie
    setCookie("carSearchParams", JSON.stringify(fetchCarParams)); // Store as string
    //console.log("Stored fetchCarParams in cookie:", fetchCarParams);

    actionHandler(fetchCarParams);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 1180;
      const iphone = window.innerWidth > 400 ? "58px" : "26px";
      setIsMobile(isMobileDevice);
      setGap(iphone);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="homeMainContainer">
      <div className="homeLocationDateContainer">
        <div className="homelocationMainContainer">
          <div onClick={handleLocationOpen} style={{ cursor: "pointer" }}>
            <SearchPageHeadingHome
              icon={<LocationOnIcon fontSize="small" color="primary" />}
              title="Location"
              description={
                isLocationSelected ? (
                  <div>
                    {" "}
                    {area}, {city}
                  </div>
                ) : (
                  <div>Select Location</div>
                )
              }
              maskDescColor={!isLocationSelected}
            />
          </div>

          <Modal
            open={showLocationPicker}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 16px", // Add padding for small screens
            }}
          >
            <div
              className="homeLocationOptionsContainer"
              style={{
                width: "100%",
                maxWidth: "500px", // Limit modal width for larger screens
                background: "#fff",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  padding: "0 10%",
                }}
              >
                <InputLabel
                  htmlFor="city"
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    color: "#000000", // Black color for label text
                    fontSize: "1rem",
                  }}
                >
                  Select City
                </InputLabel>

                {/* Select Component */}
                <Select
                  id="city"
                  value={city}
                  onChange={handleCityChange}
                  IconComponent={(props) => (
                    <div
                      {...props}
                      style={{
                        position: "relative",
                        marginLeft: "10px",
                        marginRight: "10px",
                        width: "16px",
                        height: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderTop: "10px solid #276EBC",
                          borderRadius: "5px 5px 0 0",
                        }}
                      />
                    </div>
                  )}
                  sx={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                >
                  {CitiesList.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div>
                <InputLabel
                  htmlFor="area"
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    color: "#000000",
                    fontSize: "1rem",
                  }}
                >
                  Select Area
                </InputLabel>

                {/* Select Component */}
                <Select
                  id="area"
                  value={area}
                  onChange={handleAreaChange}
                  IconComponent={(props) => (
                    <div
                      {...props}
                      style={{
                        position: "relative",
                        marginLeft: "15px",
                        marginRight: "15px",
                        marginTop: "7px",
                        width: "20px",
                        height: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderTop: "10px solid #276EBC",
                          borderRadius: "3px 3px 0 0",
                        }}
                      />
                    </div>
                  )}
                  sx={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                >
                  {AreasList.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div
                className="homeModalButtonContainer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px", // Space between buttons
                  marginTop: "1.5rem",
                }}
              >
                <CssButtonOutline
                  title="Cancel"
                  backgroundColor="#FFFFFF"
                  textColor="#276EBC"
                  fontSize="1rem"
                  width="80px"
                  height="38px"
                  fontWeight="normal"
                  border="1px solid #276EBC"
                  onClick={() => handleLocationCancel()}
                />
                <CssButtonSolid
                  title="Okay"
                  backgroundColor="#276EBC"
                  textColor="#fff"
                  fontSize="0.8rem"
                  fontWeight="normal"
                  width="80px"
                  height="38px"
                  border="1px solid #276EBC"
                  onClick={() => handleLocationClose()}
                />
              </div>
            </div>
          </Modal>
        </div>
        <div className="homeTimeMainContainer">
          <Modal
            open={showPicker}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                zIndex: 1000,
                backgroundColor: "#ffffff",
                boxShadow: "1px 1px 1px 1px #EFEFEF",
                borderRadius: "10px",
                padding: "2%",
                // height: isMobile ? "90vh" : "80vh",
                maxHeight: "1000px",
                overflowY: "scroll",
                width: isMobile ? "90%" : "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <DateRange
                  ranges={tempDateRange || dateRange}
                  onChange={handleDateRangeSelect}
                  staticRanges={defaultStaticRanges}
                  showMonthAndYearPickers={true}
                  minDate={getMinDate()}
                  maxDate={getMaxDate()}
                  months={isMobile ? 1 : 3}
                  direction="horizontal"
                  color="#276ebc"
                  startDatePlaceholder="Start Date"
                  endDatePlaceholder="End Date"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    margin: "10px",
                    gap: isMobile ? "20px" : "50px",
                    marginTop: "30px", // Added more space between calendar and sliders
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      fontFamily: "Archivo",
                      fontWeight: "bold",
                    }}
                  >
                    <label>Start Time</label>
                    <Slider
                      min={0}
                      max={24}
                      value={startTime}
                      step={1}
                      onChange={(value) => handleSliderChange(value, "start")}
                      tipFormatter={handleSliderTooltip}
                      marks={getSlideMarks("start")}
                      style={{ margin: "2% 0" }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      fontFamily: "Archivo",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    <label>End Time</label>
                    <Slider
                      min={0}
                      max={23}
                      value={endTime}
                      step={1}
                      onChange={(value) => handleSliderChange(value, "end")}
                      tipFormatter={handleSliderTooltip}
                      marks={getSlideMarks("end")}
                      style={{ margin: "2% 0" }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px", // Increased margin top
                  marginBottom: "20px", // Added margin bottom
                  gap: "1rem",
                }}
              >
                <CssButtonOutline
                  title="Cancel"
                  backgroundColor="#FFFFFF"
                  textColor="#276EBC"
                  margin="0"
                  fontSize="1rem"
                  width="100px"
                  height="38px"
                  border="1px solid #276EBC"
                  onClick={() => handleDateTimeCancel()}
                />
                <CssButtonSolid
                  title="Okay"
                  backgroundColor="#276EBC"
                  textColor="#FFFFFF"
                  fontSize="0.8rem"
                  width="100px"
                  height="38px"
                  border="1px solid #276EBC"
                  onClick={() => handleDateClose()}
                />
              </div>
            </div>
          </Modal>

          <div
            onClick={handleDateOpen}
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <SearchPageHeadingHome
              icon={
                isMobile ? null : (
                  <WatchLaterIcon fontSize="small" color="primary" />
                )
              }
              title={isMobile ? "" : "Date & Time"}
              description={
                isMobile ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      gap: gap,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <WatchLaterIcon
                        fontSize="small"
                        color="primary"
                        style={{ marginRight: "8px" }}
                      />
                      {isDateTimeSelected
                        ? formatDate(dateRange[0].startDate, "start")
                        : "Start Time"}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <WatchLaterIcon
                        fontSize="small"
                        color="primary"
                        style={{ marginRight: "8px" }}
                      />
                      {isDateTimeSelected
                        ? formatDate(dateRange[0].endDate, "end")
                        : "End Time"}
                    </div>
                  </div>
                ) : isDateTimeSelected ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>{formatDate(dateRange[0].startDate, "start")}</span>
                    <ArrowForwardIcon
                      color="primary"
                      fontSize="small"
                      style={{ margin: "0 12px" }}
                    />
                    <span>{formatDate(dateRange[0].endDate, "end")}</span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <span>Start Time</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ArrowForwardIcon
                        color="primary"
                        fontSize="small"
                        style={{ margin: "0 20px" }}
                      />
                      <span>End Time</span>
                    </div>
                  </div>
                )
              }
              maskDescColor={!isDateTimeSelected}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssButtonSolid
          title={isMobile ? "Get your Car" : "Search Cars"}
          backgroundColor="#276EBC"
          textColor="#FFFFFF"
          fontSize="1rem"
          width={isMobile ? "280px" : "200px"}
          height="50px"
          border="1px solid #276EBC"
          onClick={handleGetCar}
          className="homeGetCarButton"
        />
      </div>
    </div>
  );
};

export default LocationDateTimePickerHome;

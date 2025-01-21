import React, { useState } from "react";
import { DateRange, defaultStaticRanges } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import "./LocationDateTimePicker.scss";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

import { CssButtonOutline, CssButtonSolid } from "../CssButton";
import { Divider, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { useEffect } from "react";

import SearchPageHeading from "../SearchPageHeading";
import { getLatLong, getLocations } from "@/app/SearchPage/utils/utils";
import { useRouter } from "next/navigation";

import { setCookie, getCookie } from "cookies-next";

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

const BUFFER_TIME = 3;
const MIN_RENTAL_TIME = 8;

const LocationDateTimePicker = ({ actionHandler }) => {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [tempStartTime, setTempStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [tempEndTime, setTempEndTime] = useState(null);

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
    if (tempDateRange && tempDateRange.length > 0) setDateRange(tempDateRange);
    if (tempStartTime) setStartTime(tempStartTime);
    if (tempEndTime) setEndTime(tempEndTime);
    setTempDateRange(null);
    setTempStartTime(null);
    setTempEndTime(null);
    setShowPicker(false);
  };

  const handleDateCancel = () => {
    setTempDateRange(null);
    setTempStartTime(null);
    setTempEndTime(null);
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
      new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
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
        new Date(dateRangeHolder[0].startDate).getDate() ===
          new Date().getDate() &&
        value < new Date().getHours() + BUFFER_TIME
      ) {
        setTempStartTime(new Date().getHours() + BUFFER_TIME);
      } else {
        setTempStartTime(value);
      }

      if (
        new Date(dateRangeHolder[0].startDate).getDate() ===
          new Date(dateRangeHolder[0].endDate).getDate() &&
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
        setTempEndTime(value + MIN_RENTAL_TIME);
      } else if (21 - value + endTime < MIN_RENTAL_TIME) {
        setTempEndTime(value - 16);
      }
    } else {
      if (
        dateRangeHolder[0].startDate === dateRangeHolder[0].endDate &&
        startTime - value < MIN_RENTAL_TIME
      ) {
        if (value - MIN_RENTAL_TIME > 0)
          setTempStartTime(value - MIN_RENTAL_TIME);
      }
      setTempEndTime(value);
    }
  };

  const handleSliderTooltip = (value) => {
    return `${value}:00`;
  };

  const getSlideMarks = (type) => {
    const marks = {};
    if (type == "start") {
      if (tempStartTime) {
        marks[tempStartTime] = SLIDER_MARKS[tempStartTime];
      } else {
        marks[startTime] = SLIDER_MARKS[startTime];
      }
    } else {
      if (tempEndTime) {
        marks[tempEndTime] = SLIDER_MARKS[tempEndTime];
      } else {
        marks[endTime] = SLIDER_MARKS[endTime];
      }
    }
    return marks;
  };

  const getMaxDate = () => {
    var d = new Date();
    return new Date(d.setMonth(d.getMonth() + 2));
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

  const handleLocationOpen = () => {
    setShowLocationPicker(true);
  };

  const handleLocationClose = () => {
    setArea(temparea);
    setTempArea(null);
    setShowLocationPicker(false);
  };

  const handleLocationCancel = () => {
    setTempArea(null);
    setShowLocationPicker(false);
  };

  const [city, setCity] = useState(null);
  const [area, setArea] = useState(null);
  const [temparea, setTempArea] = useState(null);

  const CitiesList = ["Hyderabad", "Bangalore", "Chennai"];
  const AreasList = getLocations();

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleAreaChange = (event) => {
    setTempArea(event.target.value);
  };

  const handleGetCar = () => {
    if (area === "Please select Area") {
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

    const [latittude, longitude] = getLatLong(area);
    var fetchCardParamsObj = {
      hub: area,
      enddate: `${new Date(dateRange[0].endDate)
        .toISOString()
        .slice(0, 10)} ${endTime}:00:00.000`,
      startdate: `${new Date(dateRange[0].startDate)
        .toISOString()
        .slice(0, 10)} ${startTime}:00:00.000`,
    };

    // Function to convert UTC Date to IST
    function convertToIST(input) {
      let date;

      // Convert input to a Date object
      if (input instanceof Date) {
        date = input; // Already a Date object
      } else if (typeof input === "string" || typeof input === "number") {
        date = new Date(input); // Parse strings or timestamps
      } else {
        throw new TypeError(
          "Invalid input: Expected a Date object, string, or number"
        );
      }

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        throw new TypeError("Invalid date: Unable to parse the provided input");
      }

      // IST offset: 5 hours 30 minutes
      const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
      return new Date(date.getTime() + istOffset);
    }

    // Create the localStorage object with converted dates
    var localStorageObj = {
      city: area,
      dateObj: dateRange.map((date) => ({
        startDate: convertToIST(date.startDate).toISOString(), // Convert to IST and to ISO string
        endDate: convertToIST(date.endDate).toISOString(), // Convert to IST and to ISO string
        key: date.key,
      })),
      areaLocation: area,
      e_time: endTime,
      s_time: startTime,
    };

    // Save to localStorage
    localStorage.setItem("carSearchParams", JSON.stringify(localStorageObj)); // Store as string
    console.log("Stored localStorageObj:", localStorageObj);
    actionHandler(localStorageObj);
  };

  useEffect(() => {
    const temp = getCookie("carSearchParams");
    var paramsProp = JSON.parse(temp);

    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 650;
      setIsMobile(isMobileDevice);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    if (paramsProp) {
      setCity(paramsProp.city);
      setArea(paramsProp.areaLocation);
      setStartTime(paramsProp.s_time);
      setEndTime(paramsProp.e_time);
      setDateRange([...paramsProp.dateObj]);
    } else {
      setDateRange([
        {
          startDate: getValidDate(new Date(), "start"),
          endDate: getValidDate(new Date(), "end"),
          key: "selection",
        },
      ]);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mainContainer">
      <div className="locationMainContainer">
        <div onClick={handleLocationOpen}>
          <SearchPageHeading
            icon={<LocationOnIcon fontSize="small" color="primary" />}
            title="Location"
            description={`${area} , ${city}`}
          />
        </div>

        <Modal
          open={showLocationPicker}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="locationOptionsContainer">
            <div
              style={{
                padding: "0 2%",
              }}
            >
              <InputLabel
                htmlFor="city"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                {" "}
                Please Select City :{" "}
              </InputLabel>
              <Select
                id="city"
                value={city}
                onChange={handleCityChange}
                sx={{ width: "300px" }}
              >
                {CitiesList.map((option, index) => (
                  <MenuItem key={index} value={option} disabled={index != 0}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <InputLabel
                htmlFor="area"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                {" "}
                Please SelectArea :{" "}
              </InputLabel>
              <Select
                id="area"
                value={temparea || area}
                onChange={handleAreaChange}
                sx={{ width: "300px" }}
              >
                {AreasList.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="ModalButtonContainer" style={{ margin: "5% 0" }}>
              <CssButtonOutline
                title="Cancel"
                backgroundColor="#FFFFFF"
                textColor="#276EBC"
                margin={!isMobile ? "0 1.3rem 0 0" : "0 0 0 0"}
                fontSize="1rem"
                width="140px"
                height="38px"
                border="1px solid #276EBC"
                onClick={() => handleLocationCancel()}
              />
              <CssButtonSolid
                title="Okay"
                backgroundColor="#276EBC"
                textColor="#fff"
                fontSize="0.8rem"
                width="140px"
                height="38px"
                border="1px solid #276EBC"
                onClick={() => handleLocationClose()}
              />
            </div>
          </div>
        </Modal>
      </div>
      <Divider orientation="vertical" variant="fullWidth" flexItem />
      <div className="timeMainContainer">
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
              borderRadius: "10px",
              padding: "1%",
              height: "90vh",
              overflowY: "scroll",
            }}
          >
            <DateRange
              ranges={tempDateRange || dateRange}
              onChange={handleDateRangeSelect}
              staticRanges={defaultStaticRanges}
              showMonthAndYearPickers={true}
              minDate={getMinDate()}
              maxDate={getMaxDate()}
              months={isMobile ? 1 : 2}
              direction="horizontal"
              color="#276ebc"
              startDatePlaceholder="Start Date"
              endDatePlaceholder="End Date"
            />
            <div style={{ margin: "10px" }}>
              <label>Start Time:</label>
              <Slider
                min={0}
                max={23}
                value={tempStartTime || startTime}
                step={1}
                onChange={(value) => handleSliderChange(value, "start")}
                tipFormatter={handleSliderTooltip}
                marks={getSlideMarks("start")}
                style={{ margin: "5% 0" }}
              />
            </div>
            <div style={{ margin: "10px" }}>
              <label>End Time:</label>
              <Slider
                min={0}
                max={23}
                value={tempEndTime || endTime}
                step={1}
                onChange={(value) => handleSliderChange(value, "end")}
                tipFormatter={handleSliderTooltip}
                marks={getSlideMarks("end")}
                style={{ margin: "5% 0" }}
              />
            </div>

            <div className="ModalButtonContainer">
              <CssButtonOutline
                title="Cancel"
                backgroundColor="#FFFFFF"
                textColor="#276EBC"
                margin="0 0.8rem 0 0.8rem"
                fontSize="1rem"
                width="200px"
                height="38px"
                border="1px solid #276EBC"
                onClick={() => handleDateCancel()}
              />
              <CssButtonSolid
                title="Okay"
                backgroundColor="#276EBC"
                textColor="#fff"
                fontSize="0.8rem"
                width="200px"
                height="38px"
                border="1px solid #276EBC"
                onClick={() => handleDateClose()}
              />
            </div>
          </div>
        </Modal>

        <div onClick={handleDateOpen} className="timingContainer">
          <SearchPageHeading
            icon={
              <WatchLaterIcon
                fontSize="small"
                color="primary"
                style={{ marginRight: "11px" }}
              />
            }
            title="Start Date & Time"
            description={formatDate(dateRange[0].startDate, "start")}
          />
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {" "}
            <ArrowForwardIcon color="primary" fontSize="small" />{" "}
          </div>
          <SearchPageHeading
            icon={<WatchLaterIcon fontSize="small" color="primary" />}
            title="End Date & Time"
            description={formatDate(dateRange[0].endDate, "end")}
          />
        </div>
      </div>
      <CssButtonSolid
        title="Modify Search"
        backgroundColor="#276EBC"
        textColor="#fff"
        margin="0 1rem  1rem"
        padding="7px 30px"
        fontSize="1rem"
        border="1px solid #276EBC"
        width={isMobile ? "100px" : "200px"}
        height="20%"
        onClick={handleGetCar}
      />
    </div>
  );
};

export default LocationDateTimePicker;

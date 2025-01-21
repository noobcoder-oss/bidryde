"use client";

import React, { useEffect, useState } from "react";
import "./SearchPage.scss";
import { CssButtonSolid, Navbar } from "@/Components";
import { FilterCard } from "./components";
import { Backdrop, CircularProgress, Modal, Skeleton } from "@mui/material";
import CarCard from "./components/CarCard";
import TuneIcon from "@mui/icons-material/Tune";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { assets } from "@/assets";
import FloatingButton from "@/Components/FloatingButton";
import LocationDateTimePicker from "@/Components/LocationDateTime";
import supabase from "@/utils/db_connect";
import { ConstructionOutlined, LegendToggleTwoTone } from "@mui/icons-material";
import { Value } from "sass";
import NoCars from "./components/NoCarsCard";
import { getLatLong } from "./utils/utils";


import { getCookie } from "cookies-next";
import BookNowCard from "./components/BookNowCard";

const SearchPageAssets = {
  Hatchback: assets.images.searchPage.hatchback,
  Sedan: assets.images.searchPage.sedan,
  ECar: assets.images.searchPage.eCar,
  CarImage: assets.images.searchPage.carImage,
  SUV: assets.images.searchPage.suv,
  MUV: assets.images.searchPage.muv,
  SeaterIcon: assets.images.searchPage.seaterIcon,
  FuelIcon: assets.images.searchPage.fuelIcon,
  Eplug: assets.images.searchPage.ePlug,
  AutomaticTransmission: assets.images.searchPage.automaticTransmission,
  ManualTransmission: assets.images.searchPage.manualTransmission,
};

const filtersData = {
  carsTypesFilter: {
    type: "Car Type",
    filters: [
      { icon: SearchPageAssets.Hatchback, title: "Hatchback" },
      { icon: SearchPageAssets.Sedan, title: "Sedan" },
      { icon: SearchPageAssets.SUV, title: "SUV" },
      { icon: SearchPageAssets.MUV, title: "MUV" },
    ],
  },
  seaterFilters: {
    type: "Seaters",
    filters: [
      { icon: SearchPageAssets.SeaterIcon, title: "5 Seater" },
      { icon: SearchPageAssets.SeaterIcon, title: "7 Seater" },
    ],
  },
  transmissionFilters: {
    type: "Transmission",
    filters: [
      { icon: SearchPageAssets.ManualTransmission, title: "Manual" },
      { icon: SearchPageAssets.AutomaticTransmission, title: "Automatic" },
    ],
  },
  carsFuelFilters: {
    type: "Fuel Type",
    filters: [
      { icon: SearchPageAssets.FuelIcon, title: "Petrol" },
      { icon: SearchPageAssets.FuelIcon, title: "Diesel" },
    ],
  },
};



function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);




  const [searchCars, setSearchedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [peakHours, setPeakHours] = useState([]);
  const [isPeakHour, setPeakHour] = useState(false);

  const [selectedCarFiltersList, setCarsSelectedTypesFilters] = useState([]);
  const isScreenSmall = useMediaQuery("(max-width: 960px)");
  const [showFilter, setShowFilter] = useState(false);

  const [showBookNowCard, setShowBookNowCard] = useState(false);

  const openBookNowCardModal = () => {
    setShowBookNowCard(true)
  }

  const closeBookNowCardModal = () => {
    setShowBookNowCard(false);
  }

  const resetSelected = () => {
    if (selectedCarFiltersList.length > 0) {
      setCarsSelectedTypesFilters([]);
      setFilteredCars(searchCars);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const temp = getCookie("carSearchParams");


    var searchObj = JSON.parse(temp || null);
    if (searchObj) {
      const LatLong = getLatLong(searchObj.areaLocation);
      var fetchCarParamsObj = {
        hub: searchObj.areaLocation,
        enddate: `${new Date(searchObj.dateObj[0].endDate)
          .toISOString()
          .slice(0, 10)} ${searchObj.e_time}:00:00.000`,

        startdate: `${new Date(searchObj.dateObj[0].startDate)
          .toISOString()
          .slice(0, 10)} ${searchObj.s_time}:00:00.000`,
      };
      fetchCars(fetchCarParamsObj);
    }
    fetchPeakHours();
    
  }, []);

  const handleOnTapCarsTypes = (carType) => {
    const updatedFiltersList = selectedCarFiltersList.includes(carType)
      ? selectedCarFiltersList.filter((filter) => filter !== carType)
      : [...selectedCarFiltersList, carType];
    setCarsSelectedTypesFilters(updatedFiltersList);
    filterCars(updatedFiltersList);
  };

  const filterCars = (updatedFiltersList) => {
    if (updatedFiltersList.length === 0) {
      setFilteredCars(searchCars);
      return;
    }

    let filterCarsList = [];
    for (let j = 0; j < searchCars.length; j++) {
      const specifications = searchCars[j].specifications;
      if (
        updatedFiltersList.includes(specifications.fuel.toLowerCase()) ||
        updatedFiltersList.includes(specifications.seater.toLowerCase()) ||
        updatedFiltersList.includes(specifications.segment.toLowerCase()) ||
        updatedFiltersList.includes(specifications.transmis.toLowerCase())
      ) {
        filterCarsList.push(searchCars[j]);
      }
    }

    if (filterCarsList.length === 0) {
      setFilteredCars(searchCars);
    } else {
      setFilteredCars(filterCarsList);
    }
  };

  const fetchCars = async (obj) => {
    if (!obj) {
      console.log("No Search Params passed");
      return
    }
    //console.log(obj);
    setIsLoading(true);
    try {
      const response = await fetch('https://uvucayvfyjtdrmassswj.supabase.co/functions/v1/search_cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      //console.log("Data Fetched", data);

      if (data) {
        setSearchedCars(data);
        setFilteredCars(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };
  const fetchPeakHours = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase.from("peak_days").select("*");
      if (data) {
        setPeakHours(data);
        for (let peakTime of peakHours) {
          let peakStart = peakTime.start_time;
          let peakEnd = peakTime.end_time;
          if (
            "2024-02-15 10:00:00.000" > peakStart &&
            "2024-02-17 13:00:00.000" < peakEnd
          ) {
            setPeakHour(true);
            break;
          } else {
            setPeakHour(false);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const getFilterComponent = (filterData) => (
    <FilterCard
      title={filterData.type}
      filters={filterData.filters}
      handleOnTapCarsTypes={handleOnTapCarsTypes}
      selectedFilters={selectedCarFiltersList}
      isNotZero={filterData.type != "Car Type"}
    />
  );

  const getCarsList = () => {
    if (filteredCars.length > 0) {
      return filteredCars.map((car) => (
        <CarCard
          image={car.image}
          carName={car.name}
          rating="4.5"
          bidrydePrice={getDiscountedPrice(mpCalculate(
            "2024-02-15 10:00:00.000",
            "2024-02-17 13:00:00.000",
            car.rates.normalrate,
            car.rates.peakrate,
            isPeakHour
          ), car.rates.bidryde_discount)}

          price={mpCalculate(
            "2024-02-15 10:00:00.000",
            "2024-02-17 13:00:00.000",
            car.rates.normalrate,
            car.rates.peakrate,
            isPeakHour
          )}
          fuel={car.specifications.fuel}
          gear={car.specifications.transmis}
          seat={car.specifications.seater}
          key={car.id}

          originalPrice={car.specifications.segment}
          onBookNow={openBookNowCardModal}
        />
      ));
    } else {
      return <NoCars />;
    }
  };

  const handleToggle = () => {
    setShowFilter((prevState) => !prevState);
  };

  return (
    <>
      <Navbar />
      <div className="SearchPageLayout">
        <div
          className={`filtersLayout ${isScreenSmall && !showFilter && "hideElement"
            }`}
        >
          <div className="closeButton" onClick={handleToggle}>
            <CloseIcon />
          </div>
          <div className="filterHeader">
            <p>Filters</p>
            <CssButtonSolid
              title="reset"
              backgroundColor="#FFFFFF"
              textColor="#276EBC"
              margin="0 1rem 0 1rem"
              padding="10px 30px"
              width="0"
              height="0"
              fontSize="1rem"
              onClick={() => resetSelected()}
            />
          </div>
          {Object.values(filtersData).map((filter) => (
            <div className="filtersList" key={filter.type}>
              {getFilterComponent(filter)}
            </div>
          ))}
        </div>
        <div
          className={`carsLayout ${isScreenSmall && showFilter ? "hideElement" : ""
            }`}
        >
          <div className="cardHeader">
            <LocationDateTimePicker actionHandler={fetchCars} />
            <div className="filtersIcon" onClick={handleToggle}>
              <TuneIcon />
            </div>
          </div>
          <p className="sideHeaderTextStyling">
            Cars available for rental in Hyderabad
          </p>
          <div>
            {!isLoading ? (
              <div
                className={`carsGridLayout${filteredCars.length == 0 ? " gridAlignCenter" : ""
                  }`}
              >
                {getCarsList()}
              </div>
            ) : (
              <Backdrop
                sx={{
                  color: "#00",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  position: "relative",
                  height: "70vh",
                  backgroundColor: "#fff",
                }}
                open={isLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </div>
        </div>
      </div>
      <div className="floatingButton">
        <FloatingButton />
      </div>
      <Modal
        open={showBookNowCard}
      // sx={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
        <BookNowCard onClose={closeBookNowCardModal} />
      </Modal>
    </>
  );
}

export default SearchPage;

function mpCalculate(startTime, endTime, normalRates, peakRates, isPeakHour) {
  let start = startTime;
  let end = endTime;
  let duration = end - start;
  let hours = Math.floor(duration / (60 * 60 * 1000));
  let finalValue = 0;
  let normalHours = 0;
  let peakHours = 0;

  if (isPeakHour) {
    peakHours = peakHours + 1;
  } else {
    normalHours = normalHours + 1;
  }

  if (hours >= 12 && hours < 24) {
    if (hours === 12) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 150) / 100
      );
    } else if (hours === 13) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 145) / 100
      );
    } else if (hours === 14) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 140) / 100
      );
    } else if (hours === 15) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 135) / 100
      );
    } else if (hours === 16) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 130) / 100
      );
    } else if (hours === 17) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 125) / 100
      );
    } else if (hours === 18) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 120) / 100
      );
    } else if (hours === 19) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 115) / 100
      );
    } else if (hours === 20) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 110) / 100
      );
    } else if (hours === 21) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 105) / 100
      );
    } else if (hours === 22) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 103) / 100
      );
    } else if (hours === 23) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 101) / 100
      );
    } else {
      finalValue = normalHours * normalRates + peakHours * peakRates;
    }
  } else {
    if (hours >= 72 && hours < 120) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 90) / 100
      );
    } else if (hours >= 120 && hours < 240) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 85) / 100
      );
    } else if (hours >= 240) {
      finalValue = Math.floor(
        ((normalHours * normalRates + peakHours * peakRates) * 75) / 100
      );
    } else {
      finalValue = normalHours * normalRates + peakHours * peakRates;
    }
  }

  return finalValue;
}


function getDiscountedPrice(mpCalculatedPrice, discountPercentage) {
  return parseInt(
    (mpCalculatedPrice - ((discountPercentage * mpCalculatedPrice) / 100))
      .toFixed(0)
  );
}

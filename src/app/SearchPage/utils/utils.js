import { LAT_LONG_DATA } from "./data";

export const getLatLong = (location) => {
    const latLong = [];
    if(LAT_LONG_DATA[location]){
        latLong.push(LAT_LONG_DATA[location].lat);
        latLong.push(LAT_LONG_DATA[location].long);
    }
    return latLong;
}

export const getLocations = () => {
    return Object.keys(LAT_LONG_DATA);
}
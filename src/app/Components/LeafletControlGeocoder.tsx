"use client";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import { icon } from "leaflet";
import { Geocoder, geocoders } from "leaflet-control-geocoder";

//import icon from "../Components/Constants";

interface PositionInfo {
  address: string;
}

interface LeafletControlGeocoderProps {
  positionInfos: PositionInfo[];
}

const LeafletControlGeocoder: React.FC<LeafletControlGeocoderProps> = (
  props
) => {
  const map = useMap();
  const { positionInfos } = props;

  const icon = L.icon({
    iconUrl: "/public/Images/mapIcon.png",
    iconSize: [54, 54],
    iconAnchor: [64 / 2, 64],
    //className: "foo",
  });

  useEffect(() => {
    const geocoder = new geocoders.Nominatim();

    positionInfos.forEach((positionInfo) => {
      const address = positionInfo.address;
      if (address) {
        geocoder.geocode(address, (resultArray: any[]) => {
          if (resultArray.length > 0) {
            const result = resultArray[0];
            const latlng = result.center;
            L.marker(latlng, { icon }).addTo(map).bindPopup(result.name);
            map.fitBounds(result.bbox);
          }
        });
      }
    });
  }, [map, positionInfos, icon]);

  return null;
};

export default LeafletControlGeocoder;

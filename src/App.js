import React, { useState, useEffect } from "react";
import { CssBaseline, Box, useMediaQuery } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData, getWeatherData } from "./api";

const App = () => {
  const [places, setPlaces] = useState();
  const [weatherData, setWeatherData] = useState();
  const [filteredPlaces, setFilteredPlaces] = useState();
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places?.filter(
      place => Number(place.rating) > rating
    );
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then(data =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then(data => {
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds, type]);
  return (
    <>
      <CssBaseline />
      <Box display="grid" gridTemplateRows="auto 1fr" height="100vh">
        <Header setCoordinates={setCoordinates} />
        <Box
          display="grid"
          gridAutoFlow={isMobile ? "row" : "column"}
          gridTemplateColumns={!isMobile && "auto 1fr"}
          gridTemplateRows={isMobile && "auto 1fr"}
        >
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />

          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            places={filteredPlaces?.length ? filteredPlaces : places}
            weatherData={weatherData}
          />
        </Box>
      </Box>
    </>
  );
};

export default App;

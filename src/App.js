import { useState, useEffect } from "react";
import { CssBaseline, Box, useMediaQuery } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData, getWeatherData } from "./api";

const App = () => {
  const [places, setPlaces] = useState();
  const [filteredPlaces, setFilteredPlaces] = useState();

  const [bounds, setBounds] = useState({});
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const [weatherData, setWeatherData] = useState();
  const [childClicked, setChildClicked] = useState(null);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  const isMobile = useMediaQuery("(max-width: 750px)");

  // Current Location
  useEffect(() => {
    const { getCurrentPosition } = navigator.geolocation;
    getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) =>
      setCoordinates({ lat, lng })
    );
  }, []);

  // Places
  useEffect(() => {
    if (!bounds.sw && !bounds.ne) return;
    setIsLoading(true);
    const { sw, ne } = bounds;
    getPlacesData(type, sw, ne).then(data => {
      setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [bounds, type]);

  // Filtered Places
  useEffect(() => {
    setFilteredPlaces(places?.filter(place => Number(place.rating) > rating));
  }, [rating, places]);

  // Weather Data
  useEffect(() => {
    if (!bounds.sw && !bounds.ne) return;
    const { lat, lng } = coordinates;
    getWeatherData(lat, lng).then(data => setWeatherData(data));
  }, [bounds, coordinates]);

  const listProps = {
    childClicked,
    isLoading,
    rating,
    setRating,
    setType,
    type,
  };

  const mapProps = {
    coordinates,
    places: filteredPlaces?.length ? filteredPlaces : places,
    setBounds,
    setChildClicked,
    setCoordinates,
    weatherData,
  };

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
          <List {...listProps} />
          <Map {...mapProps} />
        </Box>
      </Box>
    </>
  );
};

export default App;

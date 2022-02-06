import React from "react";
import GoogleMapReact from "google-map-react";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import useStyles from "./styles";
import mapStyles from "./mapStyles";

export const Map = props => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const onChange = e => {
    props.setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    props.setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        center={props.coordinates}
        defaultCenter={props.coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        onChange={onChange}
        onChildClick={child => props.setChildClicked(child)}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
      >
        <Places {...props} classes={classes} isMobile={isMobile} />
        <WeatherData {...props} />
      </GoogleMapReact>
    </div>
  );
};

const Places = props => {
  const { places, classes } = props;
  return places?.map((place, i) => (
    <div
      className={classes.markerContainer}
      lat={Number(place.latitude)}
      lng={Number(place.longitude)}
      key={i}
    >
      <Place {...props} {...place} />
    </div>
  ));
};

const Place = props => {
  const { isMobile, rating, classes } = props;
  if (isMobile)
    return <LocationOnOutlinedIcon color="primary" fontSize="large" />;
  return (
    <Paper elevation={3} className={classes.paper}>
      <PlaceName {...props} />
      <PlacePhoto {...props} />
      <Rating size="small" value={Number(rating)} readOnly />
    </Paper>
  );
};

const PlaceName = ({ name, classes }) => (
  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
    {name}
  </Typography>
);

const PlacePhoto = ({ photo, name, classes }) => {
  const src = photo
    ? photo.images.large.url
    : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";
  return <img className={classes.pointer} alt={name} src={src} />;
};

const WeatherData = ({ weatherData }) => {
  return weatherData?.list?.map((data, i) => (
    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
      <img
        height={100}
        src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt="weather"
      />
    </div>
  ));
};

export default Map;

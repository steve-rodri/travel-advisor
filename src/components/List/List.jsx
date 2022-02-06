import { useState, useEffect, createRef } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import {
  CircularProgress,
  Grid,
  Typography as Text,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  useMediaQuery,
} from "@material-ui/core";

import useStyles from "./styles";

const List = props => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 750px)");
  const style = { maxHeight: isMobile ? "75vh" : "100vh" };
  props = { ...props, classes, isMobile };
  return (
    <div className={classes.container} style={style}>
      <Text variant="h4">Restaurants, Hotels & Attractions around you</Text>
      <ListContent {...props} />
    </div>
  );
};

const ListContent = props => {
  const { isLoading, classes } = props;
  if (isLoading)
    return (
      <div className={classes.loading}>
        <CircularProgress size="5rem" />
      </div>
    );
  return (
    <>
      <TypeSelect {...props} />
      <RatingSelect {...props} />
      <Cards {...props} />
    </>
  );
};

const TypeSelect = ({ type, setType, classes }) => (
  <FormControl className={classes.formControl}>
    <InputLabel>Type</InputLabel>
    <Select value={type} onChange={e => setType(e.target.value)}>
      <MenuItem value="restaurants">Restaurants</MenuItem>
      <MenuItem value="hotels">Hotels</MenuItem>
      <MenuItem value="attractions">Attractions</MenuItem>
    </Select>
  </FormControl>
);

const RatingSelect = ({ rating, setRating, classes }) => (
  <FormControl className={classes.formControl}>
    <InputLabel>Rating</InputLabel>
    <Select value={rating} onChange={e => setRating(e.target.value)}>
      <MenuItem value={0}>All</MenuItem>
      <MenuItem value={3}>Above 3.0</MenuItem>
      <MenuItem value={4}>Above 4.0</MenuItem>
      <MenuItem value={4.5}>Above 4.5</MenuItem>
    </Select>
  </FormControl>
);

const Cards = ({ places, classes, childClicked }) => {
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs(refs =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);
  return (
    <Grid container spacing={3} className={classes.list}>
      {places?.map((place, i) => (
        <Grid item ref={elRefs[i]} key={i} xs={12}>
          <PlaceDetails
            {...place}
            selected={Number(childClicked) === i}
            refProp={elRefs[i]}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default List;

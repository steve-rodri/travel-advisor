import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";

import useStyles from "./styles";

const PlaceDetails = props => {
  const { name, photo, selected, refProp } = props;
  const classes = useStyles();
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const image = photo
    ? photo.images.large.url
    : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";
  props = { ...props, classes };
  return (
    <Card elevation={6}>
      <CardMedia style={{ height: 350 }} title={name} image={image} />
      <CardContent>
        <Name {...props} />
        <Reviews {...props} />
        <Price {...props} />
        <Ranking {...props} />
        <Awards {...props} />
        <Cuisine {...props} />
        <Address {...props} />
        <PhoneNumber {...props} />
        <CardActions>
          <Buttons {...props} />
        </CardActions>
      </CardContent>
    </Card>
  );
};

const Name = ({ name }) => (
  <Typography gutterBottom variant="h5">
    {name}
  </Typography>
);

const Reviews = ({ rating, num_reviews }) => (
  <Box display="flex" justifyContent="space-between">
    <Rating value={Number(rating)} readOnly />
    <Typography gutterBottom variant="subtitle1">
      out of {num_reviews} reviews
    </Typography>
  </Box>
);

const Price = ({ price_level }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="subtitle1">Price</Typography>
    <Typography gutterBottom variant="subtitle1">
      {price_level}
    </Typography>
  </Box>
);

const Ranking = ({ ranking }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="subtitle1">Ranking</Typography>
    <Typography gutterBottom variant="subtitle1">
      {ranking}
    </Typography>
  </Box>
);

const Awards = ({ awards }) => {
  if (!awards) return null;
  return awards.map(award => (
    <Box
      my={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <img src={award.images.small} alt={award.display_name} />
      <Typography variant="subtitle2" color="textSecondary">
        {award.display_name}
      </Typography>
    </Box>
  ));
};

const Cuisine = ({ cuisine, classes }) => {
  if (!cuisine) return null;
  return cuisine.map(({ name }) => (
    <Chip key={name} size="small" label={name} className={classes.chip} />
  ));
};

const Address = ({ address, classes }) => {
  if (!address) return null;
  return (
    <Typography
      gutterBottom
      variant="subtitle2"
      color="textSecondary"
      className={classes.subtitle}
    >
      <LocationOnIcon /> {address}
    </Typography>
  );
};

const PhoneNumber = ({ phone, classes }) => {
  if (!phone) return null;
  return (
    <Typography
      gutterBottom
      variant="subtitle2"
      color="textSecondary"
      className={classes.spacing}
    >
      <PhoneIcon /> {phone}
    </Typography>
  );
};

const Buttons = ({ web_url, website }) => (
  <>
    <Button
      size="small"
      color="primary"
      onClick={() => window.open(web_url, "_blank")}
    >
      Trip Advisor
    </Button>

    <Button
      size="small"
      color="primary"
      onClick={() => window.open(website, "_blank")}
    >
      Website
    </Button>
  </>
);

export default PlaceDetails;

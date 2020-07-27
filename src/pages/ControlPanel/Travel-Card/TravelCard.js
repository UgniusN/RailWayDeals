import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {NavLink} from "react-router-dom";
import './TravelCard.css'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  console.log(props);
  const {t} = useTranslation("buycard")


  return (
    
    <Card className={classes.root}>
      <NavLink to={"/travels/" + props.id} key={props.id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.panevezys.lt/panevezys/images/330/tst-foto%20%20(12).jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.startdestination} - {props.enddestination}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      </NavLink>
      <CardActions>
        <NavLink to={"/travels/" + props.id} key={props.id}>
        <Button size="small" color="primary">
          {t("buynow")}
        </Button>
        </NavLink>
        <Typography gutterBottom variant="h6" component="h6">{props.price}€</Typography>
        <Typography gutterBottom variant="h6" component="h6" className="date">{props.date}</Typography>
      </CardActions>
    </Card>
  );
}
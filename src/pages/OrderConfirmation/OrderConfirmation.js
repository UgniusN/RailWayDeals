import React,{ useContext } from 'react'
import { Paper } from '@material-ui/core'
import './OrderConfirmation.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import travelApi from '../../Api/travelApi';
import { Button } from '@material-ui/core';
import { UserContext } from '../../App';
import orderApi from '../../Api/orderApi'
import Snackbar from '@material-ui/core/Snackbar';
import Moment from 'moment'
import { useHistory, useLocation } from "react-router-dom"
import { useTranslation } from 'react-i18next';

export default () => {
  
    const { id } = useParams();
    const [travel, setTravel] = useState({});
    
    useEffect(() => {
        travelApi.fetchTravelById(id)
          .then(resp => setTravel(resp.data));
      }, [id])

    const{user} = useContext(UserContext)

    const {t} = useTranslation("buypage")
    

    let order = {
        travelid : travel.id,
        userid: user.userid,
    }

    let nowDate = Moment()

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    
      const { vertical, horizontal, open } = state;
    
      const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };

      const history = useHistory();
      const redirectionas = () => {
        let path =`/mytravels`
        history.push(path);
    }

      function createOrderNotification(order) {
        orderApi.createOrder(order).then(handleClick({ vertical: 'top', horizontal: 'left' })).finally(redirectionas());
      }

      console.log(nowDate)

    return(
    <div className="orderpage">
      <div>
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Order complete"
        key={vertical + horizontal}
        severity="success"
        />
      </div>
        <Paper className="orderstructure" elevation={3}>
          <div className="orderImageContainer" />
            <div className="orderContent">
              <div>
                <p className="orderheadertext">{t("startdestination")}</p>
                <p>{travel.start_destination}</p>
              </div>
              <div>
                <p className="orderheadertext">{t("enddestination")}</p>
                <p>{travel.end_destination}</p>
              </div>
              <div>
                <p className="orderheadertext">{t("travelas")}</p>
                <p>{travel.date}</p>
              </div>
              <div>
                <Button color="primary" onClick={() =>createOrderNotification(order)}>{t("buyticket")}</Button>
              </div>
            </div>
        </Paper>
    </div>
    )
}
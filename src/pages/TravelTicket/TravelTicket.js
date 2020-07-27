import React,{ useContext } from 'react'
import { Paper } from '@material-ui/core'
import './TravelTicket.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import orderApi from '../../Api/orderApi'
import Snackbar from '@material-ui/core/Snackbar';
import Moment from 'moment'
import QRCode from 'qrcode.react'
import { useTranslation } from 'react-i18next';

export default () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    
    useEffect(() => {
        orderApi.fetchOrderById(id)
          .then(resp => setOrder(resp.data));
      }, [id])

    const{user} = useContext(UserContext)
    
    const {t} = useTranslation("travelticket");

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

      function createOrderNotification(order) {
        handleClick({ vertical: 'top', horizontal: 'left' });
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
            <div className="structure">
                <div className="orderContent">
                    <div>
                        <p className="orderheadertext">{t("travelername")}</p>
                        <p>{order.name}</p>
                    </div>
                    <div>
                        <p className="orderheadertext">{t("travelerlastname")}</p>
                        <p>{order.lastname}</p>
                    </div>
                    <div>
                        <p className="orderheadertext">{t("startstation")}</p>
                        <p>{order.startdestination}</p>
                    </div>
                    <div>
                        <p className="orderheadertext">{t("endstation")}</p>
                        <p>{order.enddestination}</p>
                    </div>
                    <div>
                        <p className="orderheadertext">{t("traveldate")}</p>
                        <p>{order.date}</p>
                    </div>
                    <div>
                        <p className="orderheadertext">{t("travelcode")}</p>
                        <p>{order.ticketcode}</p>
                    </div>
                </div>
                <div className="qrcodeclass">
                    <p><QRCode className="qrcodeclass" value="localhost:3000/controlpanel" height="1"></QRCode></p>
                </div>
            </div>
        </Paper>
    </div>
    )
}
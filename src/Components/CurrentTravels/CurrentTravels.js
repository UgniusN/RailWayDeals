import React from 'react'
import orderApi from '../../Api/orderApi'
import OrderCard from '../OrderCard/OrderCard'
import {useEffect,useState} from 'react';
import Moment from 'moment'
 
export default (props) => {
 
    const [orders, setOrder] = useState([]);
 

    const orderList = orders.map(order => {
        var m = Moment();
        var m2 = Moment(order.date)
        if(m.isBefore(m2)) {
        return (
            <div key={order.id}>
                <OrderCard
                    startdestination={order.startdestination}
                    enddestination={order.enddestination}
                    date={order.date}
                    id={order.id}
                />
            </div>
        )
    }
    })
 
    useEffect(() => {
        orderApi.fetchUserOrders()
            .then(response => setOrder(response.data))
      }, [])
 
    return (
        <div className="cardbox">
            {orderList}
        </div>
    )
}
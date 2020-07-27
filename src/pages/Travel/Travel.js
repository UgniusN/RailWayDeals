import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import travelApi from '../../Api/travelApi';
import { Button } from '@material-ui/core';

export default() => {
    const { id } = useParams();
    const [travel, setTravel] = useState({});

    useEffect(() => {
        travelApi.fetchTravelById(id)
          .then(resp => setTravel(resp.data));
      }, [id])

    return (
        <div className="travelpage">
                <div>
                <h2>Departure Station:</h2>
                <h1>{travel.start_destination}</h1>
                </div>

                <div>
                <h2>Arival Station:</h2>
                <h1>{travel.end_destination}</h1>
                </div>
                
                <div>
                <h2>Date:</h2>
                </div>

                <Button>Purchase</Button>
        </div>
    )
}
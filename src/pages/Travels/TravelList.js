import React from 'react'
import usersApi from '../../Api/travelApi'
import TravelCard from '../ControlPanel/Travel-Card/TravelCard'
import {useEffect,useState} from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import { useTranslation } from 'react-i18next';
import './TravelList.css'

export default (props) => {
 


    const [travels, setTravels] = useState([]);

    const [filter, setFilter] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const {t} = useTranslation("travelList")

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };


    const travelList = travels.map(travel => {
        if(travel.start_destination.toLowerCase().includes(filter.toLocaleLowerCase()))
        return (
            <div key={travel.id}>
                <TravelCard
                    startdestination={travel.start_destination}
                    enddestination={travel.end_destination}
                    price={travel.price}
                    id={travel.id}
                    date={travel.date}
                />
            </div>
        )
    })
 
    useEffect(() => {
        usersApi.fetchTravels()
            .then(response => setTravels(response.data))
            .finally(() => setIsLoading(false));
      }, [])
 
    return (
        <div>
                        <div className="searchblock">
                <div className="searchbar">
                    <p>{t("searchfortravel")}</p>
                    <TextField id="standard-basic" label={t("startdestination")} onChange={handleSearchChange} className="field" />
                </div>
            </div>
        <div className="startbox">
            <div className="cardbox">
                {isLoading ? <CircularProgress/> : travelList}
            </div>
        </div>
        </div>
    )
}
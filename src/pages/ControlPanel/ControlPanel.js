import React from 'react';
import Button from '@material-ui/core/Button';
import UserList from './TravelTable/TravelTable';
import '../ControlPanel/ControlPanel.css'
import CreateTravel from '../ControlPanel/CreateTravel/CreateTravel'
import { useTranslation } from 'react-i18next';
import {
    BrowserRouter as Router,
    Switch,
    Link
  } from "react-router-dom";
import EditTravel from '../../pages/ControlPanel/EditTravel/EditTravel'
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";

export default () => {
   const {t} = useTranslation("controlpanel")
   return (

    <Router>
      <div className="cpview">
      <Link to="/controlpanel/travellist">
         <Button variant="contained" color="primary">
            {t("managetravels")}
         </Button>
      </Link>
     <Link to="/controlpanel/createtravel">
         <Button variant="contained" color="primary">
            {t("createtravel")}
         </Button>
     </Link>
     <Switch>
         <PrivateRoute path="/controlpanel/travellist">
            <UserList/>
         </PrivateRoute>
         <PrivateRoute path="/controlpanel/createtravel">
            <CreateTravel/>
         </PrivateRoute>
         <PrivateRoute exact path="/controlpanel/edittravel/:id">
            <EditTravel/>
         </PrivateRoute>
     </Switch>
    </div>
    </Router>
)}
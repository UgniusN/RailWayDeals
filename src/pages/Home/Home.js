import React from 'react'
import './Home.css';
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default () => {

    const {t} = useTranslation("homepage")

    return (
        <div className="homePageBase">
            <div>
                <div className="title"><b>{t("welcome")}</b></div>
                <div className="title2">{t("second")}</div>
                <div className="dealbutton">
                    <NavLink to={"/travels"} className="navlinkholder">
                    <Button variant="contained"  color="primary" disableElevation>{t("check")}</Button>
                    </NavLink>
                    </div>
            </div>
        </div>
    )
}
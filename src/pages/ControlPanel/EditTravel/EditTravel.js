import React from 'react'
import 'date-fns';
import {Formik, Form, Field} from 'formik';
import { TextField } from 'formik-material-ui'
import travelApi from '../../../Api/travelApi'
import DateFnsUtils from '@date-io/date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ltLocale from "date-fns/locale/lt";
import enLocale from "date-fns/locale/en-US";
import * as Yup from 'yup';
import moment from 'moment'
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from "react-router-dom"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import './EditTravel.css';


export default() => {

    const { id } = useParams();
    const [travel, setTravel] = useState({});
    const {t} = useTranslation("edittravel")

    const history = useHistory();
    const location = useLocation()

    const redirectionas = () => {
        let path =`/mytravels`
        history.push(path);
    }

     useEffect(() => {
        travelApi.fetchTravelById(id)
          .then(resp => setTravel(resp.data));
      }, [id])

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const initialState = {
        start_destination: travel.start_destination,
        end_destination: travel.end_destination,
        date: travel.date,
        price: travel.price
    }

    const localeMap = {
        en: enLocale,
        lt: ltLocale,
      };

      const validationSchema = Yup.object().shape({
        start_destination: Yup.string()
        .required(t("emptystart")),
        end_destination: Yup.string()
        .required(t("emptyend")),
        price: Yup.number()
        .positive(t("incorrectprice"))
        .required(t("emptyprice")),
        date: Yup.date()
        .required(t("wrongdate"))
    })


    
    return (
        <Formik
            initialValues={initialState}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={values=> {
                travelApi.editTravel(values,id);
            }}
        >

            {(props) => (
                <div className="formBase">
                    <div class="deleteBlock">     
                        <Button variant="contained" color="secondary" disableElevation onClick={() =>travelApi.deleteTravel(id)}>{t("deletetravel")}</Button>
                    </div>
                <div className="editTravelForm">
                    <Form>
                        <div>
                            <div>{t("startdestination")}</div>
                            <Field name="start_destination" type="text" placeholder="Email" component={TextField}></Field>
                        </div>
                        <div className="labelis">
                            <div>{t("enddestination")}</div>
                            <Field name="end_destination" type="text" component={TextField}/>
                         </div>
                        <div className="labelis">
                            <div>{t("price")}</div>
                            <Field name="price" type="text" component={TextField}/>
                        </div>
                        <div>
                        { t("language") === "lt" ? 
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["lt"]}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="date-picker-inline"
                                invalidDateMessage={t("wrongdate")}
                                label={t("date")}
                                value={props.values.date}
                                onChange={value => props.setFieldValue("date", moment(value).format('YYYY-MM-DD'))}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider> : 
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["en"]}>
                                                        <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="date-picker-inline"
                                invalidDateMessage={t("wrongdate")}
                                label={t("date")}
                                value={props.values.date}
                                onChange={value => props.setFieldValue("date", moment(value).format('YYYY-MM-DD'))}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        }
                        </div>
                        <div>
                            <Button type="submit" variant="contained" color="primary" disableElevation>{t("confirmedit")}</Button>
                        </div>
                </Form>
                </div>
                </div>
            )}
        </Formik>
    )
}
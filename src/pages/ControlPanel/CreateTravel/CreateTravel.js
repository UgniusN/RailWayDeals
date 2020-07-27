import React, { useState, useEffect} from 'react'
import 'date-fns';
import {Formik, Form, Field} from 'formik';
import { TextField } from 'formik-material-ui'
import usersApi from '../../../Api/travelApi'
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import ltLocale from "date-fns/locale/lt";
import enLocale from "date-fns/locale/en-US";
import * as Yup from 'yup';
import moment from 'moment'
import { useTranslation } from 'react-i18next';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import './CreateTravel.css';


export default() => {

    const {t} = useTranslation("createtravel")

    const initialState = {
        start_destination: '',
        end_destination: '',
        price: '',
        date: new Date()
    }
    
    const validationSchema = Yup.object().shape({
        start_destination: Yup.string()
        .required(t("emptystart")),
        end_destination: Yup.string()
        .required(t("emptyend")),
        price: Yup.number()
        .required(t("emptyprice"))
        .positive(t("incorrectprice")),
        date: Yup.date()
        .required(t("wrongdate"))
    })

    const localeMap = {
        en: enLocale,
        lt: ltLocale,
      };


    return (
        <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={values=> {
                usersApi.createTravel(values);
            }}
        >

            {(props) => (
                                <div className="createTravelForm">
                <Form>
                    <div>
                        <div>{t("startdestination")}</div>
                        <Field name="start_destination" type="text" component={TextField}/>
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

                    </div>
                    <div className="labelis">
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
                    <Button type="submit" variant="contained" color="primary" disableElevation className="createTravelButton">{t("createtravel")}</Button>
                    </div>
                </Form>
                </div>
            )}
        </Formik>
    )
}
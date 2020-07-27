import React from "react";
import {Field, Form, Formik} from "formik";
import userControlAPI from "../../Api/userControlAPI";
import { Button } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import './Register.css';
import { useHistory, useLocation } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup'; 

const initialState = {
    user: '',
    pass: '',
    name: '',
    lastname: '',
    email: '',
    country: '',
}
 
export default () => {

    const {t} = useTranslation("registration")

    const history = useHistory();
    const location = useLocation()

    const { from } = location.state || { from: { pathname: '/' } }

    const redirectionas = () => {
        let path =`/travels`
        history.push(path);
    }

    const onSubmit = values => {
        userControlAPI.createUser(values)
            .then (() => {
                history.replace(from)
            })
            redirectionas();
    }

    const validationSchema = Yup.object().shape({
        user: Yup.string()
        .required(t("emptyusername")),
        pass: Yup.string()
        .required(t("emptypassword")),
        name: Yup.string()
        .required(t("emptyname")),
        lastname: Yup.string()
        .required(t("emptylastname")),
        email: Yup.string()
        .required(t("emptyemail")),
        country: Yup.string()
        .required(t("emptycountry"))
    })

    return (
        <Formik
            initialValues={initialState}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(props) => (
                <Form className="loginForm">
                    <div className="loginFields">
                    <div>
                        <label htmlFor="user">{t("username")}</label>
                        <Field name="user" type="text" component={TextField} />
                    </div>
                    <div>
                        <label htmlFor="pass">{t("password")}</label>
                        <Field name="pass" type="password" component={TextField} />
                    </div>
                    <div>
                        <label htmlFor="name">{t("name")}</label>
                        <Field name="name" type="text" component={TextField} />
                    </div>
                    <div>
                        <label htmlFor="lastname">{t("lastname")}</label>
                        <Field name="lastname" type="text" component={TextField} />
                    </div>
                    <div>
                        <label htmlFor="email">{t("email")}</label>
                        <Field name="email" type="text" component={TextField} />
                    </div>
                    <div>
                        <label htmlFor="country">{t("country")}</label>
                        <Field name="country" type="text" component={TextField} />
                    </div>
                    <div className="mygtukas">
                        <Button variant="contained" color="primary" type="submit" className="buttonasregister">{t("register")}</Button>
                    </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
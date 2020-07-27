import React, {useContext} from "react";
import {Field, Form, Formik} from "formik";
import {setCredentials} from "../../Api/index";
import {UserContext} from "../../App";
import userApi from "../../Api/userApi";
import { useHistory, useLocation } from "react-router-dom"
import { Button } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import {Link} from "react-router-dom";
import {ErrorMessage} from "formik";
import './Login.css';
import '../../validation';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const initialValues = {
    username: '',
    password: ''
}


export default () => {
    const {t} = useTranslation("login")

    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .required(t("emptyuser")),
        password: Yup.string()
        .required(t("emptypassword"))
    })

    const {login} = useContext(UserContext)
    const history = useHistory();
    const location = useLocation()

    const { from } = location.state || { from: { pathname: '/' } }

    
    const onSubmit = values => {
        setCredentials(values)

        userApi.getUser()
            .then(({data}) => {
                login(data)
                history.replace(from)
            })
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(props) => (
                <Form className="loginForm">
                    <div className="loginFields">
                        <div>
                            <div>{t("username")}</div>
                                <Field name="username" type="text" component={TextField} />
                            </div>
                            <div>
                                <div>{t("password")}</div>
                                <Field name="password" type="password" component={TextField} />
                            </div>
                            <div className="mygtukas">
                                <Button variant="contained" color="primary" type="submit" className="buttonasLogin">{t("login")}</Button>
                            </div>
                            <div className="mygtukas">
                                <Link to="/register" className="buttonasRegister">
                                    <Button variant="contained" color="primary" type="submit" className="buttonasRegister" >{t("register")}</Button>
                                </Link>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>
    )
}
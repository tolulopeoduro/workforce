import classes from './Auth.module.scss'
import React from 'react'
import { Route } from 'react-router'
import Signup from './Signup/Signup'
import Signin from './Signin/Signin'

const Auth = () => {
    return (
        <div className = {classes.Auth}>
            <div className = {classes.Logo}>
                <img alt = 'workforce logo' src = '/images/workforce-logo.svg' />
            </div>
            <div className = {classes.Main}>
                <Route path = "/auth/Signin" render = {() => <Signin/>} />
                <Route path = "/auth/signup" render = {() => <Signup/>  } />
            </div>
        </div>
    )
}

export default Auth

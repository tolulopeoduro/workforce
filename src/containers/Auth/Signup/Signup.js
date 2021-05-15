import classes from './Signup.module.scss'
import React, { useState } from 'react'
import {useFormik} from 'formik' 
import * as Yup from "yup"
import Input from '../../../components/Input/Input'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../../components/Spinner/Spinner'

const validationSchema = Yup.object({
    email : Yup.string().email('invalid email').required('required'),
    username : Yup.string().required('required').min( 3 , "too short"),
    password : Yup.string().required('required').min(8 , 'too short'),
    confirmPassword : Yup.string().required('please confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const Signup = (props) => {

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)

    const toSignin = () => {
        props.history.goBack()
        setTimeout(() => {
            props.history.push('/auth/signin')
        } , 100)
    }


    const  {handleChange , handleSubmit , values , errors} = useFormik({
        initialValues : {
            email : "",
            username : "",
            password : "",
            confirmPassword : "",
        },
        validationSchema,
        onSubmit (values) {
            setLoading(true)
            const data = {
                email: values.email,
                username : values.username,
                bio: "",
                password: values.password,
                profilePicSrc : ""
            }

            const url = 'https://workforce001.herokuapp.com/api/auth/signup'

            axios.post(url , data , {'Content-Type' : 'application/json'})
            .then(
                (response) => {
                    if (response.status === 201) {
                        props.history.push('/auth/signin')
                    }
                    setLoading(false)
                }
            ).catch(
                (error) => {
                    console.log(error.response === undefined) 
                    if (error.response === undefined) {
                        setError('Something went wrong, please try again')
                    }
                    if (error.response.status) {
                        switch (error.response.status) {
                            case 401 : 
                                setError(error.response.data.message)
                                break;
                            case 500 : 
                                setError(error.response.data.message)
                                break;
                            default:
                                setError('Something went wrong, please try again')
                                break;

                    }

                }
                setLoading(false)
            }
        )

        }
    })

    return (
        <div className = {classes.Signup}>
                        <form  className = {classes.Form} onSubmit = {handleSubmit}>
                            <Input type = "text" name = "email" value = {values.email} handleChange = {handleChange} errors = {errors.email} />
                            <Input type = "text" name = "username" value = {values.username} handleChange = {handleChange} errors = {errors.username} />
                            <Input type = "password" name = "password" value = {values.password} handleChange = {handleChange} errors = {errors.password} />
                            <Input type = "password" name = "confirmPassword" value = {values.confirmPassword} handleChange = {handleChange} errors = {errors.confirmPassword} />
                            <button type = "submit" enabled = {loading}>submit</button>
                        </form>
                        <span className = {classes.SignupError}>{error}</span>
                        {loading ? <Spinner/> : null}
                        <div className = {classes.Link}>
                            <span>Already have an account</span>&nbsp;
                            <Link onClick = {toSignin}>Sign in</Link>
                        </div>
        </div>
    )
}

export default withRouter(Signup)

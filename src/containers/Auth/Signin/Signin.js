import classes from './Signin.module.scss'
import {useFormik} from 'formik' 
import * as Yup from "yup"
import React, { useState } from 'react'
import Input from '../../../components/Input/Input'
import { Link, withRouter } from 'react-router-dom'
import Spinner from '../../../components/Spinner/Spinner'
import axios from 'axios'
import localStorage from 'local-storage'


const validationSchema = Yup.object({
    email : Yup.string().email('invalid email').required('please input email'),
    password : Yup.string().required('please input password'),
})

const Signin = (props) => {

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)

    const toSignup = () => {
        props.history.goBack()
        setTimeout(() => {
            props.history.push('/auth/signup')
        } , 100)
    }

    
    const  {handleChange , handleSubmit , values , errors} = useFormik({
        initialValues : {
            email : "",
            password : "",
        },
        validationSchema,
        onSubmit (values) { 
            setError(null)
            setLoading(true)
            const url = 'https://workforce001.herokuapp.com/api/auth/signin';
            
            const data = {
                email : values.email,
                password : values.password
            };
            
            const headers = {
                'Content-Type' : "application/json"
            }
            
            axios.post( url , data , headers)
            .then(
                (response) => {
                    console.log(response.data)
                    if (response.status === 200) {
                        const userData = response.data
                        localStorage.set("userData" , userData)
                        props.history.push('/posts') 
                    }
                    
                    setLoading(false)
                }
                ).catch(
                    (error) => {
                        if (error.response === undefined) {
                            setError('Something went wrong, please try again')
                        } else if (error.response.status) {
                            switch (error.response.status) {
                            case 401 :
                                setError(error.response.data.message)
                                break;
                                case 500 : 
                                setError(error.response.data.message)
                                break;
    
                            default:
                                setError('newtork issue')
                                break;
                        }

                    }
                    setLoading(false)
                }
            )

        }
    })
    
    document.title = 'Signin - Workforce'
    
    return (
        <div className = {classes.Signin}>
            <form  className = {classes.Form} onSubmit = {handleSubmit}>
                            <Input type = "text" name = "email" value = {values.email} handleChange = {handleChange} errors = {errors.email} />
                            <Input type = "password" name = "password" value = {values.password} handleChange = {handleChange} errors = {errors.password} />
                            <button type = "submit" disabled = {loading}>submit</button>
                        </form>
                        <span className = {classes.LoginErrors}>{error}</span>
                        {!loading ? <div className = {classes.Link}>
                            <span>Don't have an account</span>&nbsp;
                            <Link onClick = {toSignup}>Sign up</Link>
                        </div> : null}
                            {loading ? <Spinner/>  : null}

        </div>
    )
}

export default withRouter(Signin)

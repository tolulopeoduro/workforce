import classes from './Navbar.module.scss'
import React from 'react'
import Menubutton from './Menubutton/Menubutton'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../../store/userSlice'

const Navbar = (props) => {

    const auth = useSelector(state => state.userData)
    const dispatch = useDispatch()

    return (
        <div>
            <div className = {classes.Navbar}>
                <div className = {classes.Logo}>
                    <img alt = 'logo' src = {'/images/workforce-logo-inverted.svg'} height = "35px"/>
                </div>
                <div className = {classes.Links}>
                    <Link to = "/posts">Home</Link>
                    <Link to = {auth.isLoggedIn ? "/newpost" : '/auth/signin'}>Create post</Link>
                    {auth.isLoggedIn ? <Link to = {`/profile/${auth.data.userId}`}>My profile</Link> : null}
                    {
                        !auth.isLoggedIn ?
                            <Link to = "/auth/signup">Signup/Signin</Link>:
                            <Link onClick = {() => {
                            localStorage.setItem('userData' , null)
                            dispatch(userActions.signOut())
                            props.handleClick()
                            props.history.push('/posts')
                        }
                    } to = "/posts">Signout</Link>
                    }
                </div>
                <Menubutton active = {props.menuactive} handleClick = {props.handleClick}/>
            </div>
        </div>
    )
}

export default withRouter(Navbar)

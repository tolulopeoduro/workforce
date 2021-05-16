import classes from './Sidebar.module.scss';
import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/userSlice';

const Sidebar = (props) => {
    const auth = useSelector(state => state.userData)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(auth)
        
    }, [auth])

    return (
        <div className ={props.active ? [classes.Sidebar , classes.Active].join(' ') : classes.Sidebar}>
            <div className = {classes.Links}>
                <Link onClick = {props.handleClick} to = "/posts">Home</Link>
                <Link onClick = {props.handleClick} to = "/newpost">Create post</Link>
                {auth.isLoggedIn ? <Link onClick = {props.handleClick} to = {`/profile/${auth.data.userId}`}>My profile</Link> : null}
                {
                    !auth.isLoggedIn ?
                    <Link onClick = {props.handleClick} to = "/auth/signup">Signup/Signin</Link>:
                    <Link onClick = {() => {
                        localStorage.setItem('userData' , null)
                        dispatch(userActions.signOut())
                        props.handleClick()
                        props.history.push('/posts')
                    }
                } to = "/auth/signup">Signout</Link>
                }
            </div>
        </div>
    )
}

export default withRouter(Sidebar);

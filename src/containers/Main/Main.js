import classes from './Main.module.scss'
import React, { useEffect } from 'react'
import Posts from '../Posts/Posts'
import { Redirect, Route, Switch, withRouter } from 'react-router'
import FullPost from '../../components/FullPost/FullPost'
import Editor from '../Editor/Editor'
import Auth from "../Auth/Auth"
import { userActions} from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Profile from '../Profile/Profile'

const Main = (props) => {
    const auth = useSelector(state => state.userData);
    const dispatch = useDispatch()
    

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data) {
            if (data.userId && data.token && !auth.isLoggedIn) {
                let config = {
                    headers: {Authorization : `${data.token}` , 'Content-Type' : 'application/json'}
                }
                axios.post(`https://workforce001.herokuapp.com/api/auth` , {}, config)
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(userActions.signIn(data))
                    }
                })
            }
        } else {
            dispatch(userActions.signOut())
        }
    }, [] )

    return (
        <div className = {classes.Main}>
            <Switch>
                <Route path = "/posts/:id" component = {() => <FullPost/>} />
                <Route path = "/editor/:id" component = {() => <Editor update = {true} />} />
                <Route path = "/profile/:id" exact component = {Profile} />
                <Route path = "/posts" exact component ={Posts} />
                <Route path = "/newpost" exact component = {Editor} />
                <Route path = "/auth" component = {Auth} />
                <Route path = "/" exact component = {() => <Redirect from  to = "/posts" />} />
            </Switch>
        </div>
    )
}

export default withRouter(Main)

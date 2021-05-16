import classes from './Profile.module.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import Post from '../../components/Post/Post'


const Profile = (props) => {
    
    const [profileData , setProfileData] = useState({})
    const [posts , setPosts] = useState([])

    useEffect(() => {
        axios.get(`https://workforce001.herokuapp.com/api/auth/user/${props.history.location.pathname.split('/')[2]}`)
        .then(response => response.status === 200 ? setProfileData(response.data) : null)
    } ,)

    
    useEffect(() => {
        axios.get(`https://workforce001.herokuapp.com/api/posts/userposts/${props.history.location.pathname.split('/')[2]}`)
        .then(response => response.status === 200 ? setPosts(response.data) : null)
    })

    document.title = `${profileData.username}`
    return (
        <div className = {classes.Profile}>
            <div className = {classes.profilePic}>
                <img alt = '' height = "300px" width = "300px" src = {profileData.profilePicSrc === "" ? 
                '/images/profile_pic_placeholder.jpg' : profileData.profilePicSrc} />
            </div>
            <h1 className = {classes.Username}>{profileData.username}</h1>
            <span className = {classes.Email}>{profileData.email}</span>
            {profileData.bio !== "" ? <p>profileData.bio</p> : null}
            <h2 className = {classes.UserPosts}>Posts</h2>
            <div className ={classes.Posts}>
                {
                    posts.length > 0 ? 
                    posts.map(post => (
                        <Post key = {post._id} 
                        id = {post._id} 
                        title ={post.title}
                        author = {post.author}
                        release = {post.release_time}
                        />
                    )) : null
                }
            </div>
        </div>
    )
}

export default withRouter(Profile)

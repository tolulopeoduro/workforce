import classes from './Posts.module.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Posts = () => {

    const [posts , loadPosts] = useState([])
    const auth = useSelector(state => state.userData)

    useEffect(() => {
        axios.get('https://workforce001.herokuapp.com/api/posts')
        .then(response => loadPosts(response.data))
    }, [])

    return (
        <div className = {classes.Posts}>
            <Link to = {auth.isLoggedIn ? '/newpost' : '/auth/signin'}><img className = {classes.AddPost} height = '70px' width = '70px' src = {'/images/plus-sign.svg'} alt = '' /></Link>
            <h1 className = {classes.Header}>Posts</h1>
            {
                posts.map(post => (
                    <Post key = {post._id} 
                    id = {post._id} 
                    title ={post.title}
                    author = {post.author}
                    release = {post.release_time}
                     />
                ))
            }
        </div>
    )
}

export default Posts

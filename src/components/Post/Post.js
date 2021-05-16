import classes from './Post.module.scss'
import React from 'react'
import { useHistory, withRouter } from 'react-router'

const Post = (props) => {

    const history = useHistory()

    return (
        <div className = {classes.Post} onClick = {() => props.history.push(`/posts/${props.id}`) }>
            <h3>{props.title}</h3>
            <span className = {classes.Release}>{props.release.split(',')[0]}</span>
            <span className = {classes.Author}>By : {props.author}</span>
        </div>
    )
}

export default withRouter(Post)

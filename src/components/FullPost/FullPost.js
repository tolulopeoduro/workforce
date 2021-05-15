import classes from './FullPost.module.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import parse from 'html-react-parser'
import Prism from "prismjs";
import './prism.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Backdrop2 from '../Backrop2/Backdrop2'
import Spinner from '../Spinner/Spinner'

const FullPost = (props) => {

    const [data , setData] = useState(null)
    const [content , setContent] = useState("")
    const [deletePrompt , toggleDeletePrompt] = useState(false)

    const auth = useSelector(state => state.userData)


    const editPost = () => {
        if (auth.data.userId === data.userId) {
            props.history.push(`/editor/${props.history.location.pathname.split('/')[2]}`)
        } else {
            console.log('no')
        }
    }

    useEffect(() => {
        axios.get(`https://workforce001.herokuapp.com/api/posts/${props.history.location.pathname.split('/')[2]}`)
        .then((response) => {
            setData(response.data)
            setContent(response.data.content)
        })
    } , [])



    useEffect(() => {
        Prism.highlightAll();
      });

    const deletePost = () => {
        let config = {
            headers: {Authorization : `${auth.data.token}`}
    }

        axios.delete(`https://workforce001.herokuapp.com/api/posts/${props.history.location.pathname.split('/')[2]}` , config)
        .then((response) => {
            if (response.status === 200) {
                props.history.goBack()
            }
        })
    }

    return (
        <div className = {classes.FullPost}>
            {
                data ? 
                <React.Fragment>
                    <span>{data.release_time}</span>
                    <div className = {classes.Title}>
                        <h1>{data.title}</h1>
                        <span>By : <Link to = {`/profile/${data.userId}`}>{data.author}</Link></span>
                    </div>
                    {
                        data.userId === auth.data.userId ? 
                        <div className = {classes.EditorOptions}>
                            <br/>
                            <button onClick = {editPost} className = {classes.Edit}>Edit</button>
                            <button onClick = {() => toggleDeletePrompt(true)} className = {classes.Delete}>Delete</button>
                        </div>
                        : 
                        null
                    }
                    {deletePrompt ? 
                        <div className = {classes.deletePrompt}>
                            <span>Are you sure you want to<br/> delete this post?</span>
                            <div>
                                <button onClick = {() => toggleDeletePrompt(false)} className = {classes.Edit}>Cancel</button>
                                <button onClick = {deletePost} className = {classes.Delete}>Delete</button>
                            </div>
                        </div>
                    : null}
                    <div className = {classes.Content}>
                        {content ? parse(content) : <p>Post has no body</p>}
                    </div>
                    <Backdrop2 active = {deletePrompt}/>
                </React.Fragment>
            : <Spinner/>
            }
        </div>
    )
}

export default withRouter(FullPost)

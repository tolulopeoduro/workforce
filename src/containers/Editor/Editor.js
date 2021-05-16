import classes from './Editor.module.scss'
import React, { useEffect , useState } from 'react'
import { Editor as PostEditor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';


const Editor = (props) => {

    const [title , setTitle] = useState("")
    const [content , setContent] = useState("")
    const [initialContent , setInitialContent] = useState("")

    const auth = useSelector(state => state.userData)


    const submit = () => {


        const data = {
            "title": title,
            "content": content,
            author: auth.data.username,
            "release_time": new Date().toLocaleString(),
            "userId": auth.data.userId
        }

        console.log(data)
       

        const url = props.update ? 
        `https://workforce001.herokuapp.com/api/posts/${props.history.location.pathname.split('/')[2]}` 
        : `https://workforce001.herokuapp.com/api/posts`;
        
        
        fetch( url , {
            method : props.update ? 'PUT' : 'POST',
            body : JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
            }    
        }).then(
            (response) => {
                if (response.status === 201 || response.status === 200) {
                    props.history.goBack()
                }
            }
        )
    }
    
    const handleEditorChange = (e) => {
        setContent(e.target.getContent())
    }
    
    const uploadImg = (callback , value , meta) => {
        
    }


    useEffect(() => {
        axios.get(`https://workforce001.herokuapp.com/api/posts/${props.history.location.pathname.split('/')[2]}`)
        .then(
            (response) => {
                if (response.data) {
                    setTitle(response.data.title)
                    setInitialContent(response.data.content)
                }
            }
            )
        } , [])
        document.title = `${props.update ? 'Edit post - Workforce' : 'Create post - Workforce'}`

        return (
            <div className = {classes.Editor}>
            <div className = {classes.Title}>
                <input type = "text" placeholder = "Title" value = {title} onChange ={(e) => setTitle(e.target.value)} />
            </div>
            <div className = {classes.Content}>
            <PostEditor
                apiKey = "4zpxg60v03w6ryq4e084yzkbiogxu2icn46w1w0yzi458h0l"
                initialValue={`${initialContent}`}
                init={{
                    selector : "textarea",
                    height: 500,
                    file_picker_callback : uploadImg(),
                    file_picker_types: 'image file media',
                    images_upload_url: "#",
                    images_upload_handler : () => {
                        setTimeout(() => {} , 2000)
                    } ,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks codesample',
                        'media table paste wordcount code'
                    ],
                    toolbar:
                    [
                        'undo redo | formatselect | bold italic |  ',
                        'alignleft aligncenter alignright |  ',
                        'bullist numlist| image codesample code | help'
                    ]
                }}
                onChange={handleEditorChange}
                />
            </div>
            

            <div className = {classes.UploadPost}>
                <button disabled = {auth.isLoggedIn === false} onClick = {submit}>{props.update ? "Update post" : "Create post"}</button>
            </div>
            {auth.isLoggedIn === false ? <p className = {classes.alert}>please login to save your post</p> : null}
        </div>
    )
}

export default withRouter(Editor)

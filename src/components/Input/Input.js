import classes from './Input.module.scss'
import React from 'react'

const Input = (props) => {
    return (
        <div className = {classes.Input}>
            <input type = {props.type} 
                                name = {props.name} 
                                placeholder = {props.name} 
                                value = {props.value} 
                                onChange = {props.handleChange} 
                                style ={{border : props.errors ? '1px solid red' : null}}
                                />
                                {props.errors ? props.errors : null}
        </div>
    )
}

export default Input

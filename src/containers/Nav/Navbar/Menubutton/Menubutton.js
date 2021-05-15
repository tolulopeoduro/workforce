import classes from './Menubutton.module.scss'
import React from 'react'

const Menubutton = (props) => {
    return (
        <div className = {props.active ?  [classes.Menubutton , classes.active].join(' ') : classes.Menubutton} onClick = {props.handleClick}>
            <div className = {classes.a} ></div>
            <div className = {classes.b} ></div>
            <div className = {classes.c} ></div>
        </div>
    )
}

export default Menubutton

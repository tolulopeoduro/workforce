import classes from './Backdrop.module.scss'
import React from 'react'

const Backdrop = (props) => {
    return (
        <div className = {props.active ? classes.Backdrop : [classes.Backdrop , classes.noDisplay].join(' ')}>
            
        </div>
    )
}

export default Backdrop

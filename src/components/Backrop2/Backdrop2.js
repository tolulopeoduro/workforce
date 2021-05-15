import classes from './Backdrop2.module.scss'
import React from 'react'

const Backdrop2 = (props) => {
    return (
        <div className = {props.active ? classes.Backdrop : [classes.Backdrop , classes.noDisplay].join(' ')}>
            
        </div>
    )
}

export default Backdrop2

import classes from './Layout.module.scss';
import React, { useState } from 'react'
import Main from '../Main/Main';
import Navbar from '../Nav/Navbar/Navbar';
import Backdrop from '../Nav/Backrop/Backdrop';
import Sidebar from '../Nav/Sidebar/Sidebar';

const Layout = () => {
    const [toggle , setToggle] = useState(false)
 
    return (
        <div className = {classes.Layout}>
            <Navbar menuactive = {toggle} handleClick = {() => toggle ? setToggle(false) : setToggle(true)} />
            <Sidebar active = {toggle}/>
            <Backdrop active = {toggle}/>
            <Main/>
        </div>
    )
}

export default Layout;

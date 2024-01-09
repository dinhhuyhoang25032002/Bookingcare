import React from 'react';
import './MenuApp.scss'
import { NavLink } from 'react-router-dom';
let MenuApp = (props) => {

    return (
        <div className="topnav" >
            <NavLink to="/home" exact>Home</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/about1">Feedback</NavLink>

        </div>
    );
}

export default MenuApp;
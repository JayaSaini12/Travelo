import React, { useState } from "react";
import { Link } from "react-router-dom";

import './MainNavigation.css';
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../components/UIElements/Backdrop";

const MainNavigation=props=>{
    const[drawerIsOpen,setDrawerIsOpen]=useState(false);

    const openDrawerHandler=()=>{
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler=()=>{
        setDrawerIsOpen(false);
    }

    return(
        // react.fragmenter is used to use two componentes jsx side by side
        <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
            {/* if drawr is open then this else null */}
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <nav className="main-navigation__drawer-nav">
                <NavLinks/>
            </nav>
        </SideDrawer>
        {/* decides what should render inside mainheader , there we gave props.children, from here it will go there */}
        <MainHeader>
            {/*button to open side drawer */}
            <button className="main-navigation__menu-btn" onClick={openDrawerHandler}> 
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">YourPlaces</Link>
                {/* link is used to make things clicable and linkable and to for to come come to what page */}
            </h1>
            <nav className="main-navigation__header-nav">
                <NavLinks/>
            </nav>
        </MainHeader>
        </React.Fragment>
    )
};

export default MainNavigation;
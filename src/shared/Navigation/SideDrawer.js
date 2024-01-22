import React from "react";
import ReactDOM from 'react-dom';
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer=props=>{
        const content=(
        <CSSTransition
         in={props.show}
         timeout={200}
         classNames="slide-in-left"
         mountOnEnter
         unmountOnExit>
            <aside className="side-drawer" onclick={props.onclick}>
            {props.children}
            </aside>
        </CSSTransition>)
        //portal allows to render component in different place not in that nested code in whole dom tree inside
        return ReactDOM.createPortal(content,document.getElementById('drawer-hook'));
};

export default SideDrawer;
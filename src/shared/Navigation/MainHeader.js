import React from "react";

import './MainHeader.css';

const MainHeader=props=>{
    return(
        <header className="main-header">
            {props.children}
            {/* in place of props.children from mainnav file it will come here what to render */}
        </header>
    )
}

export default MainHeader;
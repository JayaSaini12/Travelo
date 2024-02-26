//here we will have links of navigation like which all pages
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import './NavLinks.css';
import { AuthContext } from "../../context/auth-context";

const NavLinks=props=>{//this component will rerender whenever this context changes
    const auth=useContext(AuthContext);

    return (
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            ALL USERS
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>LOGOUT</button>
          </li>
        )}
      </ul>
    );
  };
  
  export default NavLinks;
  
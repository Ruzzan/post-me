import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light p-1 bg-light">
        <ul className="navbar-nav mx-auto">
        <Link to="/" className="nav-link"> Home </Link>
        <Link to="/create" className="nav-link"> Create </Link>
        <Link to="/login" className="nav-link"> Login </Link>
        </ul>
        </nav>
    )
}

export default Navbar;
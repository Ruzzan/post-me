import React,{useContext,useEffect} from 'react';
import {Link} from "react-router-dom";
import { UserContext } from '../context/UserContext';
const Navbar = () => {
    const {user,isAuth} = useContext(UserContext);
    useEffect(()=>{
        const checkUser = () => {
            isAuth();
        }
        checkUser();
    },[])
    return (
        <nav className="navbar navbar-expand-md navbar-light p-1 bg-light">
        <ul className="navbar-nav mx-auto">
        <Link to="/" className="nav-link"> Home </Link>
        <Link to="/create" className="nav-link"> Create </Link>
        {user.isAuthenticated === false ? (<Link to="/login" className="nav-link"> Login </Link>) : (<Link to="/logout" className="nav-link"> Logout ({user.user.username}) </Link>)}
        </ul>
        </nav>
    )
}

export default Navbar;
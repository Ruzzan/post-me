import React,{useContext,useEffect} from 'react';
import {Link,useHistory} from "react-router-dom";
import { UserContext } from '../context/UserContext';
const Navbar = () => {
    const {user} = useContext(UserContext);
    // const history = useHistory();
    // useEffect(()=> {
    //     const checkUser = () => {
    //       authenticateUser();
    //       if(!user.isAuthenticated) {
    //           history.push('/login')
    //       }
    //     }
    //     checkUser();
    // },[])
    return (
        <nav className="navbar navbar-expand-md navbar-light p-1 bg-light">
        <ul className="navbar-nav mx-auto">
        <Link to="/" className="nav-link"> Home </Link>
        <Link to="/create" className="nav-link"> Create </Link>
        {user.isAuthenticated === false ? (<>
            <Link to="/login" className="nav-link"> Login </Link> <Link to="/signup" className="nav-link"> Signup </Link>
            </>) :
            (<>
                <Link to="/user" className="nav-link">{user.user.username} </Link>
                <Link to="/logout" className="nav-link"> Logout </Link>
            </>)
        }
        </ul>
        </nav>
    )
}

export default Navbar;
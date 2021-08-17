import React,{useEffect,useContext} from 'react';
import {UserContext} from '../../context/UserContext';
import {Link} from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(UserContext);

    useEffect(()=>{
        const clearUser = async () => {
            await logout();
        }
        clearUser()
    },[])

    return (
        <div className="col-md-4 mx-auto my-3">
        <h5>Loggout</h5>
        <p className="lead text-danger">You Have Been Logged Out.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
    )
}

export default Logout;

import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../context/UserContext';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const{ login } = useContext(UserContext);

    const [err,setErr] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    let history = useHistory();
    const handleRedirect = () =>{
        setTimeout(()=>history.push('/'),1000);
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        let url = "https://postme.pythonanywhere.com/api/dj-rest-auth/login/";
        let body = JSON.stringify({username:username,password:password});

        let axiosConfig = {
            headers: {'Content-Type': 'application/json',}
          };

        axios.post(url,body,axiosConfig)
        .then((data)=>{
            setErr(false);
            login(
                data.data['key'],
                data.data['user']['pk'],
                data.data['user']['username']
            )
        })
        .then(()=>handleRedirect())
        .catch((err)=>{
            setErr(true);
        })
    }

    return (
        <div className="col-md-4 mx-auto my-3">
        <form className="card p-3" onSubmit={loginSubmit}>
        <h5>Login</h5>
        {err && (<span className="text-danger">Invalid Credentials</span>)}
        <input type="text" className="form-control my-2" placeholder="Username" onChange={handleUsername} />
        <input type="password" className="form-control my-2" placeholder="Password" onChange={handlePassword} />
        <button className="btn btn-primary">Login</button>
        </form>
        </div>
    )
}

export default Login;
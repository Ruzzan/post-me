import React,{useState,useContext} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import { UserContext } from '../../context/UserContext';

const Signup = () => {
    const [err,setErr] = useState(false);
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");

    const {login} = useContext(UserContext);
    const history = useHistory();

    const signupSubmit = async (e) => {
        e.preventDefault();
        let url = "https://postme.pythonanywhere.com/api/dj-rest-auth/register/";
        
        let data = {
            username:username,
            email:email,
            password1:password1,
            password2:password2
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await axios.post(url,JSON.stringify(data),axiosConfig)
        .then((response)=>{
            console.log(response.data)
            if(response.status===400) {
                setErr(true);
            } else if(response.status===201) {
                login(
                    response.data['key'],
                    response.data['user']['pk'],
                    response.data['user']['username']
                )
                setTimeout(()=>history.push('/'),2000);
            }
        })
        .catch((err)=>setErr(true))
    }

    return (
        <div className="col-md-4 mx-auto my-3">
        <form className="card p-3"  onSubmit={signupSubmit}>
        <h5>Signup</h5>
        {err && (<span className="text-danger">Invalid Data.Try Again</span>)}
        <input type="text" className="form-control my-2" placeholder="Username" 
        onChange={(e)=>setUsername(e.target.value)} />
        <input type="email" className="form-control my-2" placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className="form-control my-2" placeholder="Password"
        onChange={(e)=>setPassword1(e.target.value)}/>
        <input type="password" className="form-control my-2" placeholder="Confirm Password" onChange={(e)=>setPassword2(e.target.value)}/>
        <button className="btn btn-primary">Signup</button>
        </form>
        </div>
    )
}

export default Signup;
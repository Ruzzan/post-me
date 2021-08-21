import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {useHistory} from 'react-router-dom';

const CreateForm = () => {
    const {user,authenticateUser} = useContext(UserContext);
    var authorID = user.isAuthenticated ? user.user.pk : "";
    const [data,setData] = useState({author:authorID,title:'',body:''})
    const [loading,setLoading] = useState(false);
    const [created,setCreated] = useState(false);
    let history = useHistory();

    const url = 'http://127.0.0.1:8000/api/';
    
    useEffect(()=>{
        const checkUser = () => {
            authenticateUser();
            if(user.isAuthenticated) {
                console.log(data)
            } else {
                history.push('/login');
            }
        }
        checkUser();
    },[])

    const handleTitle = (event) => {
        setData((data)=>({
            ...data,
            title:event.target.value,
        }));
        console.log(data)
    }

    const handleBody = (event) => {
        setData((data)=>({
            ...data,
            body:event.target.value
        }));
        console.log(data)
    }

    const formSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + 'ccb2cf08d6912c2254b23660e9cdbafa301fea8f'
            }
          };
        const response = await axios.post(url,JSON.stringify(data),axiosConfig);
        setLoading(true);
        if(response.status === 201) {
            setLoading(false);
            setData({author:"",title:"",body:""})
            setLoading(false);
            setCreated(true);
            setTimeout(()=>history.push('/'),2000)
        }
    }

    return(
        <div className="container my-3">
        <div className="row">
        <div className="col-md-6 mx-auto card p-3">
        <form onSubmit={formSubmit}>
        <h4>Create Post</h4>
        {created && (<h5 className="text-success">Successfully Created Post.</h5>)}
        <input className="form-control my-2" placeholder="Title" value={data.title} onChange={handleTitle} />
        <textarea className="form-control my-2" placeholder="Body" value={data.body} onChange={handleBody} />
        <button className="btn btn-success my-2" disabled={loading} >Submit</button>
        </form>
        </div>
        </div>
        </div>
    )
}

export default CreateForm;
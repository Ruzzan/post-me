import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {useHistory,useParams} from 'react-router-dom';

const EditPost = () => {
    const {user} = useContext(UserContext);

    let history = useHistory();
    let {postId} = useParams();

    const [data,setData] = useState({
        id:postId,
        author:user.user.pk,
        title:"",
        body:"",
    })
    const [loading,setLoading] = useState(false);
    const [created,setCreated] = useState(false);

    const url = `http://127.0.0.1:8000/api/user/${postId}/`;
    
    useEffect(()=>{
        const fetchPost = async () => {
            if(user.isAuthenticated) {
                const response = await axios.get(url,{
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + user.user.token
                    }
                })
                setData({
                    title:response.data.title,
                    body:response.data.body
                })
            } else {
                history.push('/login');
            }
        }
        fetchPost();
    },[])

    const handleTitle = (event) => {
        setData((data)=>({
            ...data,
            title:event.target.value,
        }));
    }

    const handleBody = (event) => {
        setData((data)=>({
            ...data,
            body:event.target.value
        }));
    }

    const updatePost = async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await axios.patch(url,data,{
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + user.user.token
        }
    });
        if(response.status === 200) {
            setLoading(false);
            setCreated(true);
        }
    }

    return(
        <div className="container my-3">
        <div className="row">
        <div className="col-md-6 mx-auto card p-3">
        <form onSubmit={updatePost}>
        <h4>Update Post</h4>
        {created && (<h5 className="text-primary">Successfully Updated Post.</h5>)}
        <input className="form-control my-2" placeholder="Title" value={data.title} onChange={handleTitle} />
        <textarea className="form-control my-2" placeholder="Body" value={data.body} onChange={handleBody} />
        <button className="btn btn-success my-2" disabled={loading}>{loading ? "Updating" : "Update"}</button>
        </form>
        </div>
        </div>
        </div>
    )
}

export default EditPost;
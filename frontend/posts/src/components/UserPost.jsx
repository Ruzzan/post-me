import React,{useState,useContext} from 'react';
import {Link} from "react-router-dom";
import { UserContext } from '../context/UserContext';
const axios = require('axios').default;

export const Post = ({data}) => {

    const {user} = useContext(UserContext);
    const [deleted,setDeleted] = useState(false);

    const deletePost = async (id) => {
        let url = `https://postme.pythonanywhere.com/api/user/${id}/`;
        const response = await axios.delete(url,{
            headers:{Authorization: 'Token '+user.user.token}
        });
        if(response.status===204) {
            setDeleted(true);
        }
    }

    return (
        <div className="my-2 list-group-item list-group-item-action p-1">
        <Link to={"/post/"+data.id}><h5> {data.title} </h5></Link>
        <p className="my-1"> {data.body} </p>
        <small> {data.timestamp} </small>
        <Link to={"/edit/"+data.id} className="btn btn-warning btn-sm">Edit</Link>
        <button className="btn btn-danger btn-sm mx-2" disabled={deleted}
        onClick={()=>deletePost(data.id)}>{ deleted ? 'Deleted' : 'Delete' }</button>
        </div>
    )
}
import React from 'react';
import {Link} from "react-router-dom";
export const Post = ({data}) => {
    return (
        <div className="my-2 list-group-item list-group-item-action p-1">
        <Link to={"/post/"+data.id}><h5> {data.title} </h5></Link>
        <p className="my-1"> {data.body} </p>
        <small> {data.timestamp} </small>
        </div>
    )
}
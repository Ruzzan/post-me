import React from 'react';
export const Post = ({data}) => {
    return (
        <div className="my-2 list-group-item list-group-item-action p-1">
        <h5> {data.title} </h5>
        <p className="my-1"> {data.body} </p>
        <small> {data.timestamp} </small>
        </div>
    )
}
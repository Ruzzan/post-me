import React,{useState,useEffect} from 'react';
import {Post} from './Post';

const axios = require('axios').default;

const PostList = () => {
    const [posts,setPosts] = useState([]);
    const [next,setNext] = useState('');
    const [previous,setPrevious] = useState('');
    const [url, setURL] = useState('http://127.0.0.1:8000/api/');
    useEffect(()=>{
        const fetchAPI = async () => {
            const response = await axios.get(url,{
            headers:{
                Authorization: 'Token ' + 'ccb2cf08d6912c2254b23660e9cdbafa301fea8f'
            }
            });
            setPosts(response.data.results);
            setNext(response.data.next);
            setPrevious(response.data.previous);
            console.log(response.data.next)
            console.log(response.data.previous)
        }
        fetchAPI();
    },[url]);

    const getPrevPage = () => {
        setURL(previous)
    }

    const getNextPage = () => {
        setURL(next)
    }

    return (
        <div className="container">
        <div className="row">
        <div className="col-md-6 mx-auto list-group">
        <h3 className="my-2"> Posts </h3>
        {posts.map((post) => {
            return <Post data={post} key={post.id} />
        })}

        <div className="my-2 d-flex justify-content-between">
        {previous ? (<a className="btn btn-primary" onClick={()=>getPrevPage()}>Prev</a>) : null }
        {next && (<a className="btn btn-primary" onClick={()=>getNextPage()}>Next</a>)}
        </div>
        </div>
        </div>
        </div>
    )
}

export default PostList;
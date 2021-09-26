import React,{useState,useEffect,useContext} from 'react';
import {Post} from './Post'; 
import { UserContext } from '../context/UserContext';
import {useHistory} from 'react-router-dom';

const axios = require('axios').default;

const PostList = () => {
    const [posts,setPosts] = useState([]);
    const [next,setNext] = useState('');
    const [previous,setPrevious] = useState('');

    const [url, setURL] = useState('https://postme.pythonanywhere.com/api/');
    let history = useHistory();
    const {user,authenticateUser} = useContext(UserContext);

    useEffect(()=>{
        const fetchAPI = async () => {
            authenticateUser()
            if(user.isAuthenticated) {
                const response = await axios.get(url,{
                    headers:{Authorization: 'Token '+user.user.token}
                    });
                    setPosts(response.data.results);
                    setNext(response.data.next);
                    setPrevious(response.data.previous);
            } else {
                history.push('/login')
            }
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
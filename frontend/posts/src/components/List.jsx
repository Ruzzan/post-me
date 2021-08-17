import React,{useState,useEffect,useContext} from 'react';
import {Post} from './Post'; 
import { UserContext } from '../context/UserContext';
import {useHistory} from 'react-router-dom';

const axios = require('axios').default;

const PostList = () => {
    const [posts,setPosts] = useState([]);
    const [next,setNext] = useState('');
    const [previous,setPrevious] = useState('');

    const [url, setURL] = useState('http://127.0.0.1:8000/api/');
    
    const {user,isAuth} = useContext(UserContext)

    let history = useHistory();

    useEffect(()=>{
        const checkUserStatus = () => {
        isAuth();
        if(!(user.isAuthenticated)) {
            history.push('/login')
        }
        console.log(user.user.token)
        console.log("authenticated in list")
        }
        checkUserStatus()
    },[])

    useEffect(()=>{
            const fetchAPI = async () => {
                const response = await axios.get(url,{
                headers:{Authorization: 'Token '+user.user.token}
                });
                setPosts(response.data.results);
                setNext(response.data.next);
                setPrevious(response.data.previous);
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
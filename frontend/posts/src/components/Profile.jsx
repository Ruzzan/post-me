import React,{useState,useEffect,useContext} from 'react';
import {Post} from './UserPost'; 
import { UserContext } from '../context/UserContext';
import {useHistory} from 'react-router-dom';

const axios = require('axios').default;

const Profile = () => {
    const [posts,setPosts] = useState([]);

    const url = 'https://postme.pythonanywhere.com/api/user/';
    let history = useHistory();
    const {user,authenticateUser} = useContext(UserContext);

    useEffect(()=>{
        const fetchAPI = async () => {
            authenticateUser()
            if(user.isAuthenticated) {
                const response = await axios.get(url,{
                    headers:{Authorization: 'Token '+user.user.token}
                    });
                    setPosts(response.data);
            } else {
                history.push('/login')
            }
        }
        fetchAPI();   
    },[]);

    return (
        <div className="container">
        <div className="row">
        <div className="col-md-6 mx-auto list-group">
        <h3 className="my-2"> My Posts </h3>

        {posts.map((post) => {
            return <Post data={post} key={post.id}/>
        })}

        </div>
        </div>
        </div>
    )
}

export default Profile;
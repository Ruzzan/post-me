import React,{useEffect,useContext,useState} from 'react';
import {UserContext} from '../context/UserContext';
import axios from 'axios';
import {useParams,useHistory} from "react-router-dom";

const PostDetail =  () => {
    const {postId} = useParams();
    const history = useHistory();

    const [post,setPost] = useState({});
    const [loading,setLoading] = useState(false);

    const {user} = useContext(UserContext);
    let token = user.user.token == null ? "" : user.user.token;
    const url = `https://postme.pythonanywhere.com/api/${postId}/`;

    // this will check the user state and fetch data

    useEffect(()=>{
        const fetchPost = () => {
          if(!user.isAuthenticated) {
              history.push('/login')
          }
          else {
            setLoading(true);
            axios.get(url,{
                headers:{Authorization:"Token "+token}
            }).then((data)=>{
                setPost(data.data);
                setLoading(false);
            })
          }
        }
        fetchPost()
    },[])

    return (
        <div className="col-md-8 mx-auto my-3">
        {loading ? 
        <h6 className="text-center">Loading...</h6>
        :
        (
        <div className="card p-1">
        <h5>{post.title}</h5>
        <small>{post.timestamp}</small>
        <p className="lead"> {post.body} </p>
        </div>
        )
        }
        </div>
    );
}

export default PostDetail;







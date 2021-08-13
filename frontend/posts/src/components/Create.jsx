import React,{useState} from 'react';
import axios from 'axios';

const CreateForm = () => {
    const [data,setData] = useState({author:'1',title:'',body:''})
    const url = 'http://127.0.0.1:8000/api/';

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
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + 'ccb2cf08d6912c2254b23660e9cdbafa301fea8f'
            }
          };
        const response = await axios.post(url,JSON.stringify(data),axiosConfig)
        console.log(response);
        console.log("post")
    }

    return(
        <div className="container my-3">
        <div className="row">
        <div className="col-md-6 mx-auto card p-3">
        <form onSubmit={formSubmit}>
        <h4>Create Post</h4>
        <input className="form-control my-2" placeholder="Title" value={data.title} onChange={handleTitle} />
        <textarea className="form-control my-2" placeholder="Body" value={data.body} onChange={handleBody} />
        <button className="btn btn-success my-2">Submit</button>
        </form>
        </div>
        </div>
        </div>
    )
}

export default CreateForm;
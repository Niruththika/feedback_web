import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';


const Add = () => {

  const ads = {
   
    adname:"",
    descript:"",
    
  }

  const [user, setUser] = useState(ads);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/create", user);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      toast.error("An error occurred. Please try again later.", { position: "top-right" });
      console.error(error);
    }
  };

 
   
  return (
    <div className='addreview'>
    <Link to={"/"} className="block mb-4">Back</Link>
    <h3 className="text-2xl font-bold mb-4">Add new Advertisement</h3>
    <form className='addreviewForm' onSubmit={submitForm}>
        <div className="mb-4">
            <label htmlFor="adname" className="block text-sm font-medium text-gray-700">Advertisement name</label>
            <input type="text" onChange={inputHandler} id="adname" name="adname" autoComplete='off' placeholder='Advertisement name' className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
            <label htmlFor="descript" className="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" onChange={inputHandler} id="descript" name="descript" autoComplete='off' placeholder='Description' className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">ADD Advertisement</button>
        </div>
    </form>
</div>

  )
}

export default Add
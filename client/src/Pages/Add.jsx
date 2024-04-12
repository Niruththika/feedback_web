import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';


const Add = () => {
  const [name, setName] = useState("");
  const [des, setDec] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/create",
        { 
          rating,
          name,
          des
        }
      )

      .then((result) => {
        console.log(result);
        alert('Review added successfully!');
        navigate('/');
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        toast.success("Your details are Created",{position:"top-right"})
        navigate("/");

      } else {
        throw new Error(response.data || "Failed to create UserDetails");
      }
    } catch (error) {
      console.error("Error creating UserDetails:", error);
      toast.error("Error Creating UserDetails: ", error,{position:"top-right"});
    }
  };

  
   
  return (
    <div className='bg-slate-200 rounded-lg py-7 w-[500px] h-[500px] ml-80'>
    <Link to={"/"} className="block mb-4">Back</Link>
    <h3 className="text-2xl font-bold mb-4">Add new Review</h3>
    <form className='addreviewForm' onSubmit={handleSubmit}>
    <div className="mb-4">
            <label htmlFor="adname" className="text-xl mb-2 block text-sm font-medium text-gray-700">Product Rating</label>
            <input type="range" min="1" max="5" step="1" 
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            id="adname" 
            name="adname" 
            autoComplete='off' 
            className='w-80 w-[400px] h-[40px] px-2 rounded-lg' />
        </div>
        <div className="mb-4">
            <label htmlFor="adname" className="text-xl mb-2 block text-sm font-medium text-gray-700">product name</label>
            <input type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="adname" 
            name="adname" 
            autoComplete='off' 
            placeholder='product name' 
            className='w-80 w-[400px] h-[40px] px-2 rounded-lg' />
        </div>
        <div className="mb-4">
            <label htmlFor="descript" className="text-xl mb-2 block text-sm font-medium text-gray-700">review</label>
            <input type="text" 
            value={des}
            onChange={(e) => setDec(e.target.value)}
            id="descript" name="descript" 
            autoComplete='off' 
            placeholder='Description' 
            className='w-80 w-[400px] h-[40px] px-2 rounded-lg'/>
        </div>
        <div className="mb-4">
            <button type="submit" className='bg-green-600 mt-9 px-4 py-2 rounded-3xl text-white'>ADD Review</button>
        </div>
    </form>
</div>

  )
}

export default Add
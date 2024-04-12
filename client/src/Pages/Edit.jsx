import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getone/${id}`) // Fix the URL interpolation
      .then((result) => {
        console.log("vfdfdfdf", result);
        setRating(result.data.data.rating);
        setName(result.data.data.name);
        setDes(result.data.data.des); // Fix state variable name
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/update/${id}`, {
        rating,
        name,
        des,
      })
      .then((result) => {
        console.log(result);
        alert('Review updated successfully!');
        navigate('/');
      });
  };

  return (
    <div className='bg-slate-200 rounded-lg py-7 w-[500px] h-[500px] ml-80'>
      <Link to={"/"} className="text-blue-500">Back</Link>
      <h3 className="text-2xl font-bold mb-4">Update Review</h3>
      <form className='addreviewForm' onSubmit={handleUpdate}>

        <div className="inputGroup">
          <label htmlFor="rating" className="text-xl mb-2 block text-sm font-medium text-gray-700">Rating (?/5)</label>
          <input type="range" min="1" max="5" step="1" onChange={(e) => setRating(e.target.value)} id="rating" name="rating" className='w-80 w-[400px] h-[40px] px-2 rounded-lg' autoComplete='off' placeholder='Product Rating' />
        </div>

        <div className="inputGroup">
          <label htmlFor="name" className="text-xl mb-2 block text-sm font-medium text-gray-700">First name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" className='w-80 w-[400px] h-[40px] px-2 rounded-lg' autoComplete='off' placeholder='Product name' />
        </div>

        <div className="inputGroup">
          <label htmlFor="des" className='text-xl mt-2 block text-sm font-medium text-gray-700'>Review</label>
          <input type="text" value={des} onChange={(e) => setDes(e.target.value)} id="des" name="des" autoComplete='off' className='w-80 w-[400px] h-[40px] px-2 rounded-lg' placeholder='Review' />
        </div>

        <div className="inputGroup">
          <button type="submit" className='bg-green-600 mt-9 px-4 py-2 rounded-3xl text-white'>UPDATE REVIEW</button>
        </div>

      </form>
    </div>
  );
};

export default Edit;

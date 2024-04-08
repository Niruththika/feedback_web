import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';


const Edit = () => {

 const users = {
  Rating:"",
    pname: "",
    Review: "",

 }

 const {id} = useParams();
 const navigate = useNavigate();
 const [user, setUser] = useState(users);

 const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
 }

 useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
 },[id])


 const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
 }

 const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);

    const handleClick = value => {
      setCurrentValue(value)
    }
  
    const handleMouseOver = newHoverValue => {
      setHoverValue(newHoverValue)
    };
  
    const handleMouseLeave = () => {
      setHoverValue(undefined)
    }

  return (
    <div className='bg-slate-200 rounded-lg py-7 w-[500px] h-[500px] ml-80'>
        <Link to={"/"} className="text-blue-500">Back</Link>
        <h3 className="text-2xl font-bold mb-4" >Update Review</h3>
        <form className='addreviewForm'  onSubmit={submitForm}>
        <div className="inputGroup">
                <label htmlFor="Rating" className="block mb-2 text-3xl">Rating count</label><br></br>
                <input type="range" min="1" max="5" step="1" onChange={inputChangeHandler} id="Rating" name="Rating" autoComplete='off' placeholder='Rating count '  />
               
            </div>

            <div className="inputGroup">
                <label htmlFor="productname" className=" text-xl mb-2 block text-sm font-medium text-gray-700 ">First name</label>
                <input type="text" value={user.productname} onChange={inputChangeHandler} id="productname" name="productname" className='w-80  w-[400px] h-[40px] px-2 rounded-lg' autoComplete='off' placeholder='Product name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="Review"  className='text-xl mt-2 block text-sm font-medium text-gray-700 '>Review</label>
                <input type="text" value={user.review}  onChange={inputChangeHandler} id="Review" name="Review" autoComplete='off'className='w-80 w-[400px] h-[40px] px-2 rounded-lg'   placeholder='Review' />
            </div>
            <div className="inputGroup">
                <button type="submit" className='bg-green-600 mt-9 px-4 py-2 rounded-3xl text-white'>ADD REVIEW</button>
            </div>
        </form>
    </div>
  )
}


    
export default Edit
import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'
import tea from '../assets/tea.png'

const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    }

    fetchData();

  }, [])

  const deletereview = async (userId) => {
    await axios.delete(`http://localhost:8000/api/delete/${userId}`)
      .then((respones) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
        toast.success(respones.data.msg, { position: 'top-right' })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='userTable'>
      <Link to={"/addUser"} className='addButton -ml-[900px] bg-green-500 text-white px-4 py-2 rounded-2xl'>Add Review</Link>

      {
        users.map((user, index) => (


          <div key={user._id} className='flex bg-gray-200 rounded-3xl ml-24 mt-6 w-[1000px] h-[215px]'>
             <img src={tea} alt="tea"  className='w-50 h-50 p-4'/>
             
            <div className='flex-2 px-2 py-4'>
              <h1 className='font-bold -ml-14  text-pretty text-2xl'>{user.productname}</h1>
              <p className='mr-15 text-2xl text-center mt-5'> {user.Rating} out of 5</p>
              <p className='text-center p-2 '>{user.Review}</p>
              <div className='flex justify-center mt-5 ml-96'>
                <button onClick={() => deletereview(user._id)} className='bg-red-500 text-white rounded-2xl px-4 py-1 mr-2'>Delete</button>
                 <Link to={`/edit/`+user._id} className='bg-red-500 text-white rounded-2xl px-4 py-1 mr-2'>Update</Link>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default User;

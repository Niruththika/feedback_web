import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'
import tea from '../assets/tea.png'

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getall") // Provide the correct URL here
      .then((result) => {
        console.log("data: ", typeof result.data.data); // Check the fetched data
        console.log("data: ", Object.values(result.data.data)); // Check the fetched data
        setUsers(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors
  }, []);
  

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/delete/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
        toast.success("Your details are Deleted", { position: "top-right" });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='userTable'>
      <Link to={"/addUser"} className='addButton -ml-[900px] bg-green-500 text-white px-4 py-2 rounded-2xl'>Add Review</Link>

      {
        users.map((user, index) => (
          <div key={user._id} className='flex bg-gray-200 rounded-3xl ml-24 mt-6 w-[1000px] h-[250px]'>
            <img src={tea} alt="tea" className='w-50 h-50 p-4' />
            <div className='flex-2 px-2 py-4'>
              <h1 className='font-bold mr-96  text-pretty text-2xl'>{user.name}</h1>
              <p className='mr-80 text-2xl text-center mt-5'> {user.rating} out of 5</p>
              <p className='text-center p-2 '>{user.des}</p>
              <div className='flex justify-center mt-5 ml-96'>
                <button onClick={() => handleDelete(user._id)} className='bg-red-500 text-white rounded-2xl px-4 py-1 mr-2'>Delete</button>
                <Link to={`/edit/${user._id}`} className='bg-red-500 text-white rounded-2xl px-4 py-1 mr-2'>Update</Link>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default User;

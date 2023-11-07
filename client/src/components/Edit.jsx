import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
    const navigate = useNavigate()
    const [food, setFood] = useState({ picture:'' })
    const { id } = useParams()

    useEffect(() =>{
        const getFood = async () =>{
            try {
                const token = localStorage.getItem('token')

                const response = await axios.get(`http://localhost:8000/api/foods/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setFood(response.data)
                
            } catch (error) {
                console.error('Error getting food', error)
            }
        }
        getFood()
    }, [id])


    const handleFormSubmit = async (event) => {
      event.preventDefault()
      const confirmEdit = window.confirm('Are you sure you want to edit this?')
      const updatedFood = {
          name: event.target.elements.name.value,
          description: event.target.elements.description.value,
          rating: event.target.elements.rating.value,
      }
      
      
      // console.log('Updated Food:', updatedFood) 
      if (confirmEdit){
      try {
          const token = localStorage.getItem('token')
          const response = await axios.put(`http://localhost:8000/api/foods/${id}`, updatedFood, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  // 'Content-Type': 'application/json',
              },
          })
          // console.log('Response Data:', response.data)
          setFood(response.data)
          navigate(`/foods/${id}`)
      } catch (error) {
          console.error('Error updating food:', error.response ? error.response.data : error.message)
      }
    } else{
      return handleBack()
    }
  }

    const handleBack = () =>{
        navigate(`/foods/${id}`)
    }

  
  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='w-full max-w-xl mx-auto bg-white bg-opacity-50 p-5 rounded-2xl shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <button onClick={handleBack}  className='bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors'>
            ← Back
          </button>
          <Link to='/home' className='bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors'>
            Home
          </Link>
        </div>
        <h1 className='text-4xl font-bold text-purple-800 mb-6 text-center'>Edit Food Entry</h1>
        {food && (
          <form onSubmit={handleFormSubmit} className='space-y-4'>
            <input 
              type="text" 
              name="name" 
              placeholder="Food Name" 
              required 
              defaultValue={food.name}
              className='w-full p-2 mb-2 rounded-2xl border border-purple-300'
            />
            <textarea 
              name="description" 
              placeholder="Description"
              defaultValue={food.description} 
              className='w-full p-2 mb-2 rounded-2xl border border-purple-300 h-32'
            ></textarea>
            <input 
              type="number" 
              name="rating" 
              min="1" 
              max="10" 
              placeholder="Rating" 
              required 
              defaultValue={food.rating}
              className='w-full p-2 mb-2 rounded-2xl border border-purple-300'
            />
            <div className='flex items-center justify-center mb-4'>
              <input 
                type="file" 
                name="picture" 
                className='file:bg-purple-800 file:border-none file:px-4 file:py-2 file:rounded-full file:text-white file:font-bold'
              />
            </div>
            {food.picture && (
              <div className='flex justify-center mb-4'>
                <img 
                  src={`http://localhost:8000/${food.picture}`} 
                  alt="Current" 
                  className='w-24 h-24 object-cover rounded-full'
                />
              </div>
            )}
            <div className='flex items-center justify-center'>
              <button type="submit" className='bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full w-full transition-colors'>
                Update Food
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Edit
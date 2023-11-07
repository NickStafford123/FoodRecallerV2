import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/home.css'



const Home = () => {
    const navigate = useNavigate()
    const [foods, setFoods] = useState([])
    const [showForm, setShowForm] = useState(false)

    const toggleForm = () =>{
        setShowForm(!showForm)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const token = localStorage.getItem('token')
       
        // if (!token) {
        //     console.error("No token found in localStorage. User might not be logged in.")
        //     return
        // }

        try {
          const token = localStorage.getItem('token')
          const response = await axios.post('http://localhost:8000/api/foods/add', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setFoods([...foods, response.data])
          toggleForm() 
        } catch (error) {
          console.error('Error adding food:', error.response.data)
        }
      }


   
    useEffect(() => {                            
        const fetchFoods = async () => {
          try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:8000/api/foods/getAllFoods', {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            })
            setFoods(response.data)
          } catch (error) {
            console.error('Error fetching foods:', error)
          }
        }
    
        fetchFoods()
      }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

   return (
        <div className='text-purple-800 text-lg'>
          <div>
            <h1 className='text-8xl font-bold'>Food Recaller</h1>
            <div>
              {/* <p>Welcome! You are logged in.</p> */}
              <button onClick={handleLogout} className='bg-clear-200 border border-white hover:bg-purple-700 text-white font-bold py-2 px-5 rounded mb-5 mt-5'>
                Logout
              </button>
            </div>
          </div>
          <div>
            <h1 className='font-bold text-4xl mb-2'>My Food Entries</h1>
            <div>
              <button onClick={toggleForm} className='bg-clear-500 hover:bg-purple-700 border border-white text-white font-bold py-2 px-4 rounded-full mb-10'>
                +
              </button>
              {showForm && (
                <div className="fixed inset-0 bg-gray-200 bg-opacity-50 overflow-y-auto h-full w-full">
                  <form onSubmit={handleFormSubmit} className="container mx-auto my-20 bg-white bg-opacity-75 p-5 rounded-2xl">
                    <input type="text" name="name" placeholder="Food Name" required className="block w-full p-2 mb-3 rounded-2xl" />
                    <textarea name="description" placeholder="Description" className="block w-full p-2 mb-3 rounded-2xl"></textarea>
                    <input type="number" name="rating" min="1" max="10" placeholder="Rating" required className="block w-full p-2 mb-3 rounded-2xl" />
                    <input type="file" name="picture" className="block w-full p-2 mb-3" />
                    <button type="submit" className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Add Food</button>
                    <button onClick={toggleForm} className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-10" >← Back</button>
                  </form>
                </div>
              )}
              <div className="flex flex-wrap -mx-2">
                {foods.map(food => (
                  <div key={food._id} className="px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
                    <div className="flex items-center bg-white bg-opacity-75 p-4 rounded-lg shadow space-x-4">
                      <img src={`http://localhost:8000/${food.picture}`} alt={food.name} className="w-24 h-24 object-cover rounded-full" />
                      <div>
                        <Link to={`/foods/${food._id}`} className="font-bold">{food.name}</Link>
                        <p className="text-sm">Rating: {food.rating}/10</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
}


 
export default Home
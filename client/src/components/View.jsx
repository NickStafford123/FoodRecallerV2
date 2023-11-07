import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const View = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [food, setFood] = useState({ picture:'' })

    useEffect(() => {
        const getFood = async () => {
            try {
                const token = localStorage.getItem('token')

                const response = await axios.get(`http://localhost:8000/api/foods/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setFood(response.data)
                // console.log(response.data)
            } catch (error) {
                console.error('Error getting food', error)
            }
        }

        getFood()
    }, [id])

    const handleDelete = async () => {
      const confirmDelete = window.confirm('Are you sure you want to delete this?')
      if (confirmDelete){
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`http://localhost:8000/api/foods/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        
            navigate('/home')
        } catch (error) {
            console.error('Error deleting food', error.response ? error.response.data : error.message)
        }
      } else{
        navigate(`/foods/${id}`)
      } 
    }

    const handleEdit = () =>{
        navigate(`/edit/${id}`)
    }


   return (
        <div className="flex flex-col items-center justify-center min-h-screen  py-8  text-purple-800">
          <Link to={'/home'} className="text-purple-600 hover:text-purple-700 text-lg font-bold mb-4">
            ← Home
          </Link>
          <div className="w-full max-w-2xl px-8 py-4 bg-white bg-opacity-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">{food.name}</h1>
            {food.picture && (
              <img
                className="w-24 md:w-96 h-auto rounded-lg mb-4"
                src={`http://localhost:8000/${food.picture}`}
                alt={food.name}
              />
            )}
            <p className="text-lg "><span className="font-bold">Description:</span> {food.description}</p>
            <p className="text-lg mb-4"><span className="font-bold">Rating:</span> {food.rating}/10</p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
     )

}

export default View
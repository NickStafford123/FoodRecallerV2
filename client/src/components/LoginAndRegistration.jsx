import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginAndRegistration = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials(prevState => ({
        ...prevState,
        [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        const url = `http://localhost:8000/api/users/${isLogin ? 'login' : 'register'}`
    
        try {
        const { data } = await axios.post(url, credentials)
        if (data.token) {
            localStorage.setItem('token', data.token)
            setMessage(`Successfully ${isLogin ? 'logged in' : 'registered'} `)
            navigate('/home') 
        } else {
            setMessage('Successfully registered, you can login now')
        }
        } catch (error) {
        let errorMessage = 'Failed to perform action'
        if (error.response) {
            if (error.response.data.errors && error.response.data.errors.length > 0) {
            errorMessage = error.response.data.errors.join(',')
            } else if (error.response.data) {
            errorMessage = error.response.data
            }
        }
        setError(errorMessage)
        }
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-20 text-lg rounded-2xl text-purple-800">
        <div className="w-full max-w-md p-8 bg-white rounded-lg bg-opacity-50 shadow-md text-6xl mb-6">
            <h1>Food Recaller</h1>
        </div>
        <div>
            <div className='mb-6'>
                <h2 className="text-2xl text-center  font-semibold">{isLogin ? 'Login' : 'Register'}</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    {message && <div className="alert alert-success">{message}</div>}
                    <input
                    className="w-full p-3 text-gray-700 bg-gray-200 rounded border border-gray-300 focus:border-purple-500 focus:outline-none focus:ring"
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    />
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <div>
                    <input
                    className="w-full p-3 text-gray-700 bg-gray-200 rounded border border-gray-300 focus:border-purple-500 focus:outline-none focus:ring"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    />
                </div>
                <button type="submit" className="w-full p-3 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-sm text-purple-500 hover:text-purple-700">
            {isLogin ? 'Need an account? Register here' : 'Have an account? Login here'}
            </button>
        </div>
    </div>
  )
}
  
export default LoginAndRegistration
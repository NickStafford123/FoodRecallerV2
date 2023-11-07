import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginAndRegistration from './components/LoginAndRegistration'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import View from './components/view'
import Edit from './components/edit'

function App() {
    const isAuthenticated = localStorage.getItem('token')

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={ isAuthenticated ? <Navigate to='/home'/> : <LoginAndRegistration/> } />
            <Route path='/home' element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
            <Route path='/foods/:id' element= { <ProtectedRoute> <View/> </ProtectedRoute> } />
            <Route path='/edit/:id' element={ <ProtectedRoute> <Edit/> </ProtectedRoute> } />
            <Route path='*' element={ isAuthenticated ? <Navigate to='/home'/> : <Navigate to='/'/> } />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

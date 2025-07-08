import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import EmployeeForm from './components/EmployeeForm'
import Login from './components/Login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<EmployeeForm/>} />
        <Route path = '/login' element={<Login/>} />

      </Routes>
    </Router>
  )
}

export default App
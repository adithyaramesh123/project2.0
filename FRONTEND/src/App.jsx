import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Contactt from './Components/Contactt'
import Nav from './Components/Nav'
import Home from './Components/Home'
<<<<<<< HEAD
import About from './Components/About'

=======
import Admindash from './Admindash'
>>>>>>> 99c25ad4588d61ca70f11e01fd6de224a2dc78de

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/s' element={<Signup/>}/>
        <Route path='/L' element={<Login/>}/>
        <Route path='/c' element={<Contactt/>}/>
        <Route path='/n' element={<Nav/>}/>
        <Route path='/' element={<Home/>}/>
<<<<<<< HEAD
        <Route path='/about' element={<About/>}/>
=======
        <Route path='/a' element={<Admindash/>}/>
>>>>>>> 99c25ad4588d61ca70f11e01fd6de224a2dc78de
      </Routes>
    </>
  )
}

export default App

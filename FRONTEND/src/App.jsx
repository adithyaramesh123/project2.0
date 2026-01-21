import { useState, lazy, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import OrganizationLogin from './Components/OrganizationLogin'
import Contactt from './Components/Contactt'
import Nav from './Components/Nav'
const Home = lazy(() => import('./Components/Home'))
import About from './Components/About'
import Admindash from './Components/Admindash'

import Adminlogin from './Components/Adminlogin'
import Donation  from './Components/Donation' 
import DonationPage from './Components/DonationPage'
import AdminItemsPage from './Components/AdminItemsPage'
import Organization from './Components/Organization'
import AdminOrganizationView from './Components/AdminOrganizationView'
import { ThemeProviderWrapper } from './Components/ThemeContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProviderWrapper>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path='/s' element={<Signup/>}/>
        <Route path='/L' element={<Login/>}/>
            <Route path='/org/login' element={<OrganizationLogin/>}/>
        <Route path='/c' element={<Contactt/>}/>
        <Route path='/n' element={<Nav/>}/>
        <Route path='/' element={<Home/>}/>

        {/* <Route path='/g' element={<GetInvolved/>}/> */}
        <Route path='/about' element={<About/>}/>
        <Route path='/a' element={<Admindash/>}/>
        <Route path='/al' element={<Adminlogin/>}/>


  <Route path='/about' element={<About/>}/>
  <Route path='/admin' element={<Admindash/>}/>
  <Route path='/donate' element={<Donation/>}/>
  <Route path="/donate1" element={<DonationPage />} />
  <Route path="/admin/items" element={<AdminItemsPage />} />
  <Route path="/admin/org" element={<Organization />} />
  <Route path="/admin/orgs/:id" element={<AdminOrganizationView />} />
      </Routes>
      </Suspense>
    </ThemeProviderWrapper>
  )
}
//test
export default App
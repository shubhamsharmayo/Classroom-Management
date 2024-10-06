import { useState } from 'react'
import Login from './components/Login'
import './App.css'
import Signin from './components/Signin'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrincipalDashboard from './components/PrincipalDashboard'
import CreateClassroom from './components/Createclassroom'
import Timetable from './components/Timetable'
import TeacherDashboard from './components/TeacherDashboard'
import StudentDashboard from './components/StudentDashboard'
import TimeDashboard from './components/Timet'
import Teachertable from './components/teachertimetable/Teachertable'


function App() {
  const router = createBrowserRouter([
    {path:"/",
      element:<><Login/></>
    },
    {path:'/register',
      element:<><Signin/></>
    },
    {
      path:'/dashboard',
      element:<><PrincipalDashboard/></>
    },
    {
      path:'/classroom',
      element:<><CreateClassroom/></>
    },
   
    {
      path:'/createtimetable',
      element:<><Timetable/></>
    },
    {
      path:'/teacherdashboard',
      element:<><TeacherDashboard/></>
    },
    
    {
      path:'/studentdashboard',
      element:<><StudentDashboard/></>
    },
   {
    path:'/timetabledashboard',
    element:<><TimeDashboard/></>
   },
   {
    path:'/timetable',
    element:<><Teachertable/></>
   }
  ])

  return (
    <>
     <RouterProvider router={router} />
      
    </>
  )
}

export default App

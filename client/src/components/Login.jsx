import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import Signin from './Signin'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = () => {
  const [name, setname] = useState('')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        
        formState: { errors, isSubmitting },
      } = useForm()

      const onSubmit = async (data) => {
        let submit = await fetch('https://classroom-wheat.vercel.app/auth/login', {method:"POST",headers: {
          "Content-Type": "application/json", 
        }, body: JSON.stringify(data)})
        
        
        let res = await submit.json()
        
        if(res.role==='Principal'){
         navigate('/dashboard')
        }
        if(res.role==='Teacher'){
          navigate('/teacherdashboard')
        }
         if(res.role==='Student'){
         navigate('/studentdashboard')
        }
        else if(res==='"not found"'){
          navigate('/')
        }
        
        // console.log(res.name)
        localStorage.setItem('name',res.name)
      }
  return (
    <div className='login'>
        <NavLink className='loginnav' to="/register">signin</NavLink>
      <div className="logincontainer">
        <form onSubmit={handleSubmit(onSubmit)}>
           <label >Email</label> <br /> <input type="email" {...register("email",{required:true})} className='email' /> <br />
           <label >Passward</label> <br /> <input type="password"  {...register("password")}  className='password'/> <br />
           <button className='logbtn' type="submit" disabled={isSubmitting}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login

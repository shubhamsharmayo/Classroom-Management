import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import './signin.css'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        
        formState: { errors, isSubmitting },
      } = useForm()

      const onSubmit = async (data) => {
        let submit = await fetch('http://localhost:3000/auth/register', {method:"POST",headers: {
          "Content-Type": "application/json" 
        }, body: JSON.stringify(data)})
        navigate('/')
        let res = await submit.text()
        console.log(data,res)
        
      }
  return (
    <div className='signindiv'>
        <NavLink className='lognav' to="/">Login</NavLink>
      <div className="signincontainer">
        <form action="/register" onSubmit={handleSubmit(onSubmit)}>
            <label >Name</label><br /><input type="text" {...register("names")}/> <br />
           <label >Email</label><br /> <input type="email" {...register("email",{required:true})} /> <br />
           <label >Password</label><br /> <input type="password"  {...register("password")} /> <br />
           <label >Role</label><br /><select id="role" className='form-input' {...register("role", { required: true })}>
        <option value="">-- Choose an option --</option>
        <option value="Principal">Principal</option>
        <option value="Teacher">Teacher</option>
        <option value="Student">Student</option>
        
      </select> <br />
           <button className='signbtn' type="submit" disabled={isSubmitting}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signin

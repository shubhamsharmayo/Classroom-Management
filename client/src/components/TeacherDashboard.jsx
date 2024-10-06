import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom';
import './teacher.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const TeacherDashboard = () => {
    const [Loader, setLoader] = useState(true)
    const [data, setdata] = useState([])
    const [studentupdate, setstudentupdate] = useState([])
    const [isEditing, setIsEditing] = useState(null);
    const [editData, setEditData] = useState({});
    const [students, setstudents] = useState([])
    const { handleSubmit, register, reset, formState: { isSubmitting } } = useForm();

    let namedata = localStorage.getItem('name')
    useEffect(() => {
        async function teacherassigned() {
            console.log(namedata)
        
        try{

            let timetableresponse = await fetch("http://localhost:3000/teachers/assignclass", {method:"POST",headers: {
                "Content-Type": "application/json", 
              }, body: JSON.stringify({name:namedata})})
            let resp = await timetableresponse.json()
            // console.log(resp)
            setdata(resp)
        } catch(error){
            console.log(error)
        }
        finally{
            setLoader(false)
        }
            };
            teacherassigned();
        }
    , [studentupdate])

    const handleEdit = (data) => {
        setIsEditing(data._id);
        setEditData(data);
        reset(data);  
    };

    const handleUpdate = async (data) => {
        try {
            await axios.put(`http://localhost:3000/teachers/studentlist/${data._id}`, data);
            setstudentupdate(students.map(item => item._id === data._id ? data : item));
            setIsEditing(null);
            setEditData({});
        } catch (error) {
            console.error('Error updating timetable:', error);
        }
    };


    useEffect(() => {
        const studentinfo = async ()=>{
            setLoader(true);
        
        try{

            let studentresponse = await fetch("http://localhost:3000/principal/studentname")
            let resp = await studentresponse.json()
            // console.log(res)
            setstudents(resp)
        } catch(error){
            console.log(error)
        }
        finally{
            setLoader(false)
        }
    }
    studentinfo()
    }, [])

  return (
    <div className='teacherdash'>
       <h2>Teacher Dashboard</h2>
            
            <NavLink to='/createtimetable' className='nav-link'>Create Timetable</NavLink>
            <NavLink to='/timetable' className='nav-link'>Timetable</NavLink>

            {Loader ? (
                <p>Loading...</p>
            ) : data.length > 0 ? (
                <>
                    <table className='timetable'>
                        <thead>
                            <tr >
                                <th>Classroom ID</th>
                                <th>start Time</th>
                                <th>End Time</th>
                                <th>days</th>
                                <th>Students</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item,index) => (
                                <tr key={item._id}>
                                    <td>{item.classroomID}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                    <td>
                                        {item.days.map((element, idx) => (
                                            <span key={idx}>{element}<br /></span>
                                        ))}
                                    </td>
                                    <td>
                                        <ol>
                                        {item.students.map((element, idx) => (
                                            <li key={idx}>{element}<br /></li>
                                        ))}
                                        </ol>
                                    </td>
                                    <td>
                                        <button 
                                            type="button" 
                                            onClick={() => handleEdit(item)} 
                                            disabled={isSubmitting}>
                                            Edit
                                        </button>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isEditing && (
                        <div className='edit-form'>
                            <h3>Edit Timetable</h3>
                            <form onSubmit={handleSubmit(handleUpdate)}>
                                <input
                                    {...register('_id')}
                                    type="hidden"
                                />
                               
                                <label>Students:</label>
                                <select multiple {...register("students")} >
                                {Loader?(<>Loading.....</>):students.length > 0 ?(<>{students.map((datas,index)=>(
                                    <option key={index} value={datas.name} className='stuopt'>{datas.name}</option>
                                ))}</>):<option disabled>No students available</option>}</select><br />
                                <button type="submit" disabled={isSubmitting}>Update</button>
                                <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
                            </form>
                        </div>
                    )}
                    
                </>
            ) : (
                <p>No classes assigned</p>
            )}
    </div>
  )
}

export default TeacherDashboard


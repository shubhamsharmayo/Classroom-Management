import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import './principal.css';

const PrincipalDashboard = () => {
    const { control, register, handleSubmit, reset } = useForm();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'classrooms'
    });
    const [loader, setLoader] = useState(true);
    const [student, setstudent] = useState('')
    const [isEditing, setIsEditing] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [teacherdata, setteacherdata] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const response = await axios.get('https://classroom-wheat.vercel.app/principal/classroomdetails');
                response.data.forEach(classroom => append(classroom));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoader(false);
            }
        };
        fetchData();
        const teachername = async()=>{
            setLoader(true)
            try{

                let resdata =  await fetch("https://classroom-wheat.vercel.app/principal/teachername")
                  let datalog = await resdata.json()
                  setteacherdata(datalog)
            }catch(error){
                console.log(error)
            }
            finally{
                setLoader(false)
            }
        }
        teachername() 

        const studentinfo = async ()=>{
            setLoader(true);
        
        try{

            let studentresponse = await fetch("https://classroom-wheat.vercel.app/principal/studentname")
            let resp = await studentresponse.json()
            // console.log(res)
            setstudent(resp)
        } catch(error){
            console.log(error)
        }
        finally{
            setLoader(false)
        }
    }
    studentinfo()
    }, [append]);

    const handleDelete = async (id, index) => {
        try {
            await axios.delete(`https://classroom-wheat.vercel.app/principal/classroom/${id}`);
            remove(index);
        } catch (error) {
            console.error('Error deleting classroom:', error);
        }
    };

    const handleEdit = (index) => {
        setIsEditing(index);
        setEditFormData(fields[index]);
    };

    const handleUpdate = async (data) => {
        try {
            const response = await axios.put(`https://classroom-wheat.vercel.app/principal/classrooms/${data._id}`,data);
            update(isEditing, response.data);
            setIsEditing(null);
            setEditFormData({});
        } catch (error) {
            console.error('Error updating classroom:', error);
        }
    };

    return (
        <div className='principaldash'>
            <h2>Principal Dashboard</h2>
            <div className='plinks'>
                <NavLink to='/classroom'>Create Classroom</NavLink><br />
                <NavLink to='/createtimetable'>Create Timetable</NavLink><br />
                <NavLink to='/timetabledashboard'>Show TimeTable</NavLink>
            </div>
            {loader ? (
                <p>Loading...</p>
            ) : fields.length > 0 ? (
                <>
                    <table className='classlist'>
                        <thead>
                            <tr>
                                <th>ClassroomID</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Days</th>
                                <th>Teacher</th>
                                <th>Students</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id}>
                                    <td>{field.classroomID}</td>
                                    <td>{field.startTime}</td>
                                    <td>{field.endTime}</td>
                                    <td>
                                        {field.days.map((element, idx) => (
                                            <span key={idx}>{element}<br /></span>
                                        ))}
                                    </td>
                                    <td>{field.teacher}</td>
                                    <td>
                                        {field.students.map((element, idx) => (
                                            <span key={idx}>{element}
                                             <br /></span>
                                        ))}
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(index)}>
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(field._id, index)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isEditing !== null && (
                        <div className='edit-form'>
                            <h3>Edit Classroom</h3>
                            <form onSubmit={handleSubmit(handleUpdate)}>
                                <input
                                    {...register('_id')}
                                    type="hidden"
                                    defaultValue={editFormData._id}
                                />
                                <label>Classroom ID:</label>
                                <input
                                    {...register('classroomID')}
                                    defaultValue={editFormData.classroomID}
                                /><br />
                                <label>Start Time:</label>
                                <input
                                    {...register('startTime')}
                                    type="time"
                                    defaultValue={editFormData.startTime}
                                /><br />
                                <label>End Time:</label>
                                <input
                                    {...register('endTime')}
                                    type="time"
                                    defaultValue={editFormData.endTime}
                                /><br />
                                <label>Days:</label>
                                <select  multiple  {...register("days", { required: true })} defaultValue={editFormData.days}>
                               
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="friday">friday</option>
                                <option value="Saturday">Saturday</option>
                            </select><br />
                                <label>Teacher:</label>
                                <select  {...register("teacher", { required: true })} defaultValue={editFormData.teacher}>
                                {loader?<>Loading.....</>:<>{teacherdata.map((datas,index)=>(
                                    <option key={index} value={datas.name}>{datas.name}</option>
                                ))}</>}
                            </select><br />
                                <label>Students:</label>
                                <select multiple {...register("students")} defaultValue={editFormData.students || []}>
                                {loader?(<>Loading.....</>):student.length > 0 ?(<>{student.map((datas,index)=>(
                                    <option key={index} value={datas.name}>{datas.name}</option>
                                ))}</>):<option disabled>No students available</option>}
                            </select>
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
                            </form>
                        </div>
                    )}
                </>
            ) : (
                <p>No classrooms available</p>
            )}
        </div>
    );
};

export default PrincipalDashboard;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './CreateClassroom.css'; 

const CreateClassroom = () => {
    const [teachername, setteachername] = useState([])
    const [warning, setwarning] = useState('')
    const [student, setstudent] = useState([])
    const [loader, setLoader] = useState(true);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            let submit = await fetch('https://classroom-wheat.vercel.app/principal/classroom', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            let respn = await submit.json()
            if(respn=="class already exist"){
               
                setwarning(respn)
            }else{
                setwarning('created successfully')
            }
            console.log(respn);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const teachersinfo = async () => {
            setLoader(true);
            try{

                let dataresponse = await fetch("https://classroom-wheat.vercel.app/principal/teachername")
                let res = await dataresponse.json()
                // console.log(res)
                setteachername(res)
            } catch(error){
                console.log(error)
            }
            finally{
                setLoader(false)
            }
        }
        teachersinfo()

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
    }, [])
    // console.log(teachername)

    return (
        <div className="create-classroom-container">
            <h2 className="form-title">Create Classroom</h2>
            {warning=="class already exist"?<div className='error'>{warning}</div>:<div className='success'>{warning}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="create-classroom-form">
                
                <table className="form-table">
                    <tbody>
                
                        <tr>
                            <td><label className="form-label"><b>Classroom ID</b></label></td>
                            <td><input id="classroomid" type="text" placeholder="ClassroomID" {...register("classroomid", { required: true })} className="form-input" /></td>
                            
                        </tr>
                        <tr>
                            <td><label className="form-label"><b>Start Time</b></label></td>
                            <td><input id="starttime" type="time" placeholder="Start Time" {...register("starttime", { required: true })} className="form-input" /></td>
                        </tr>
                        <tr>
                            <td><label className="form-label"><b>End Time</b></label></td>
                            <td><input id="endtime" type="time" placeholder="End Time" {...register("endtime", { required: true })} className="form-input" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="days" className="form-label"><b>Days</b></label></td>
                            <td><select id="days" multiple className='form-input' {...register("days", { required: true })}>

                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="friday">friday</option>
                                <option value="Saturday">Saturday</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td><label className="form-label"><b>Assign Teacher</b></label></td>
                            <td><select id="teacher" {...register("teacher", { required: true })} className='form-input'>
                                {loader?<>Loading.....</>:teachername.length>0?<>{teachername.map((datas,index)=>(
                                    <option key={index} value={datas.name}>{datas.name}</option>
                                ))}</>:<><option value="">No teacher available</option></>}
                            </select></td>
                        </tr>
                        <tr>
                            <td><label className="form-label"><b>Assign Students</b></label></td>
                            <td><select id="students" multiple {...register("students")} className='form-input'>
                                {loader?<>Loading.....</>:student.length>0?<>{student.map((data,index)=>(
                                    <option key={index} value={data.name}>{data.name}</option>
                                ))}</>:<><option value="">No Student avaliable</option></>}
                            </select></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" className="submit-buttons" disabled={isSubmitting}>Submit</button>
                            </td>
                            
                        </tr>
                        
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default CreateClassroom;

import React,{useEffect,useState} from 'react';
import { useForm } from 'react-hook-form';
import './Timetable.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'

const Timetable = () => {
    const navigate = useNavigate()
    const [Loader, setLoader] = useState(true)
    const [classroomlist, setclassroomlist] = useState([])
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            let submit = await fetch('https://classroom-wheat.vercel.app/teachers/timetable', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            let res = await submit.text();
            console.log(data, res);
                navigate('/timetable')
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const classidfetch = async()=>{
            setLoader(true)
            try{
                let fetchdata = await fetch("https://classroom-wheat.vercel.app/teachers/classidfetch")
                let response = await fetchdata.json()
                console.log(response)
                setclassroomlist(response)
            } catch(error){
                console.log(error)
            }
            finally{
                setLoader(false)
            }
        }
        classidfetch()
    }, [])

    return (
        <div className="timetable-container">
            <h2 className="form-title">Create Timetable</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="timetable-form">
                <div className="form-group">
                    <label htmlFor="classroomID" className="form-labels">Classroom ID:</label>
                    <select id="classroomID" {...register("classroomID", { required: true })} className='form-inputs'>
                                {Loader?<>Loading.....</>:classroomlist.length>0?<>{classroomlist.map((datas,index)=>(
                                    <option key={index} value={datas.classroomID}>{datas.classroomID}</option>
                                ))}</>:<><option value="">No classroom avaliable</option></>}
                            </select>
                </div>
                <div className="form-group">
                    <label htmlFor="days" className="form-labels">days:</label>
                    <select id="days" multiple className='form-inputs' {...register("days", { required: true })}>

                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="friday">friday</option>
                                <option value="Saturday">Saturday</option>
                            </select>
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="form-labels">Subject:</label>
                    <input
                        id="subject"
                        type="text"
                        placeholder="Subject"
                        {...register('subject', { required: true })}
                        className="form-inputs"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startTime" className="form-labels">Start Time:</label>
                    <input
                        id="startTime"
                        type="time"
                        {...register('startTime', { required: true })}
                        className="form-inputs"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime" className="form-labels">End Time:</label>
                    <input
                        id="endTime"
                        type="time"
                        {...register('endTime', { required: true })}
                        className="form-inputs"
                    />
                </div>
                <button type="submit" className="submit-buttons" disabled={isSubmitting}>Create Timetable</button>
            </form>
        </div>
    );
};

export default Timetable;

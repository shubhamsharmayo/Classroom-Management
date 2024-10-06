import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './teacher.css';

const TimeDashboard = () => {
    const [timetable, setTimetable] = useState([]);
    const [loader, setLoader] = useState(true);
    const [isEditing, setIsEditing] = useState(null);
    const [editData, setEditData] = useState({});
    const { handleSubmit, register, reset, formState: { isSubmitting } } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const response = await axios.get('http://localhost:3000/principal/timetabledashboard');
                setTimetable(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoader(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/teachers/timetable/${id}`);
            setTimetable(timetable.filter(timetables => timetables._id !== id));
        } catch (error) {
            console.error('Error deleting timetable:', error);
        }
    };

    const handleEdit = (data) => {
        setIsEditing(data._id);
        setEditData(data);
        reset(data);  // Reset form with the current data
    };

    const handleUpdate = async (data) => {
        try {
            await axios.put(`http://localhost:3000/teachers/timetable/${data._id}`, data);
            setTimetable(timetable.map(item => item._id === data._id ? data : item));
            setIsEditing(null);
            setEditData({});
        } catch (error) {
            console.error('Error updating timetable:', error);
        }
    };

    return (
        <div className='teacherdash'>
            <h2>Principal Dashboard</h2>
            <h3>Timetable</h3>
            
            
            {loader ? (
                <p>Loading...</p>
            ) : timetable.length > 0 ? (
                <>
                    <table className='timetable'>
                        <thead>
                            <tr>
                                <th>Classroom ID</th>
                                <th>Subject</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetable.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.classroomID}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                    <td>
                                        <button 
                                            type="button" 
                                            onClick={() => handleEdit(item)} 
                                            disabled={isSubmitting}>
                                            Edit
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => handleDelete(item._id)} 
                                            disabled={isSubmitting}>
                                            Delete
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
                                <label>Classroom ID:</label>
                                <input
                                    {...register('classroomID')}
                                /><br />
                                <label>Subject:</label>
                                <input
                                    {...register('subject')}
                                /><br />
                                <label>Start Time:</label>
                                <input
                                    type="time"
                                    {...register('startTime')}
                                /><br />
                                <label>End Time:</label>
                                <input
                                    type="time"
                                    {...register('endTime')}
                                /><br />
                                <button type="submit" disabled={isSubmitting}>Update</button>
                                <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
                            </form>
                        </div>
                    )}
                </>
            ) : (
                <p>No timetable available</p>
            )}
        </div>
    );
};

export default TimeDashboard;

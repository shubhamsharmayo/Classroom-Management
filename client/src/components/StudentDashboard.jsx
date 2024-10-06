import React, { useState, useEffect } from 'react';
import './student.css'

const StudentDashboard = () => {
    const [timetable, setTimetable] = useState([]);
    const [loader, setLoader] = useState(true);
    const [classes, setclasses] = useState([])
    const [study, setstudy] = useState([])


    let name = localStorage.getItem('name')
    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const response = await fetch('http://localhost:3000/student/studenttimetable', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: name })
                })
                let respdata = await response.json()
                setTimetable(respdata);
                // console.log(respdata)
                respdata.forEach(element => {
                    // console.log(element.classroomID)

                    setclasses((prev) => [...prev, element.classroomID]);
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoader(false);
            }
        };
        fetchData();

       
    }, []);


    useEffect(() => {
        const retrivetimetable = async () => {
            setLoader(true);

            try {

                let retriveresponse = await fetch("http://localhost:3000/student/student", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(classes)
                })
                let resp = await retriveresponse.json()
                console.log(resp)
                setstudy(resp)
               
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoader(false)
            }
        }
        retrivetimetable()
    }, [classes])

    // console.log(classes)
    return (
        <div className='studentdash'>
            <h2>Student Dashboard</h2>

           
        
            {loader ? (
                <p>Loading...</p>
            ) : study.length > 0 ? (
                <>
                    <table className='studenttimetable'>
                        <thead>
                            <tr>
                                <th>Classroom ID</th>
                                <th>Days</th>
                                <th>Subject</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {study.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.classroomID}</td>
                                    <td>
                                        {item.days.map((element, idx) => (
                                            <span key={idx}>{element}<br /></span>
                                        ))}
                                    </td>
                                    <td>{item.subject}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                
                                </tr>
                            ))}
                        </tbody>
                    </table>

                   
                </>
            ) : (
                <p>No timetable available</p>
            )}
        </div>
    );
};

export default StudentDashboard;

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function Student(){

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/student').then(response => {
           // console.log(response.data.Student);
          setStudents(response.data.student);
          setLoading(false);
        });

    }, [])
  //   console.log(students);
  if(loading){
    return (
        <Loading/>
    )
  }
    
var sDetails = " ";
sDetails = students.map((item, index) => {
    return (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.course}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>
                <Link to={`/students/${item.id}/edit`} className="btn btn-sm btn-primary me-1">Edit</Link>
                <Link className="btn btn-sm btn-danger">Delete</Link>
            </td>
        </tr>
    )
}); 



    return (
        <div className="container mt-5">
           <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Students Details
                                <Link to="/students/create" className="btn btn-md btn-success float-end" >Add Student</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <p></p>
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>Sl</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {sDetails}
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
           </div>
        </div>
    )
}

export default Student;
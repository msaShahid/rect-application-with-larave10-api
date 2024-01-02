import { Link, useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function StudentEdit(){

    let {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [inputErrorList,setInputErrorList] = useState({});
    const [student,setStudent] = useState({})

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/student/${id}/edit`).then(response => {
           // console.log(response.data.Student);
            setStudent(response.data.student);
            setLoading(false);
        })
        .catch(function (error) {
            if(error.response){
                if(error.response.status === 404){
                    alert(error.response.data.Message);
                    setLoading(false);
                }
                if(error.response.status === 500){
                    alert(error.response.data.message);
                    setLoading(false);
                }
            }

        });

    }, [id])

    const handelInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const updateStudent = (e) => {
        e.preventDefault();
        
        setLoading(true);
        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone
        }

        axios.put(`http://127.0.0.1:8000/api/student/${id}/edit`, data)
            .then(res => {
                alert(res.data.message);
                navigate('/studentDeatil');
                setLoading(true);
            })
            .catch(function (error) {
                if(error.response){
                    if(error.response.status === 422){
                       // console.log(error.response.data.errors);
                        setInputErrorList(error.response.data.errors);
                        setLoading(false);
                    }
                    if(error.response.status === 500){
                        alert(error.response.data.message);
                        setLoading(false);
                    }
                }

            });

    }

    if(loading){
        return (
            <Loading/>
        )
      }

    if(Object.keys(student).length === 0){
        return(
            <div className="container" >
                <h4>No Such Student Id Found</h4>
            </div>
        )
    }

    return(
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Edit Students Details
                            <Link to="/studentDeatil" className="btn btn-md btn-danger float-end" >Back</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateStudent} className="form ">
                            <div className="mb-3 col-md-5">
                                <label className="label-control" >Student Name</label>
                                <input type="text" className="form-control" value={student.name} onChange={handelInput} name="name" placeholder="Student Name" />
                                <span className="text-danger">{inputErrorList.name}</span>
                            </div>
                            <div className="mb-3 col-md-5">
                                <label className="label-control" >Student Course</label>
                                <input type="text" className="form-control" value={student.course} onChange={handelInput} name="course" placeholder="Student Course" />
                                <span className="text-danger">{inputErrorList.course}</span>
                            </div>
                            <div className="mb-3 col-md-5">
                                <label className="label-control" >Student Email</label>
                                <input type="email" className="form-control" value={student.email} onChange={handelInput} name="email" placeholder="Student Email" />
                                <span className="text-danger">{inputErrorList.email}</span>
                            </div>
                            <div className="mb-3 col-md-5">
                                <label className="label-control" >Student Phone</label>
                                <input type="text" className="form-control" value={student.phone} onChange={handelInput} name="phone" placeholder="Student Phone" />
                                <span className="text-danger">{inputErrorList.phone}</span>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-md" >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default StudentEdit;
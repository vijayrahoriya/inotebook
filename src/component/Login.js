import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const [credancials,setCredancials] = useState({email:"",password:""})
    let navigate = useNavigate();

    const handleLogin =async (e)=>{
        e.preventDefault();
        const response =await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            body:JSON.stringify({email:credancials.email,password:credancials.password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token',json.authToken);
            //for redirecting to the home page after user successfuly loged in we use navigate hook
            props.showAlert('Loged in successfuly','success')
            navigate('/')
        }else{
            props.showAlert('Invalid Details','danger')
        }
    }

    const onChange = (e) =>{
        setCredancials({...credancials,[e.target.name]:e.target.value})
    }

    return (
        <div className='my-3'>
            <h2 className='my-2'>Login for continue with iNoteBook</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  onChange={onChange} id="email" value={credancials.email} name='email' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credancials.password} name='password' id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

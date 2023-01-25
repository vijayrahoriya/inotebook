import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const [credancials,setCredancials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();

    const handleSignup =async (e)=>{
        e.preventDefault();
        const response =await fetch('http://localhost:5000/api/auth/createuser',{
            method:'POST',
            body:JSON.stringify({name:credancials.name,email:credancials.email,password:credancials.password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json();
        if(json.success){
          localStorage.setItem('token',json.authtoken);
          //for redirecting to the home page after user successfuly loged in we use navigate hook
          navigate('/')
          props.showAlert('SignUp successfully','success')
      }else{
          props.showAlert('Invalid Details','danger')
      }
        }
    

    const onChange = (e) =>{
        setCredancials({...credancials,[e.target.name]:e.target.value})
    }

  return (
    <div className='my-3'>
      <h2 className='my-2'>SignUp for creating a new account on iNoteBook</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input onChange={onChange} type="name" className="form-control" id="name" name='name' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input onChange={onChange} type="email" className="form-control" name='email' id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={onChange} type="password" className="form-control" id="password" name='password' required minLength={5}  />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input onChange={onChange} type="password" className="form-control" id="cpassword" name='cpassword' required minLength={5} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

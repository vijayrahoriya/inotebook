import React from 'react'
import { useEffect } from 'react'

export default function UserInfo() {
    let name = "",email = "";
    useEffect(()=>{
        const getUserData = async() =>{
        const resp =await fetch('http://localhost:5000/api/auth/getdata');
        const data = await resp.json();
        data.forEach(userInfo=>{
            name = userInfo.name
            email = userInfo.email
            console.log(name,email)
        })
        }
        getUserData();
    })
    return (
        <div className='container'>
            <div className="info">
                <h1 className='my-3'>Your Information</h1>
                <div className="field d-flex w-0 justify-content-between f" style={{ width: '100px' }}>
                    <strong>Name: </strong>
                    <span>name</span>
                </div>
                <div className="field d-flex w-0 justify-content-between f" style={{ width: '100px' }}>
                    <strong>Email: </strong>
                    <span>email</span>
                </div>
                <div className="field d-flex w-0 justify-content-between f" style={{ width: '100px' }}>
                    <strong>Total Notes: </strong>
                    <span>0</span>
                </div>
            </div>
        </div>
    )
}

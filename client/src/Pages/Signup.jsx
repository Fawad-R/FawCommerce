import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    let Navigate=useNavigate()
    let [state1,updateState1]=useState({name:'',email:'',password:'',address:''});
    let inputEvent=(e)=>{
        if(e.target.name==='email')
        {
            let value= e.target.value.toLowerCase();
            updateState1({...state1, [e.target.name]:value})
        }
        else
        {
        updateState1({...state1, [e.target.name]:e.target.value})}
        // console.log(state1);
    }
    let SubmitEvent=async(e)=>{
        e.preventDefault();
        let {name,email,password,address}=state1;
        let val=await fetch("/register",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password,address})
        })
        try {            
        if(val.status===200){
            alert('succssfully registered!')
            Navigate('/login')
        }
        else
        {
            alert('Error! while registering!')
        }
    } catch (error) {
        alert(error)
    }
    }
  return (
    <div className='Signup'>
        <form action="POST">
            <h1>Signup</h1>
            <input onChange={inputEvent} type="text" name="name" placeholder='name' id="name" />
            <input onChange={inputEvent} type="email" name="email" placeholder='email' id="email" />
            <input onChange={inputEvent} type="password" name="password" placeholder='password' id="password" />
            <input onChange={inputEvent} type="text" name="address" placeholder='address' id="address" />
            <input onClick={SubmitEvent} type="submit" value="Register" id="Register" />
        </form>
    </div>
  )
}

export default Signup
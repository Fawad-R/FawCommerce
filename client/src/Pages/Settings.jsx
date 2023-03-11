import React from 'react'
// import img from '../Components/1.jpg'
import { useNavigate, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { MdAccountCircle } from "react-icons/md";
const Settings = () => {
  let Navigate=useNavigate();
  let [state1,updateState1]=useState([]);
  let [state2,updateState2]=useState([]);
  let [state3,updateState3]=useState([]);
  let InputEvent=(e)=>{
    updateState2({...state2,[e.target.name]:e.target.value})
  }
  let SubmitEvent=async(e)=>{
    e.preventDefault();
    let val=await fetch(`/user/${state1._id}`,
    {
      method:"PUT",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify(state2)
    })
    if(val.status===200)
    {
      toast.success("Sucessfully, Updated!!!");
    }
    else if(val.status===402)
    {
      toast.warning("You can only Update yourself");
    }
    else 
    {
      toast.error("Error! cannot update data");
    }
  }
  let fetchUser=async()=>{
    let id=JSON.parse(localStorage.getItem("user"));
    // console.log('id',id);
    let val=await axios.get(`/user/${id}`);
    // console.log(val.data);
    updateState1(val.data);
  } 
  let DeleteAccount=async()=>{

    // console.log('state1',state1);
    // console.log(state1._id);
    let val=await axios.delete(`/user/${state1._id}`);
    if (val.status===200) {
      Navigate('/signup')
      toast.success("Sucessfully, Deleted your account!!!");
      localStorage.setItem("user",JSON.stringify(null))
    }
    else
    {
      toast.error("Error!!! deleting your account!!!");
    }
  } 
  let SignOut=async(e)=>{
    try {
      
      let val=await axios.get(`/signout`);
      if (val.status===200) {
        toast.success("Sucessfully,logged out!!!");
        // alert()
        Navigate('/login')
        localStorage.setItem("user",JSON.stringify(null));     
      }
      else
      {
        toast.error("Error!!!");
      }
    } catch (error) {
      
      toast.success(error);
    }
  }
  useEffect(()=>{
  fetchUser();
  },[])
  return (
    <div className="Settings">
      <ToastContainer/>
        <div className="SettingsMain">
            <div className="SettingsMain1">
                <button id="SignOut" className='SettingsMain1_h4' onClick={SignOut} >SignOut</button>
                <button id="DeleteAccount" className='SettingsMain1_h4' onClick={DeleteAccount}>Delete Account</button>
                {/* <button  id="Subscribe">Subscribe</button>
                <button  id="Subscribe">Subscribe</button> */}
            </div>
            <form action="" method='POST'>
            <div className="SettingsMain2">
                <h5 className='SettingsMain2_h5' >Profile Picture</h5>
                <div className="SettingsMain2_profile" >
                {/* <img style={{"height":"80px","width":"80px"}} src={state1.img||img} alt="" /> */}
                </div>
                <h5 className='SettingsMain2_h5' >Username</h5>
                <input type="text" name="name" id="" onChange={InputEvent} placeholder={state1.name} />
                <h5 className='SettingsMain2_h5' >Email</h5>
                <input type="text" name="email" id="" onChange={InputEvent} placeholder={state1.email}/>
                <h5 className='SettingsMain2_h5' >Password</h5>
                <input type="text" name="password" id="" onChange={InputEvent} placeholder={state1.password}/>
            </div>
        <input type="submit" id='Update' onClick={SubmitEvent} style={{}} value="Update" />
            </form>
        </div>
    </div>
  )
}

export default Settings;
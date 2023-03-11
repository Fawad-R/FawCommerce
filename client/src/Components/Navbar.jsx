import React from 'react'
import { NavLink,useNavigate  } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import Cart from '../Pages/Cart';

const Navbar = () => {
    let Navigate=useNavigate();
    let id=JSON.parse(localStorage.getItem("user"))
    let getEcommUser=JSON.parse(localStorage.getItem("EcommUser"))
    // console.log("id",id);
    let FetchCart=async()=>{
        try {
            let val=await axios.get(`/users/${id}`);
            // console.log(val);
            if(!val.status===200)
            {
                alert('Please login first to further proceed!')   
                Navigate(`/login` )
            }
            else
            {
                //  alert('Please login first to further proceed!')   
                Navigate(`/cart/${val.data}` )
            }    
        } catch (error) {
            alert(error)   
            Navigate(`/login` )
        }
        
    }
    let Logout= async()=>{
        let val=await axios.get('/signout')
        try {
            
            if(val.status===200)
            {
                localStorage.setItem('EcommUser',JSON.stringify(null))
                alert('You have logged out!')
                Navigate('/login')
            }
            else
            {
                alert('Error logging you out!')
            }
        } catch (error) {
            alert(error)
        }
    }
    let FetchSettings=async()=>{
        try {
            let val=await axios.get(`/users/${id}`);
            // console.log(val);
            if(val.status===200)
            {
                Navigate(`/settings` )
                // alert('Please login first to further proceed!')   
            }
            else
            {
                alert('Please login first to further proceed!')   
                Navigate(`/login` )
            }    
        } catch (error) {
            alert(error)   
                Navigate(`/login` )
        }      
        
    }
    return (
        <div className="Navbar">
            {/* <div className="container">
                    <div className="header-left">
                        <div className="header-dropdown">
                            <a href="#">Usd</a>
                            <div className="header-menu">
                                <ul>
                                    <li><a href="#">Eur</a></li>
                                    <li><a href="#">Usd</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="header-dropdown">
                            <a href="#">Eng</a>
                            <div className="header-menu">
                                <ul>
                                    <li><a href="#">English</a></li>
                                    <li><a href="#">French</a></li>
                                    <li><a href="#">Spanish</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="header-right">
                        <ul className="top-menu">
                            <li>
                                <a href="#">Links</a>
                                <ul>
                                    <li><a href="tel:#"><i className="icon-phone"></i>Call: +0123 456 789</a></li>
                                    <li><a href="wishlist.html"><i className="icon-heart-o"></i>Wishlist <span>(3)</span></a></li>
                                    <li><a href="about.html">About Us</a></li>
                                    <li><a href="contact.html">Contact Us</a></li>
                                    <li><a href="#signin-modal" data-toggle="modal"><i className="icon-user"></i>Login</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div> */}
            <nav className="navbar navbar-expand-lg bg-white shadow-lg">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <a className="navbar-brand" href="index.html">
                        Crispy Kitchen
                    </a> */}

                    <div className="d-lg-none">
                        <button type="button" className="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">Reservation</button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarNav">
                    {/* mx-auto */}
                        <ul className="navbar-nav ">
                            {/* active */}
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/">HOME</NavLink>
                            </li>
                           { getEcommUser?
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={Logout} to="">LOGOUT</NavLink>
                            </li>
                            :
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/login">LOGIN</NavLink>
                            </li>}

                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/allproducts">PRODUCTS</NavLink>
                            </li> */}
                   </ul>
                    {/* <button type="button"  className="mx-auto custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal"><SearchIcon/></button> */}
                    {/* <div className="mx-auto">
                    <SearchIcon  style={{"fontSize":"23"}}/>
                    <input style={{"outline":"none","border":"none"}} type="text" name="" placeholder='Search here' id="" />
                    </div> */}
                    </div>
                    {/* style={{"marginRight":"1px"}} */}

                    <div className="d-none d-lg-block">
                        {/* <button type="button" style={{"marginRight":"1px"}} className="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal"><SearchIcon/></button>
                        <button type="button" style={{"marginRight":"1px"}} className="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal"><ShoppingCartIcon/></button>
                        <button type="button" className="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal"><AccountCircleIcon/></button> */}
                        {/* <SearchIcon style={{"fontSize":"22px","marginRight":"0%"}} /> */}
                         <ShoppingCartIcon onClick={FetchCart} style={{"fontSize":"22px","cursor":"pointer","marginRight":"10px"}}/>
                         <AccountCircleIcon  onClick={FetchSettings} style={{"fontSize":"22px","cursor":"pointer"}}  />
                        {/* <button type="button" className="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">Reservation</button> */}

                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar
import React from 'react'
import { Route,Routes } from "react-router-dom";
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import About from './Pages/About';
import Menu from './Pages/Menu';
import News from './Pages/News';
import NewsDetail from './Pages/NewsDetail';
import Contact from './Pages/Contact';
import './App.css'
import CheckOut from './Pages/CheckOut';
import Cart from './Pages/Cart';
import Dashboard from './Pages/Dashboard';
import SingleProduct from './Pages/SingleProduct';
import AllProducts from './Pages/AllProducts';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Pay from './Pay';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Success from './Pages/Success';
import Upload from './Pages/Upload';
import Settings from './Pages/Settings';
const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/FawPay' element={<Pay/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/menu' element={<Menu/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/news' element={<News/>} />
    <Route path='/newsdetails/:_id' element={<NewsDetail/>} />
    <Route path='/checkout' element={<CheckOut/>} />
    <Route path='/cart/:id' element={<Cart/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/singleProduct/:id' element={<SingleProduct/>} />
    <Route path='/allProducts' element={<AllProducts/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>} />
    {/* <Route path='/success' element={<Success/>} /> */}
    <Route path='/upload' element={<Upload/>} />
    <Route path='/settings' element={<Settings/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
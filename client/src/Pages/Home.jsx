import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Data } from '../Components/Data'
import { Data2 } from '../Components/Data2'
import axios from 'axios'
const Home = () => {
    let Navigate=useNavigate();
    let [state1,updateState1]=useState([]);
    let [state2,updateState2]=useState(false);
    let [state3,updateState3]=useState([]);
    let FetchCart=async(productId)=>{
        let val=await fetch('/cart',{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({productId})
        })
        // console.log('val',val);
        if(val.status===200)
        {
            alert('Product sucessfully added to cart')
        }
        else
        {
            alert('Error! while adding to cart')

        }
    }

    useEffect(()=>{
        let fetchProducts=async ()=>{
            try {
                let val=await axios.get('/product');
                // console.log('products:-',val.data)
                if(val.status===200)
                {
                    updateState1(val.data);
                    updateState2(true);
                }
                else
                {
                    Navigate(`/login` )
                    alert('Please login first to further proceed!')   
                }    
            } catch (error) {
                Navigate(error )
                alert('Please login first to view products!')   
            }
            
        }
        fetchProducts()
    },[])
    let inputContact=(e)=>{
        updateState3({...state3,[e.target.name]:e.target.value})
    }
    let ContactUs=async(e)=>{
        e.preventDefault();
        let val=await fetch('/contactUs',{
            "method":"POST",
            "headers":{
                "content-Type":"application/json"
            },
            body:JSON.stringify(state3)
        })
        // console.log(val);
        if (val.status===200) {
            alert('Thank you for contacting us we will reach you soon')
        }
        else
        {
            alert('Your message is not submitted please try again later! ')
        }
    }
    return (
        <>
            <div className='HomeMain'>
                <main>

                    <section className="hero">
                        <div className="container">
                            <div className="row">

                                <div className="col-lg-5 col-12 m-auto">
                                    <div className="heroText">

                                        <h1 className="text-white mb-lg-5 mb-3">Buy our Products</h1>

                                        <div className="c-reviews my-3 d-flex flex-wrap align-items-center">
                                            <div className="d-flex flex-wrap align-items-center">
                                                <h4 className="text-white mb-0 me-3">4.4/5</h4>

                                                <div className="reviews-stars">
                                                    <i className="bi-star-fill reviews-icon"></i>
                                                    <i className="bi-star-fill reviews-icon"></i>
                                                    <i className="bi-star-fill reviews-icon"></i>
                                                    <i className="bi-star-fill reviews-icon"></i>
                                                    <i className="bi-star reviews-icon"></i>
                                                </div>
                                            </div>

                                            <p className="text-white w-100">From <strong>1,206+</strong> Customer Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                                {/* <div className="carousel-caption">
                                                    <span className="text-white">
                                                        <i className="bi-geo-alt me-2"></i>
                                                        Islamabad, Pakistan
                                                    </span>

                                                    <h4 className="hero-text">Fawa Store</h4>
                                                </div> */}

                                <div className="col-lg-7 col-12">
                                    <div id="carouselExampleCaptions" className="carousel carousel-fade hero-carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className="carousel-image-wrap">
                                                    {/* <img src="images/slide/jay-wennington-N_Y88TWmGwA-unsplash.jpg" className="img-fluid carousel-image" alt="" /> */}
                                                    {/* <img src={Data[1].img} className="img-fluid carousel-image" alt="" /> */}
                                                </div>

                                            </div>

                                            {/* <div className="carousel-item">
                                                <div className="carousel-image-wrap">
                                                    <img src="images/slide/jason-leung-O67LZfeyYBk-unsplash.jpg" className="img-fluid carousel-image" alt="" />
                                                </div>

                                                <div className="carousel-caption">
                                                    <div className="d-flex align-items-center">
                                                        <h4 className="hero-text">Steak</h4>

                                                        <span className="price-tag ms-4"><small>$</small>26.50</span>
                                                    </div>

                                                    <div className="d-flex flex-wrap align-items-center">
                                                        <h5 className="reviews-text mb-0 me-3">3.8/5</h5>

                                                        <div className="reviews-stars">
                                                            <i className="bi-star-fill reviews-icon"></i>
                                                            <i className="bi-star-fill reviews-icon"></i>
                                                            <i className="bi-star-fill reviews-icon"></i>
                                                            <i className="bi-star reviews-icon"></i>
                                                            <i className="bi-star reviews-icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* <div className="carousel-item">
                                                <div className="carousel-image-wrap">
                                                    <img src="images/slide/ivan-torres-MQUqbmszGGM-unsplash.jpg" className="img-fluid carousel-image" alt="" />
                                                </div>

                                                <div className="carousel-caption">
                                                    <div className="d-flex align-items-center">
                                                        <h4 className="hero-text">Sausage Pasta</h4>

                                                        <span className="price-tag ms-4"><small>$</small>18.25</span>
                                                    </div>

                                                    <div className="d-flex flex-wrap align-items-center">
                                                        <h5 className="reviews-text mb-0 me-3">4.2/5</h5>

                                                        <div className="reviews-stars">
                                                            <i className="bi-star-fill reviews-icon"></i>
                                                            <i className="bi-star-fill reviews-icon"></i>
                                                            <i className="bi-star-fill reviews-icon"></i>
                                                            <i className="bi-star-fill reviews-icon"></i>
                                                            <i className="bi-star reviews-icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                        {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>

                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button> */}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="video-wrap">
                            <video autoPlay="" loop="" muted="" className="custom-video" poster="">
                                <source src="video/production_ID_3769033.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <div className="overlay"></div>
                    </section>

                    <section className="menu section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="text-center mb-lg-5 mb-4 mt-4">Products</h2>
                                </div>
                                                
                                {/* <div className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow owl-loaded owl-drag" data-toggle="owl" data-owl-options="{
                            &quot;nav&quot;: false, 
                            &quot;dots&quot;: true,
                            &quot;margin&quot;: 20,
                            &quot;loop&quot;: false,
                            &quot;responsive&quot;: {
                                &quot;0&quot;: {
                                    &quot;items&quot;:1
                                },
                                &quot;480&quot;: {
                                    &quot;items&quot;:2
                                },
                                &quot;768&quot;: {
                                    &quot;items&quot;:3
                                },
                                &quot;992&quot;: {
                                    &quot;items&quot;:4
                                },
                                &quot;1200&quot;: {
                                    &quot;items&quot;:4,
                                    &quot;nav&quot;: true,
                                    &quot;dots&quot;: false
                                }
                            }
                        }"> */}
                            <div className='divFlex0'>
                                {
                                    // Data.map((ele,ind)=>{
                                
                                    state2?  state1.map((ele,ind)=>{
                                        return(
                                            <div key={ele._id}>
                                            <>
                                            <div key={ele._id} className='divFlex'>

                  
                                    <div className="owl-stage-outer divFlex1"><div className="owl-stage"><div className="owl-item active" style={{ "transform": "translate3d(0px, 0px, 0px)", "transition": "all 0s ease 0s", "width": "1485px", "width": "276.998px", "marginRight": "20px" }}><div className="product product-2">
                                            <figure className="product-media ">
                                            <a href="product.html">
                                                {/* <img src={Data[0].img} alt="Product image" className="product-image" /> */}
                                                <img src={ele.img} style={{"height":"200px","width":"300px"}} alt="Product image" className="product-image" />
                                            </a>

                                            <div className="product-action-vertical">
                                                <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                {/* <NavLink to={`/SingleProduct/${ele._id}`} className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></NavLink> */}
                                            </div>

                                            <div className="product-action product-action-dark">
                                                <NavLink to="" onClick={()=>{FetchCart(ele._id)}} className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></NavLink>
                                                {/* <NavLink to={`/SingleProduct/${ele._id}`} className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></NavLink> */}
                                                <NavLink to={`/SingleProduct/${ele._id}`}className="btn-product btn-quickview" title="Quick view"><span>quick view</span></NavLink>
                                                {/* <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a> */}
                                            </div>
                                        </figure>
                                        <div className="product-body">
                                            <div className="product-cat">
                                                {/* <a href="#">{ele.tag}</a> */}
                                                <a href="#">{ele.desc}</a>
                                            </div>
                                            <h3 className="product-title"><a href="product.html">{ele.title}</a></h3>
                                            {/* <h3 className="product-title"><a href="product.html">{ele.tag}</a></h3> */}
                                            <div className="product-price">
                                            {ele.price}$
                                            </div>
                                            <div className="ratings-container">
                                                <div className="ratings">
                                                    <div className="ratings-val" style={{ "width": "60%" }}></div>
                                                </div>
                                                <span className="ratings-text">( {ele.reviews} Reviews )</span>
                                            </div>
                                        </div>
                                    </div></div>    
                                    </div>
                                    </div>    
                                    </div>    
                                            </>
                                            </div>
                                        )
                                    }):''
                                }
                                </div>    
                                </div>    

                      
                            </div>
                        {/* </div> */}
                    </section>

                    <section className="BgImage"></section>
                    <div className="row no-gutters">
							<div className="col-md-7">
								<div className="contact-wrap w-100 p-md-5 p-4">
									<h3 className="mb-4">Contact Us</h3>
									<div id="form-message-warning" className="mb-4"></div>
									<div id="form-message-success" className="mb-4">
										{/* Your message was sent, thank you! */}
									</div>
									<form method="POST" id="contactForm" name="contactForm" className="contactForm">
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label className="label" htmlFor="name">Full Name</label>
													<input onChange={inputContact} type="text" className="form-control" name="name" id="name"
														placeholder="Name"/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="label" htmlFor="email">Email Address</label>
													<input onChange={inputContact} type="email" className="form-control" name="email" id="email"
														placeholder="Email"/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<label className="label" htmlFor="subject">Subject</label>
													<input onChange={inputContact} type="text" className="form-control" name="subject" id="subject"
														placeholder="Subject"/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<label className="label" htmlFor="#">Message</label>
													<textarea onChange={inputContact} name="message" className="form-control" id="message" cols="30"
														rows="4" placeholder="Message"></textarea>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="submit" onClick={ContactUs} value="Send Message" className="btn btn-primary"/>
													<div className="submitting"></div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div className="col-md-5 d-flex align-items-stretch">
								<div className="info-wrap w-100 p-5 img" style={{"backgroundImage": `${Data[0].img}` }}>
								</div>
							</div>
						</div>
                    {/* <section className="news section-padding">
                        <div className="container">
                            <div className="row">

                                <h2 className="text-center mb-lg-5 mb-4">Trending</h2>
                                {
                                    Data2.map((ele, ind) => { 
                                        return (
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="news-thumb mb-4">
                                                    <NavLink to={`/SingleProduct/${ele._id}`}>
                                                        <img src={ele.img} className="img-fluid news-image" alt="" />
                                                    </NavLink>

                                                    <div className="news-text-info news-text-info-large">
                                                        <NavLink to={`/SingleProduct/${ele._id}`}className="category-tag bg-danger btn-product btn-quickview" title="Quick view"><span>quick view</span></NavLink>

                                                        <h5 className="news-title mt-2">
                                                        <NavLink to={`/SingleProduct/${ele._id}`} className="news-title-link">{ele.title}</NavLink>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>)
                                    })}

                            </div>
                        </div>
                    </section> */}

                </main>

                {/* <!-- Modal --> */}
                
            </div>
        </>
    )
}

export default Home;
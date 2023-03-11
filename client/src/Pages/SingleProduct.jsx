import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
let quantity=0;
const SingleProduct = () => {
    let [state1,updateState1]=useState({size:'',quantity:''});
    let [state2,updateState2]=useState();
    let [state3,updateState3]=useState(null);
    let [state4,updateState4]=useState([]);
    let [state5,updateState5]=useState(false);
    let [state6,updateState6]=useState([]);
    let [state7,updateState7]=useState(false);
    let [state8,updateState8]=useState(quantity);
    let useParamsid=useParams();
    let selectEvent=(e)=>{
        // console.log(e.target);
        // console.log(e.target.name);
        // console.log(e.target.value);
        updateState1({...state1,[e.target.name]:e.target.value});
    }
    let fetchSingleProduct=async()=>{
        let val=await axios.get(`/product/${useParamsid.id}`)
        // console.log('val',val);
        updateState2(val.data)
        updateState3(true)
        if(val.data.categories.length!==0)
        {
            updateState4(val.data.categories)
            updateState5(true);

        }
        if(val.data.size.length!==0)
        {
            updateState6(val.data.size)
            updateState7(true);

        }
    }
    useEffect(()=>{
        fetchSingleProduct();
    },[])

    let FetchCart=async(e)=>{
        // console.log('i am FetchCart');
        e.preventDefault();
        // console.log('i am FetchCart');
        let productId=useParamsid.id;
        // console.log(state8);
        let quantity=state8;
        // console.log(state1);
        let size=state1.size;
    let val = await fetch('/cart',{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify({productId,quantity,size})
            // size:req.body.size,
    })
    // console.log('FetchCart',val);
    if(val.status===200)
    {
        alert('Product sucessfully added to cart')
    }
    else
    {
        alert('Error! while adding to cart')

    }

    }

    let increaseQuantity=()=>{
        // console.log(quantity);
        quantity=quantity=quantity+1;
        updateState8(quantity)
    }
    let decreaseQuantity=()=>{
        // console.log(quantity);
        if(quantity!==0){
        quantity=quantity=quantity-1;
        updateState8(quantity)}
    }
  return (
    // <div>
    state3?
        <div style={{"marginTop":"5%"}} className="page-content">
                <div className="container">
                    <div className="product-details-top">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="product-gallery product-gallery-vertical">
                                    <div className="row">
                                        <figure className="product-main-image">
                                            <img id="product-zoom" src={state2.img} data-zoom-image="assets/images/products/single/1-big.jpg" alt="product image"/>

                                            <a href="#" id="btn-product-gallery" className="btn-product-gallery">
                                                <i className="icon-arrows"></i>
                                            </a>
                                        </figure>

                                        <div id="product-zoom-gallery" className="product-image-gallery">
                                            <a className="product-gallery-item active" href="#" data-image="assets/images/products/single/1.jpg" data-zoom-image="assets/images/products/single/1-big.jpg">
                                                <img src={state2.img} alt="product side"/>
                                            </a>

                                            <a className="product-gallery-item" href="#" data-image="assets/images/products/single/2.jpg" data-zoom-image="assets/images/products/single/2-big.jpg">
                                                <img src={state2.img} alt="product cross"/>
                                            </a>

                                            <a className="product-gallery-item" href="#" data-image="assets/images/products/single/3.jpg" data-zoom-image="assets/images/products/single/3-big.jpg">
                                                <img src={state2.img} alt="product with model"/>
                                            </a>

                                            <a className="product-gallery-item" href="#" data-image="assets/images/products/single/4.jpg" data-zoom-image="assets/images/products/single/4-big.jpg">
                                                <img src={state2.img} alt="product back"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="product-details">
                                {/* Dark yellow lace cut out swing dress */}
                                    <h1 className="product-title">{state2.title}</h1>

                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{"width": "80%"}}></div>
                                        </div>
                                        <a className="ratings-text" href="#product-review-link" id="review-link">( 2 Reviews )</a>
                                    </div>

                                    <div className="product-price">
                                        ${state2.price}
                                    </div>

                                    <div className="product-content">
                                    {/* Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus */}
                                        <p>{state2.desc}. </p>
                                    </div>

                                    <div className="details-filter-row details-row-size">
                                        <label>Color:{state2.color} </label>

                                        <div className="product-nav product-nav-thumbs">
                                            {/* <a href="#" className="active">
                                                <img src="assets/images/products/single/1-thumb.jpg" alt="product desc"/>
                                            </a>
                                            <a href="#">
                                                <img src="assets/images/products/single/2-thumb.jpg" alt="product desc"/>
                                            </a> */}
                                        </div>
                                    </div>

                                    <div className="details-filter-row details-row-size">
                                        <label htmlFor="size">Size:</label>
                                        <div className="select-custom">
                                            <select name="size" id="size" onChange={selectEvent} className="form-control">
                                                <option  defaultValue="selected">Select a size</option>
                                                {/* value="#" */}
                                            {state7?state6.map((ele,ind)=>{
                                                return(
                                                <option key={ele._id} name="size" defaultValue={ele}>{ele}</option>)
                                            }):
                                            'no size feature aviable for this product'
                                        }
                                                {/* // <option name="size" value="m">Medium</option>
                                                // <option name="size" value="l">Large</option>
                                                // <option name="size" value="xl">Extra Large</option> */}
                                            </select>
                                        </div>

                                        {/* <a href="#" className="size-guide"><i className="icon-th-list"></i>size guide</a> */}
                                    </div>

                                    <div className="details-filter-row details-row-size">
                                        <label htmlFor="qty">Qty:</label>
                                        <div className="product-details-quantity">
                                            {/* <input type="number" id="qty" className="form-control" value={quantity} min="1" max="10" step="1" data-decimals="0" required="" style={{"display": "none"}}/><div className="input-group  input-spinner"><div className="input-group-prepend"><button style={{"minWidth": "26px"}} className="btn btn-decrement btn-spinner" type="button"><i onClick={decreaseQuantity} className="icon-minus"></i></button></div><input type="text" style={{"textAlign": "center"}} name="quantity" value={increaseQuantity} onChange={increaseQuantity} className="form-control " required="" placeholder=""/><div className="input-group-append"><button style={{"minWidth": "26px"}} className="btn btn-increment btn-spinner" type="button"><i className="icon-plus" onClick={increaseQuantity}></i></button></div></div> */}
                                            <input type="number" id="qty" className="form-control" defaultValue={state8} min="1" max="10" step="1" data-decimals="0" required="" style={{"display": "none"}}/><div className="input-group  input-spinner"><div className="input-group-prepend"><button style={{"minWidth": "26px"}} className="btn btn-decrement btn-spinner" type="button"><i onClick={decreaseQuantity} className="icon-minus"></i></button></div><label style={{"textAlign": "center"}} name="quantity"  className="form-control " required="" placeholder="">{state8}</label><div className="input-group-append"><button style={{"minWidth": "26px"}} className="btn btn-increment btn-spinner" type="button"><i className="icon-plus" onClick={increaseQuantity}></i></button></div></div>
                                        </div>
                                    </div>

                                    <div className="product-details-action">
                                        <a href="#" className="btn-product btn-cart" ><span onClick={FetchCart}>add to cart</span></a>
                                        {/* <a href="#" class="btn-product btn-cart"><span>add to cart</span></a> */}
                                        <div className="details-action-wrapper">
                                            {/* <a href="#" className="btn-product btn-wishlist" title="Wishlist"><span>Add to Wishlist</span></a> */}
                                            {/* <a href="#" className="btn-product btn-compare" title="Compare"><span>Add to Compare</span></a> */}
                                        </div>
                                    </div>

                                    <div className="product-details-footer">
                                        <div className="product-cat">
                                            <span>Category:</span>
                                            {state5?
                                            state4.map((ele,ind)=>{
                                                // console.log(ele);
                                                return(
                                                <a key={ele._id} href="#">{ele}</a>)
                                            }):''
                                        }
                                        </div>

                                        {/* <div className="social-icons social-icons-sm">
                                            <span className="social-label">Share:</span>
                                            <a href="#" className="social-icon" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
                                            <a href="#" className="social-icon" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
                                            <a href="#" className="social-icon" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
                                            <a href="#" className="social-icon" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-details-tab">
                        <ul className="nav nav-pills justify-content-center" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="product-desc-link" data-toggle="tab" href="#product-desc-tab" role="tab" aria-controls="product-desc-tab" aria-selected="true">Description</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="product-info-link" data-toggle="tab" href="#product-info-tab" role="tab" aria-controls="product-info-tab" aria-selected="false">Additional information</a>
                            </li>
                            <li className="nav-item">
                                {/* <a className="nav-link" id="product-shipping-link" data-toggle="tab" href="#product-shipping-tab" role="tab" aria-controls="product-shipping-tab" aria-selected="false">Shipping &amp; Returns</a> */}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="product-review-link" data-toggle="tab" href="#product-review-tab" role="tab" aria-controls="product-review-tab" aria-selected="false">Reviews (2)</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                                <div className="product-desc-content">
                                    <h3>Product Information</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. </p>
                                    <ul>
                                        <li>Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit. </li>
                                        <li>Vivamus finibus vel mauris ut vehicula.</li>
                                        <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
                                    </ul>

                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. </p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="product-info-tab" role="tabpanel" aria-labelledby="product-info-link">
                                <div className="product-desc-content">
                                    <h3>Information</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. </p>

                                    <h3>Fabric &amp; care</h3>
                                    <ul>
                                        <li>Faux suede fabric</li>
                                        <li>Gold tone metal hoop handles.</li>
                                        <li>RI branding</li>
                                        <li>Snake print trim interior </li>
                                        <li>Adjustable cross body strap</li>
                                        <li> Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm</li>
                                    </ul>

                                    <h3>Size</h3>
                                    <p>one size</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="product-shipping-tab" role="tabpanel" aria-labelledby="product-shipping-link">
                                <div className="product-desc-content">
                                    <h3>Delivery &amp; returns</h3>
                                    <p>We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our <a href="#">Delivery information</a><br/>
                                    We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our <a href="#">Returns information</a></p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="product-review-tab" role="tabpanel" aria-labelledby="product-review-link">
                                <div className="reviews">
                                    <h3>Reviews (2)</h3>
                                    <div className="review">
                                        <div className="row no-gutters">
                                            <div className="col-auto">
                                                <h4><a href="#">Samanta J.</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{"width": "80%"}}></div>
                                                    </div>
                                                </div>
                                                <span className="review-date">6 days ago</span>
                                            </div>
                                            <div className="col">
                                                <h4>Good, perfect size</h4>

                                                <div className="review-content">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                                </div>

                                                <div className="review-action">
                                                    <a href="#"><i className="icon-thumbs-up"></i>Helpful (2)</a>
                                                    <a href="#"><i className="icon-thumbs-down"></i>Unhelpful (0)</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="review">
                                        <div className="row no-gutters">
                                            <div className="col-auto">
                                                <h4><a href="#">John Doe</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{"width": "100%"}}></div>
                                                    </div>
                                                </div>
                                                <span className="review-date">5 days ago</span>
                                            </div>
                                            <div className="col">
                                                <h4>Very good</h4>

                                                <div className="review-content">
                                                    <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                                </div>

                                                <div className="review-action">
                                                    <a href="#"><i className="icon-thumbs-up"></i>Helpful (0)</a>
                                                    <a href="#"><i className="icon-thumbs-down"></i>Unhelpful (0)</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                                            
                    {/* <h2 className="title text-center mb-4">You May Also Like</h2><!-- End .title text-center -->

                    <div className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow owl-loaded owl-drag" data-toggle="owl" data-owl-options="{
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
                        }">
                        <!-- End .product -->

                        <!-- End .product -->

                        <!-- End .product -->

                        <!-- End .product -->

                        <!-- End .product -->
                    <div className="owl-stage-outer"><div className="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 1485px;"><div className="owl-item active" style="width: 276.998px; margin-right: 20px;"><div className="product product-7 text-center">
                            <figure className="product-media">
                                <span className="product-label label-new">New</span>
                                <a href="product.html">
                                    <img src="assets/images/products/product-4.jpg" alt="Product image" className="product-image">
                                </a>

                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                    <a href="popup/quickView.html" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                </div><!-- End .product-action-vertical -->

                                <div className="product-action">
                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                </div><!-- End .product-action -->
                            </figure><!-- End .product-media -->

                            <div className="product-body">
                                <div className="product-cat">
                                    <a href="#">Women</a>
                                </div><!-- End .product-cat -->
                                <h3 className="product-title"><a href="product.html">Brown paperbag waist <br>pencil skirt</a></h3><!-- End .product-title -->
                                <div className="product-price">
                                    $60.00
                                </div><!-- End .product-price -->
                                <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style="width: 20%;"></div><!-- End .ratings-val -->
                                    </div><!-- End .ratings -->
                                    <span className="ratings-text">( 2 Reviews )</span>
                                </div><!-- End .rating-container -->

                                <div className="product-nav product-nav-thumbs">
                                    <a href="#" className="active">
                                        <img src="assets/images/products/product-4-thumb.jpg" alt="product desc">
                                    </a>
                                    <a href="#">
                                        <img src="assets/images/products/product-4-2-thumb.jpg" alt="product desc">
                                    </a>

                                    <a href="#">
                                        <img src="assets/images/products/product-4-3-thumb.jpg" alt="product desc">
                                    </a>
                                </div><!-- End .product-nav -->
                            </div><!-- End .product-body -->
                        </div></div><div className="owl-item active" style="width: 276.998px; margin-right: 20px;"><div className="product product-7 text-center">
                            <figure className="product-media">
                                <span className="product-label label-out">Out of Stock</span>
                                <a href="product.html">
                                    <img src="assets/images/products/product-6.jpg" alt="Product image" className="product-image">
                                </a>

                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                    <a href="popup/quickView.html" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                </div><!-- End .product-action-vertical -->

                                <div className="product-action">
                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                </div><!-- End .product-action -->
                            </figure><!-- End .product-media -->

                            <div className="product-body">
                                <div className="product-cat">
                                    <a href="#">Jackets</a>
                                </div><!-- End .product-cat -->
                                <h3 className="product-title"><a href="product.html">Khaki utility boiler jumpsuit</a></h3><!-- End .product-title -->
                                <div className="product-price">
                                    <span className="out-price">$120.00</span>
                                </div><!-- End .product-price -->
                                <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style="width: 80%;"></div><!-- End .ratings-val -->
                                    </div><!-- End .ratings -->
                                    <span className="ratings-text">( 6 Reviews )</span>
                                </div><!-- End .rating-container -->
                            </div><!-- End .product-body -->
                        </div></div><div className="owl-item active" style="width: 276.998px; margin-right: 20px;"><div className="product product-7 text-center">
                            <figure className="product-media">
                                <span className="product-label label-top">Top</span>
                                <a href="product.html">
                                    <img src="assets/images/products/product-11.jpg" alt="Product image" className="product-image">
                                </a>

                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                    <a href="popup/quickView.html" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                </div><!-- End .product-action-vertical -->

                                <div className="product-action">
                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                </div><!-- End .product-action -->
                            </figure><!-- End .product-media -->

                            <div className="product-body">
                                <div className="product-cat">
                                    <a href="#">Shoes</a>
                                </div><!-- End .product-cat -->
                                <h3 className="product-title"><a href="product.html">Light brown studded Wide fit wedges</a></h3><!-- End .product-title -->
                                <div className="product-price">
                                    $110.00
                                </div><!-- End .product-price -->
                                <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style="width: 80%;"></div><!-- End .ratings-val -->
                                    </div><!-- End .ratings -->
                                    <span className="ratings-text">( 1 Reviews )</span>
                                </div><!-- End .rating-container -->

                                <div className="product-nav product-nav-thumbs">
                                    <a href="#" className="active">
                                        <img src="assets/images/products/product-11-thumb.jpg" alt="product desc">
                                    </a>
                                    <a href="#">
                                        <img src="assets/images/products/product-11-2-thumb.jpg" alt="product desc">
                                    </a>

                                    <a href="#">
                                        <img src="assets/images/products/product-11-3-thumb.jpg" alt="product desc">
                                    </a>
                                </div><!-- End .product-nav -->
                            </div><!-- End .product-body -->
                        </div></div><div className="owl-item active" style="width: 276.998px; margin-right: 20px;"><div className="product product-7 text-center">
                            <figure className="product-media">
                                <a href="product.html">
                                    <img src="assets/images/products/product-10.jpg" alt="Product image" className="product-image">
                                </a>

                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                    <a href="popup/quickView.html" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                </div><!-- End .product-action-vertical -->

                                <div className="product-action">
                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                </div><!-- End .product-action -->
                            </figure><!-- End .product-media -->

                            <div className="product-body">
                                <div className="product-cat">
                                    <a href="#">Jumpers</a>
                                </div><!-- End .product-cat -->
                                <h3 className="product-title"><a href="product.html">Yellow button front tea top</a></h3><!-- End .product-title -->
                                <div className="product-price">
                                    $56.00
                                </div><!-- End .product-price -->
                                <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style="width: 0%;"></div><!-- End .ratings-val -->
                                    </div><!-- End .ratings -->
                                    <span className="ratings-text">( 0 Reviews )</span>
                                </div><!-- End .rating-container -->
                            </div><!-- End .product-body -->
                        </div></div><div className="owl-item" style="width: 276.998px; margin-right: 20px;"><div className="product product-7 text-center">
                            <figure className="product-media">
                                <a href="product.html">
                                    <img src="assets/images/products/product-7.jpg" alt="Product image" className="product-image">
                                </a>

                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                    <a href="popup/quickView.html" className="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                    <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                                </div><!-- End .product-action-vertical -->

                                <div className="product-action">
                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                </div><!-- End .product-action -->
                            </figure><!-- End .product-media -->

                            <div className="product-body">
                                <div className="product-cat">
                                    <a href="#">Jeans</a>
                                </div><!-- End .product-cat -->
                                <h3 className="product-title"><a href="product.html">Blue utility pinafore denim dress</a></h3><!-- End .product-title -->
                                <div className="product-price">
                                    $76.00
                                </div><!-- End .product-price -->
                                <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style="width: 20%;"></div><!-- End .ratings-val -->
                                    </div><!-- End .ratings -->
                                    <span className="ratings-text">( 2 Reviews )</span>
                                </div><!-- End .rating-container -->
                            </div><!-- End .product-body -->
                        </div></div></div></div><div className="owl-nav"><button type="button" role="presentation" className="owl-prev disabled"><i className="icon-angle-left"></i></button><button type="button" role="presentation" className="owl-next"><i className="icon-angle-right"></i></button></div><div className="owl-dots disabled"><button role="button" className="owl-dot active"><span></span></button><button role="button" className="owl-dot"><span></span></button></div></div><!-- End .owl-carousel -->
                </div><!-- End .container --> */}
            </div>
    </div>
:''
)}

export default SingleProduct;
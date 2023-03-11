import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

let stripeKey="pk_test_51MFGxxGsyHFe5lQADpu8EQF9BKy1N7wdpsmYQhwFGtv6ovbZ93uDWb6cTW92Dsr50q2p0zyjOI01O6VDYjthwf5K00zyktNRfo"

const Cart = () => {
	let Navigate=useNavigate()
	
	let subtotal=0;
	let standard=0;
	let express=0;
	let total=0;
	let [state,updateState]=useState([])
	// let [state2,updateState2]=useState({airpods: '1', headphones: '1', Menshoes: '1'})
	let [state2,updateState2]=useState(1) 
	let [state3,updateState3]=useState(0)
	let useparamsid=useParams()

	// const cart = useSelector((state) => state.cart);
	let [state1,updateState1]=useState(null);
	let [OrderId,setOrderId]=useState(null);
    useEffect(()=>{
        let sentRequest=async()=>{
            try{
                let val=await axios.post('/payment',{
                    tokenId:state1.id,
                    amount:subtotal+parseInt(state3),
                })
                // console.log(val);
				// Navigate("/success", {
				// 	stripeData: val.data,
				// 	products: state });
			 	// console.log('stateee',state);
				const res = await axios.post("/order", {
					// userId: currentUser._id,
					// products: state.products.map((item) => ({
					products: state.map((item) => ({
					  productId: item._id,
					  quantity: item._quantity,
					//   key:ele._id
					})),
					amount: subtotal+parseInt(state3),
					// address: data.billing_details.address,
					address: val.data.billing_details.address					
				  });
				  setOrderId(val.data._id);
				//   console.log('res',res);
				  alert('payment successfull')
				  Navigate('/')
            }catch(err){
                // console.log(err);
				alert('Error! cannot proceed at the moment')
            }
        }
        state1 && sentRequest();
    },[state1])
    let onToken=(token)=>{
        updateState1(token);
        // console.log(token);
    }

	let inputRadio=(e)=>{

		// console.log(e.target);
		// console.log(e.target.value);
		updateState3(e.target.value)
	}
	let fetchCart=async()=>{
		// console.log('fetching');
		let val=await axios.get(`/cart/cart/cart/cart/${useparamsid.id}`);
		// console.log('fetching2');
		// console.log('val from cart',val)
		updateState(val.data);
	}
	useEffect(()=>{
		fetchCart()
	},[])
	let getQuantity=(e)=>{
		// console.log(e);
		// console.log(e.target.value);
		// console.log(e.target.name);
		updateState2({...state2,[e.target.name]:e.target.value});
		// console.log(state2);
	}
	let DeleteItem=async(e)=>{
		// console.log('e',e);
		let val=await fetch(`/cart/${e}`,{
			method:"DELETE",
			headers:{
				"content-Type":"application/json"
			},
			// body:JSON.stringify({e})
		})
		try {
			
			if(val.status===200)
			{
				alert('Item sucessfully deleted from cart!')
				Navigate('/')
			}
			else
			{
				alert('Error removing item!')
			}
		} catch (error) {
			alert(error)
		}
		// console.log('val',val);
		// let val=await axios.get
	}
	let ProceedToCheck=async(e)=>{
		e.preventDefault();
		// console.log('clicked');
		let val=await fetch('/order',{
			"method":"POST",
			"headers":{
				"content-Type":"applicayion/json"
			},
			body:JSON.stringify({})
		})
	}
  return (
    <>
    <div>
    <main className="main">
        	<div className="page-header text-center" style={{"backgroundImage": "url('assets/images/page-header-bg.jpg')"}}>
        		<div className="container">
        			<h1 className="page-title">Shopping Cart<span>Shop</span></h1>
        		</div>
        	</div> 
            {/* <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Shop</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                    </ol>
                </div>
            </nav> */}
    <div className="page-content">
            	<div className="cart">
	                <div className="container">
	                	<div className="row">
	                		<div className="col-lg-9">
	                			<table className="table table-cart table-mobile">
									<thead>
										<tr>
											<th>Product</th>
											<th>Price</th>
											<th>Quantity</th>
											<th>Total</th>
											<th></th>
										</tr>
									</thead>

									<tbody>
								{state.map((ele,ind)=>{
									return (
										<tr key={ele._id}>
											<td className="product-col">
												<div className="product">
													<figure className="product-media">
														<a href="#">
															<img src={ele.img} alt="Product image"/>
														</a>
													</figure>

													<h3 className="product-title">
														<a href="#">{ele.title}</a>
													</h3>
												</div>
											</td>
											<td className="price-col">${ele.price}</td>
											<td className="quantity-col">
                                                <div className="cart-product-quantity">
                                                    <input type="number" className="form-control" onChange={getQuantity} name={ele.title} defaultValue="0" min="1" max="10" step="1" data-decimals="0" required/>
                                                </div>
                                            </td>
											<td  className="total-col">${ele.price*(parseInt(state2[ele.title]))}</td>
											{/* {subtotal=subtotal+(parseInt(ele.price*(parseInt(state2[ele.title]))))} */}
											{subtotal=subtotal+(parseInt(ele.price*(parseInt(state2[ele.title]))))}
											{ standard=(subtotal/100)*8}
											{express=(subtotal/100)*16}
											{/* {console.log('ele.price',ele.price)}
											{console.log('state2',state2)}
											{console.log('state2[ele.title]',state2[ele.title])} */}
											{/* {console.log(state2[ele.title].quantity)} */}
											{/* {console.log(state2.[ele.title])} */}
											<td className="remove-col"><button className="btn-remove"><i onClick={()=>{DeleteItem(ele._id)}} className="icon-close"></i></button></td>
										</tr>
											)
									})}	
										{/* <tr>
											<td className="product-col">
												<div className="product">
													<figure className="product-media">
														<a href="#">
															<img src="assets/images/products/table/product-2.jpg" alt="Product image"/>
														</a>
													</figure>

													<h3 className="product-title">
														<a href="#">Blue utility pinafore denim dress</a>
													</h3>
												</div>
											</td>
											<td className="price-col">$76.00</td>
											<td className="quantity-col">
                                                <div className="cart-product-quantity">
                                                    <input type="number" className="form-control" defaultValue="1" min="1" max="10" step="1" data-decimals="0" required/>
                                                </div>
                                            </td>
											<td className="total-col">$76.00</td>
											<td className="remove-col"><button className="btn-remove"><i className="icon-close"></i></button></td>
										</tr> */}
									</tbody>
								</table>

	                			<div className="cart-bottom">
			            			<div className="cart-discount">
			            				<form action="#">
			            					<div className="input-group">
				        						{/* <input type="text" className="form-control" required placeholder="coupon code"/> */}
				        						<div className="input-group-append">
													{/* <button className="btn btn-outline-primary-2" type="submit"><i className="icon-long-arrow-right"></i></button> */}
												</div>
			        						</div>
			            				</form>
			            			</div>

			            			{/* <a href="#" className="btn btn-outline-dark-2"><span>UPDATE CART</span><i className="icon-refresh"></i></a> */}
		            			</div>
	                		</div>
	                		<aside className="col-lg-3">
	                			<div className="summary summary-cart">
	                				<h3 className="summary-title">Cart Total</h3>

	                				<table className="table table-summary">
	                					<tbody>
	                						<tr className="summary-subtotal">
	                							<td>Subtotal:</td>
	                							<td>
													{subtotal}$
													{
													// state2.map((ele)=>{
													// 	console.log(ele);
													// })
													// console.log('state2 in sub',state2)
													} 
												</td>
	                						</tr>
	                						<tr className="summary-shipping">
	                							<td>Shipping:</td>
	                							<td>&nbsp;</td>
	                						</tr>

	                						<tr className="summary-shipping-row">
	                							<td>
													<div className="custom-control custom-radio">
														<input onChange={inputRadio} type="radio" id="free-shipping" name="shipping" value={0} className="custom-control-input"/>
														<label className="custom-control-label" htmlFor="free-shipping">Free Shipping</label>
													</div>
	                							</td>
	                							<td>$0.00</td>
	                						</tr>

	                						<tr className="summary-shipping-row">
	                							<td>
	                								<div className="custom-control custom-radio">
														<input onChange={inputRadio} type="radio" id="standart-shipping" name="shipping" value={standard||''} className="custom-control-input"/>
														<label className="custom-control-label" htmlFor="standart-shipping">Standart:</label>
													</div>
	                							</td>
	                							<td>${standard}</td>
	                						</tr>

	                						<tr className="summary-shipping-row">
	                							<td>
	                								<div className="custom-control custom-radio">
														<input onChange={inputRadio} type="radio" id="express-shipping" name="shipping" value={express||''} className="custom-control-input"/>
														<label className="custom-control-label" htmlFor="express-shipping">Express:</label>
													</div>
	                							</td>
	                							<td>${express}</td>
	                						</tr>

	                						<tr className="summary-shipping-estimate">
	                							{/* <td>Estimate for Your Country<br/> <a href="dashboard.html">Change address</a></td> */}
	                							<td>&nbsp;</td>
	                						</tr>

	                						<tr className="summary-total">
	                							<td>Total:</td>
	                							<td>${subtotal+parseInt(state3)}</td>
	                						</tr>
	                					</tbody>
	                				</table>

									<StripeCheckout name="Three Comma Co. Fadii"
                         description="Big Data Stuff" 
                         image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
                         shippingAddress
                         billingAddress
                         amount={(subtotal+parseInt(state3))*100}
                         token={onToken}
                         stripeKey={stripeKey}
						 >

	  					<button href="" className="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</button>
	                				{/* <a href="" onClick={ProceedToCheck} className="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</a> */}
  						</StripeCheckout>
	                			</div>

		            			{/* <a href="category.html" className="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i className="icon-refresh"></i></a> */}
	                		</aside>
                            
	                	</div>
	                </div>
                </div>
            </div>
        </main>
    
    </div>
    </>
  )
}

export default Cart
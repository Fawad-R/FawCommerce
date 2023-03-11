import React, { useState } from 'react'

const CheckOut = () => {
	let subtotal=0;
	let standard=0;
	let express=0;
	let total=0;
	let [state3,updateState3]=useState(0)
	let [state1,updateState1]=useState({})
	let inputEvent=(e)=>{
		updateState1({...state1,[e.target.name]:e.target.value})
		// console.log(state1);
	}
	let inputRadio=(e)=>{

		// console.log(e.target);
		// console.log(e.target.value);
		updateState3(e.target.value)
	}
  return (
    <>
    <div className='CheckOutMain'>
    <main className="main">
        	<div className="page-header text-center"style={{"backgroundImage": "url(assets/images/menu/demos/11.jpg)"}}>
        		<div className="container">
        			<h1 className="page-title">Checkout<span>Shop</span></h1>
        		</div>
        	</div>
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Shop</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
            	<div className="checkout">
	                <div className="container">
            			<form action="#">
		                	<div className="row">
		                		<div className="col-lg-9">
		                			<h2 className="checkout-title">Billing Details</h2>
		                				<div className="row">
		                					<div className="col-sm-6">
		                						<label>First Name *</label>
		                						<input onChange={inputEvent} name="firstname" type="text" className="form-control" required/>
		                					</div>

		                					<div className="col-sm-6">
		                						<label>Last Name *</label>
		                						<input onChange={inputEvent} name="lastname" type="text" className="form-control" required/>
		                					</div>
		                				</div>

	            						{/* <label>Company Name (Optional)</label>
	            						<input onChange={inputEvent} name="email" type="text" className="form-control"/> */}

	            						<label>Country *</label>
	            						<input onChange={inputEvent} name="country" type="text" className="form-control" required/>

	            						<label>Street address *</label>
	            						<input onChange={inputEvent} name="house_number" className="form-control" placeholder="House number and Street name" required/>
	            						<input onChange={inputEvent} name="appartments" type="text" className="form-control" placeholder="Appartments, suite, unit etc ..." required/>

	            						<div className="row">
		                					<div className="col-sm-6">
		                						<label>Town / City *</label>
		                						<input onChange={inputEvent} name="town" type="text" className="form-control" required/>
		                					</div>

		                					<div className="col-sm-6">
		                						<label>State / County *</label>
		                						<input onChange={inputEvent} type="text" name="state" className="form-control" required/>
		                					</div>
		                				</div>

		                				<div className="row">
		                					<div className="col-sm-6">
		                						<label>Postcode / ZIP *</label>
		                						<input onChange={inputEvent} name="postcode" type="text" className="form-control" required/>
		                					</div>

		                					<div className="col-sm-6">
		                						<label>Phone *</label>
		                						<input onChange={inputEvent} name="tel" type="tel" className="form-control" required/>
		                					</div>
                        				</div>
                        
	                					<label>Email address *</label>
	        							<input onChange={inputEvent} name="email" type="email" className="form-control" required/>

	        							{/* <div className="custom-control custom-checkbox">
											<input type="checkbox" className="custom-control-input" id="checkout-create-acc"/>
											<label className="custom-control-label" for="checkout-create-acc">Create an account?</label>
										</div>
                        
										<div className="custom-control custom-checkbox">
											<input type="checkbox" className="custom-control-input" id="checkout-diff-address"/>
											<label className="custom-control-label" for="checkout-diff-address">Ship to a different address?</label>
										</div>
                        
	                					<label>Order notes (optional)</label>
	        							<textarea className="form-control" cols="30" rows="4" placeholder="Notes about your order, e.g. special notes for delivery"></textarea> */}
		                		</div>
                        		<aside className="col-lg-3">
		                			<div className="summary">
		                				<h3 className="summary-title">Your Order</h3>

		                				<table className="table table-summary">
		                					<thead>
		                						<tr>
		                							<th>Product</th>
		                							<th>Total</th>
		                						</tr>
		                					</thead>

		                					<tbody>
		                						<tr>
		                							<td><a href="#">Beige knitted elastic runner shoes</a></td>
		                							<td>$84.00</td>
		                						</tr>

		                						<tr>
		                							<td><a href="#">Blue utility pinafore denimdress</a></td>
		                							<td>$76,00</td>
		                						</tr>
		                						<tr className="summary-subtotal">
		                							<td>Subtotal:</td>
		                							<td>$160.00</td>
		                						</tr>
                        						{/* <tr>
		                							<td>Shipping:</td>
		                							<td>Free shipping</td>
		                						</tr> */}
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
														<input onChange={inputRadio} type="radio" id="standart-shipping" name="shipping" value={standard} className="custom-control-input"/>
														<label className="custom-control-label" htmlFor="standart-shipping">Standart:</label>
													</div>
	                							</td>
	                							<td>${standard}</td>
	                						</tr>

	                						<tr className="summary-shipping-row">
	                							<td>
	                								<div className="custom-control custom-radio">
														<input onChange={inputRadio} type="radio" id="express-shipping" name="shipping" value={express} className="custom-control-input"/>
														<label className="custom-control-label" htmlFor="express-shipping">Express:</label>
													</div>
	                							</td>
	                							<td>${express}</td>
	                						</tr>

		                						<tr className="summary-total">
		                							<td>Total:</td>
		                							<td>$160.00</td>
		                						</tr>
                        					</tbody>
		                				</table>
                        
		                				<div className="accordion-summary" id="accordion-payment">
										    <div className="card">
										        <div className="card-header" id="heading-1">
										            <h2 className="card-title">
										                <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
										                    Direct bank transfer
										                </a>
										            </h2>
										        </div>
                                                {/* <!-- End .card-header --> */}
										        <div id="collapse-1" className="collapse show" aria-labelledby="heading-1" data-parent="#accordion-payment">
										            <div className="card-body">
										                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
										            </div>
                                                    {/* <!-- End .card-body --> */}
										        </div>
                                                {/* <!-- End .collapse --> */}
										    </div>
                                            {/* <!-- End .card --> */}

										    <div className="card">
										        <div className="card-header" id="heading-2">
										            <h2 className="card-title">
										                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
										                    Check payments
										                </a>
										            </h2>
										        </div>
                                                {/* <!-- End .card-header --> */}
										        <div id="collapse-2" className="collapse" aria-labelledby="heading-2" data-parent="#accordion-payment">
										            <div className="card-body">
										                Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. 
										            </div>
                                                    {/* <!-- End .card-body --> */}
										        </div>
                                                {/* <!-- End .collapse --> */}
										    </div>
                                            {/* <!-- End .card --> */}

										    <div className="card">
										        <div className="card-header" id="heading-3">
										            <h2 className="card-title">
										                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
										                    Cash on delivery
										                </a>
										            </h2>
										        </div>
                                                {/* <!-- End .card-header --> */}
										        <div id="collapse-3" className="collapse" aria-labelledby="heading-3" data-parent="#accordion-payment">
										            <div className="card-body">Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. 
										            </div>
                                                    {/* <!-- End .card-body --> */}
										        </div>
                                                {/* <!-- End .collapse --> */}
										    </div>
                                            {/* <!-- End .card --> */}

										    <div className="card">
										        <div className="card-header" id="heading-4">
										            <h2 className="card-title">
										                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4">
										                    PayPal <small className="float-right paypal-link">What is PayPal?</small>
										                </a>
										            </h2>
										        </div>
                                                {/* <!-- End .card-header --> */}
										        <div id="collapse-4" className="collapse" aria-labelledby="heading-4" data-parent="#accordion-payment">
										            <div className="card-body">
										                Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
										            </div>
                                                    {/* <!-- End .card-body --> */}
										        </div>
                                                {/* <!-- End .collapse --> */}
										    </div>
                                            {/* <!-- End .card --> */}

										    <div className="card">
										        <div className="card-header" id="heading-5">
										            <h2 className="card-title">
										  
                                                        <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-5" aria-expanded="false" aria-controls="collapse-5">
										                    Credit Card (Stripe)
										                    <img src="assets/images/payments-summary.png" alt="payments cards"/>
										                </a>
										            </h2>
										        </div>
                                                {/* <!-- End .card-header --> */}
										        <div id="collapse-5" className="collapse" aria-labelledby="heading-5" data-parent="#accordion-payment">
										            <div className="card-body"> Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit ame.
										            </div>
                                                    {/* <!-- End .card-body --> */}
										        </div>
                                                {/* <!-- End .collapse --> */}
										    </div>
                                            {/* <!-- End .card --> */}
										</div>
                                        {/* <!-- End .accordion --> */}

		                				<button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
		                					<span className="btn-text">Place Order</span>
		                					<span className="btn-hover-text">Proceed to Checkout</span>
		                				</button>
		                			</div>
                                    {/* <!-- End .summary --> */}
		                		</aside>
                                {/* <!-- End .col-lg-3 --> */}
		                	</div>
                            {/* <!-- End .row --> */}
            			</form>
	                </div>
                </div>
            </div>
        </main>
    
    </div>
    </>
  )
}

export default CheckOut
import React,{useState,useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
let stripeKey="pk_test_51MFGxxGsyHFe5lQADpu8EQF9BKy1N7wdpsmYQhwFGtv6ovbZ93uDWb6cTW92Dsr50q2p0zyjOI01O6VDYjthwf5K00zyktNRfo"
const Pay = () => {
    let [state1,updateState1]=useState(null);
    useEffect(()=>{
        let sentRequest=async()=>{
            try{
                let val=await axios.post('/payment',{
                    tokenId:state1.id,
                    amount:2000,
                })
                // console.log(val);
            }catch(err){
                // console.log(err);

            }
        }
        state1 && sentRequest();
    },[state1])
    let onToken=(token)=>{
        updateState1(token);
        // console.log(token);
    }
  return (
    <div>
         <StripeCheckout name="Three Comma Co. Fadii"
                         description="Big Data Stuff" 
                         image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
                         shippingAddress
                         billingAddress
                         amount={2000}
                         token={onToken}
                         stripeKey={stripeKey}
  >
        <button>Pay now</button>
         </StripeCheckout>
    </div>
  )
}

export default Pay
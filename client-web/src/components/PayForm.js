import React from "react";
import { makeRequest } from "../axios";


const PayForm = ({fname, lname, email, public_key, amount,tx_ref}) => {
    let userId = 1
    const posts= {
        user_id: userId,
        tx_ref: tx_ref
      }
    
    const handleClick = async()=>{
        try{
          makeRequest.post('/verify',posts )
        }catch(err){
         console.log(err)
        }
    
    }

  return (
    <>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input type="hidden" name="public_key" value={public_key} />
        <input type="hidden" name="tx_ref" value={tx_ref}/>
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
        />
        <input
          type="hidden"
          name="logo"
          value="https://chapa.link/asset/images/chapa_swirl.svg"
        />
        <input
          type="hidden"
          name="callback_url"
          value="http://localhost:3004/api/verify"
        />
        <input
          type="hidden"
          name="return_url"
          value="http://localhost:3000"
        />
        <input type="hidden" name="meta[title]" value="test" />
        <button type="submit" >Pay Now</button>
      </form>
    </>
  );
};

export default PayForm;

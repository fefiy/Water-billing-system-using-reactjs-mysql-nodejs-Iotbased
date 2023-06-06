import React, { useContext, useState } from "react";
import PayForm from "./PayForm";
import axios from "axios";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { v4 as uuidv4 } from 'uuid';
const Donate = () => {
    
  const {currentUser} = useContext(AuthContext)

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const tx_ref = uuidv4().toString();
  const public_key = "CHAPUBK_TEST-mYvAaAQU5eTAueBwZng3Ad9KECRtikVp";
 
  return (
    <div>
      <input
        placeholder="fristName"
        type="text"
        onChange={(e) => setFname(e.target.value)}
      />
      <br />
      <input
        placeholder="Lastname"
        type="text"
        onChange={(e) => setLname(e.target.value)}
      />
      <br />
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        placeholder="Amount"
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <PayForm
        lname={lname}
        fname={fname}
        amount={amount}
        public_key={public_key}
        email={email}
        tx_ref={tx_ref}
      />
    </div>
  );
};

export default Donate;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./register.css";
import {makeRequest} from "../../axios"
const Register = () => {
  const navigate = useNavigate();
  const [err , setErr] = useState(null)
  const roles = [
    { id: 1, val: "user" },
    { id: 2, val: "admin" },
  ];

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    mac: "",
    role_id: null,
    username: "",
    phone: "",
    region: "",
    zone: "",
    wereda: "",
    address: ""
  });

  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try{
      await makeRequest.post("/register" ,inputs)
      navigate("/admin");
    }catch(err){
     setErr(err)
      console.log(err)
    }
  };
  console.log(inputs)

  return (
    <div>
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <div className="form">
        {inputs.role_id ==2 ? (
          <>
            <div className="form-right">
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handlechange}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handlechange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handlechange}
                placeholder="Password"
              />
            </div>
            <div className="form-left">
              <input
                name="username"
                value={inputs.username}
                onChange={handlechange}
                placeholder="Username"
              />
               <input
                name="phone"
                value={inputs.phone}
                onChange={handlechange}
                placeholder="Phone Number"
              />
              <select
                name="role_id"
                value={inputs.role_id}
                onChange={handlechange}
                defaultValue="--select role--"
              >
                <option unselectable="on" >Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.val}
                  </option>
                ))}
              </select>
            </div>
            {/* {err && <div>
              {err.response}
              </div>} */}
          </>
        ) : (
          <>
            <div className="form-right">
              <input
                name="name"
                value={inputs.name}
                onChange={handlechange}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handlechange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handlechange}
                placeholder="Password"
              />
              <input
                name="mac"
                value={inputs.mac}
                onChange={handlechange}
                placeholder="MAC Address"
              />
            </div>
            <div className="form-left">
              <input
                name="phone"
                value={inputs.phone}
                onChange={handlechange}
                placeholder="Phone Number"
              />
              <input
                name="region"
                value={inputs.region}
                onChange={handlechange}
                placeholder="Region"
              />
              <input
                name="zone"
                value={inputs.zone}
                onChange={handlechange}
                placeholder="Zone"
              />
              <input
                name="wereda"
                value={inputs.wereda}
                onChange={handlechange}
                placeholder="Wereda, Kebele, Home Number"
              />
              <select
                name="role_id"
                value={inputs.role_id}
                onChange={handlechange}
                placeholder="--select role"
              >
                <option unselectable="on" >Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.val}
                  </option>
                ))}
              </select>
            </div>
            {/* {err && <div>
              {err.response}
              </div>} */}
          </>
        )}
      </div>
      <button style={{width:"60%", margin:"10px 20%", padding:"10px"}} onClick={handleFormSubmit}>Register</button>
    </div>
  );
};

export default Register;

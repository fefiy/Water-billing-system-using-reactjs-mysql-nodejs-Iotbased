import React, { useState, useContext } from "react";
import "./css/login.css";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    mac: "",
    password: "",
  });
  const handelLogin = async (e)=>{
    e.preventDefault();
    try{
        await login(inputs)
        console.log("log in calleded")
        navigate("/admin")
        console.log("after log in")
    // console.log(currentUser)
    }catch(err){
        setErr(err.response.data)
    }
  }

  console.log(err);

  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);
  return (
    <div className="Center">
      <h2 style={{ color: "white" }}> Login Form </h2>
      <div className="login-box">
        <div className="login-form">
          <div className="form-group">
            <label className="form-control-label"> USERNAME </label>
            <input
              name="mac"
              type="text"
              onChange={handlechange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-control-label"> PASSWORD </label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handlechange}
            />
          </div>
          <div>{err && <div style={{ color: "red" }}>{err.data}</div>}</div>
          <div className="login-button">
            <button
              type="submit"
              className="btn-outline-primary"
              onClick={handelLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

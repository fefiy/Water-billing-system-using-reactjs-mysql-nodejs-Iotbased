import  React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
const {login, currentUser} = useContext(AuthContext)
 const [err, setErr] = useState(null)
  const [input, setInput] = useState({
    mac:"",
    password:"",
  })

  const handleChange = (e)=>{
    setInput((prev)=> ({...prev, [e.target.name]:e.target.value}))
  }

  
  const handelLogin = async (e)=>{
    e.preventDefault();
    try{
        await login(input)
        console.log("log in calleded")
        navigate("/")
        console.log("after log in")
    console.log(currentUser)
    }catch(err){
        setErr(err.response.data)
    }
    

  }
  return (
    <div className="login">
      <div className="cardss">
        <div className="left">
          <h1>Hello world</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur
          </p>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" name="mac" onChange={handleChange} placeholder="mac" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            <button onClick={handelLogin}>login</button>
          </form>
          {err&& <div style={{color:"red"}}>{err}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;

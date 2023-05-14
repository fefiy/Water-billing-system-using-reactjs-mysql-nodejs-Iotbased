import React from "react";
import "./css/login.css";
const Login = () => {
  return (
    <div className="Center">
      <h2 style={{color:"white"}}>Login Form</h2>
      <div className="login-box">
        <div className="login-form">
          <div className="form-group">
            <label className="form-control-label">USERNAME</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-control-label">PASSWORD</label>
            <input type="password" className="form-control" i />
          </div>
          <div className="login-button">
            <button type="submit" className="btn-outline-primary">
              LOGIN
            </button>
          </div>
      </div>
      </div>
    </div>
  );
};

export default Login;

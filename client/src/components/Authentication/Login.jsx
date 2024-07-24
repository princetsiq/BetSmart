import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    // <form className="form">
    //   <span className="input-span">
    //     <label htmlFor="email" className="label">Email</label>
    //     <input type="email" className="email" id="email" />
    //   </span>
    //   <span className="input-span">
    //     <label htmlFor="password" className="label">Password</label>
    //     <input type="password" className="password" id="password" />
    //   </span>
    //   <span className="span">
    //     <a href="#">Forgot password?</a>
    //   </span>
    //   <input className="submit" type="submit" value="Log in" />
    //   <span className="span">
    //     Don't have an account?
    //     <a href="#">Sign up</a>
    //   </span>
    // </form>
    
    <div className="login-container">
      <h2>Login</h2>
      <form className="form">
        <div className="input-div">
          <label htmlFor="email" className="label">Email</label>
          <input type="email" className="email" id="email" />
        </div>
        <div className="input-div">
          <label htmlFor="password" className="label">Password</label>
          <input type="password" className="password" id="password" />
        </div>
        <div className="link-div">
          <a href="#">Forgot password?</a>
        </div>
        <input className="submit" type="submit" value="Log in" />
        <div className="link-div">
          Don't have an account?
          <a href="#">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
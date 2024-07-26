import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <div classname="login">
      <div className="login-container">
      <h1>Log In</h1>
      <h2>to continue to BetSmart</h2>
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
          <a href="/sign-up"> Sign up</a>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
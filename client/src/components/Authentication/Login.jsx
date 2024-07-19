import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <form className="form">
      <span className="input-span">
        <label htmlFor="email" className="label">Email</label>
        <input type="email" className="email" id="email" />
      </span>
      <span className="input-span">
        <label htmlFor="password" className="label">Password</label>
        <input type="password" className="password" id="password" />
      </span>
      <span className="span">
        <a href="#">Forgot password?</a>
      </span>
      <input className="submit" type="submit" value="Log in" />
      <span className="span">
        Don't have an account?
        <a href="#">Sign up</a>
      </span>
    </form>
  );
};

export default Login;
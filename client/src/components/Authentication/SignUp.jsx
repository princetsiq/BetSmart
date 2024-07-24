import React from 'react';
import './SignUp.scss';

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <label htmlFor="first-name">First Name:</label>
          <input type="text" id="first-name" name="firstName" required />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name:</label>
          <input type="text" id="last-name" name="lastName" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
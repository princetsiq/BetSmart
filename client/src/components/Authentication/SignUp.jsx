import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import outputs from '../../../../server/amplify_outputs.json';
import './SignUp.scss';

Amplify.configure(outputs)

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [emailValid, setEmailValid] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(false);

  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  const [requirements, setRequirements] = useState([
    {
      text: '8+ characters long',
      regex: /.{8,}/,
      met: false,
    },
    {
      text: 'Contains at least 1 number',
      regex: /\d/,
      met: false,
    },
    {
      text: 'Contains at least 1 special character',
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      met: false,
    },
    {
      text: 'Contains at least 1 uppercase letter',
      regex: /[A-Z]/,
      met: false,
    },
    {
      text: 'Contains at least 1 lowercase letter',
      regex: /[a-z]/,
      met: false,
    },
  ]);

  const handleEmailChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setEmailValid(emailRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const updatedRequirements = requirements.map((req) => ({
      ...req,
      met: req.regex.test(value),
    }));

    setRequirements(updatedRequirements);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target.elements;
      await signUp({
        username: form.email.value,
        password: form.password.value,
        // options: {
        //   userAttributes: {
        //     preferred_username: form.username.value,
        //     given_name: form.firstname.value,
        //     family_name: form.lastname.value,
        //   },
        // }
      });

      alert('Sign up successful! Please check your email for verification.');
      setConfirmationStep(true);
      setEmail(form.email.value);
      setUsername(form.username.value);
      setFirstName(form.firstname.value);
      setLastName(form.lastname.value)
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const resendCode = async (e) => {
    e.preventDefault();
    try {
      const input = { username: email };  
      const response = await resendSignUpCode(input);
      
      console.log('Code resent successfully:', response);
      alert('A new confirmation code has been sent to your email.');
    } catch (error) {
      console.error('Unexpected error:', error.message);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    try {
      const form = e.target.elements;
      const signUpResponse = await confirmSignUp({
        confirmationCode: form.confirmationCode.value, 
        username: email,
      });

      if (signUpResponse.isSignUpComplete) {
        const userPayload = {
          email,
          username,
          firstName,
          lastName,
        };

        await axios.post('http://localhost:5002/api/create-user', userPayload);

        alert('Sign up successful! You can now log in.');
        navigate('/login');
      } else {
        console.error('Sign up not complete:', signUpResponse.nextStep);
      }
    } catch (error) {
      console.error('Error handling confirmation code:', error);
    }
  };

  return (
    <div className='signup'>
      <div role='banner' className='banner-cover'>
        <div className="cover-components">
          <div className="component-1"/>
          <div className="component-2">
            <Link to='/' className="banner-title">BetSmart</Link>
          </div>
          <div className="component-3">
            <Link className="banner-sign-up" to='/login'>
              <p>Log In</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="signup-container">
        {confirmationStep ? (
          <>
            <br />
            <br />
            <h1>Confirm your account</h1>
            <br />
            <br />
            <form onSubmit={handleConfirmSignUp}>
              <div className="form-group">
                <label htmlFor="confirmationCode" className="form-label">Confirmation Code</label>
                <input
                  type="text"
                  id="confirmationCode"
                  className="form-input"
                  required
                />
              </div>
              <div className="submit-position">
                <button type="submit" className="signup-btn">Confirm Account</button>
              </div>
              <br />
              <div className='link-div'>
                <p>
                  Didn't receive the code? 
                  <a href="#" onClick={resendCode}> Click here to resend</a>
                </p>
              </div>
            </form>
          </> 
        ) : (
          <>
            <h1>Create your BetSmart Account</h1>
            <h2>You'll use this one account to access all BetSmart services.</h2>
            <br/>
            <br/>
            <form onSubmit={handleSubmit}>
              <div className="name">
                <div className="first form-group">
                  <label htmlFor="firstname" className="form-label">First Name</label>
                  <input type="text" id="firstname" className="form-input" required />
                </div>
                <div className="last form-group">
                  <label htmlFor="lastname" className="form-label">Last Name</label>
                  <input type="text" id="lastname" className="form-input" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" id="username" className="form-input" required />
              </div>
              <div className="email-container form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`form-input ${emailValid ? '' : 'invalid'}`}
                  onChange={handleEmailChange}
                  onFocus={() => setEmailFocused(true)}
                  // onBlur={() => setEmailFocused(false)}
                  required 
                />
                {emailFocused && !emailValid && 
                <div className="email-error">
                  <svg
                    id="error-icon44"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="error-icon"
                  >
                    <path
                      d="M12 2.25C10.0716 2.25 8.18655 2.82183 6.58319 3.89317C4.97981 4.96451 3.73013 6.48726 2.99218 8.26882C2.25422
                        10.0504 2.06114 12.0108 2.43735 13.9021C2.81356 15.7934 3.74215 17.5307 5.10571 18.8943C6.46927 20.2579 8.20658 
                        21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 
                        17.4168C21.1782 15.8135 21.75 13.9284 21.75 12C21.7451 9.41565 20.7162 6.93859 18.8888 5.11118C17.0615 3.28378 
                        14.5844 2.25496 12 2.25ZM11.25 7.5C11.25 7.30109 11.3291 7.11032 11.4697 6.96967C11.6103 6.82902 11.8011 6.75 
                        12 6.75C12.1989 6.75 12.3897 6.82902 12.5303 6.96967C12.6709 7.11032 12.75 7.30109 12.75 7.5V12.75C12.75 12.9489 
                        12.6709 13.1397 12.5303 13.2803C12.3897 13.4209 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.4209 11.4697 
                        13.2803C11.3291 13.1397 11.25 12.9489 11.25 12.75V7.5ZM12 17.25C11.7775 17.25 11.56 17.184 11.375 17.0604C11.19 
                        16.9368 11.0458 16.7611 10.9606 16.5555C10.8755 16.3499 10.8533 16.1237 10.8966 15.9055C10.94 15.6873 11.0472 
                        15.4868 11.2045 15.3295C11.3618 15.1722 11.5623 15.065 11.7806 15.0216C11.9987 14.9782 12.2249 15.0005 12.4305 
                        15.0857C12.6361 15.1708 12.8118 15.315 12.9354 15.4999C13.059 15.685 13.125 15.9025 13.125 16.125C13.125 16.4233 
                        13.0065 16.7095 12.7955 16.9205C12.5845 17.1315 12.2983 17.25 12 17.25Z"
                      fill="currentColor"
                    />
                  </svg>
                  Invalid email format
                </div>}
              </div>
              <div className="password-container form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type={passwordVisible ? "text" : "password"} 
                  id="password" 
                  className="form-input"
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required 
                />
                <button type="button" className="toggle-password" onClick={() => setPasswordVisible(prevState => !prevState)}>
                  {passwordVisible ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        fill="#C5C5C5" 
                        d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 
                          0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 
                          .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" 
                      />
                    </svg>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24">
                      <path 
                        fill="#C5C5C5" 
                        d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 
                          1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 
                          7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 
                          3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 
                          1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 
                          3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 
                          2.342z" 
                      />
                    </svg>
                  )}
                </button>
                {passwordFocused && (
                  <div className="requirements">
                    {requirements.map((req, index) => (
                      <div key={index} className={`requirement ${req.met ? 'met' : ''}`}>
                        <div className="toggle-requirement">
                          {req.met ? (
                            <svg
                              aria-label="checkmark"
                              fill="none"
                              role="img"
                              viewBox="0 0 24 24"
                              className="check-icon"
                            >
                              <path
                                d="m4 13 5 5L20 7"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          ) : (
                            <svg
                              aria-label="warning"
                              fill="none"
                              role="img"
                              viewBox="0 0 24 24"
                              className="warning-icon"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.865 1.499a1 1 0 0 0-1.73 0l-11 19A1 1 0 0 0 1 22h22a1 1 0 0 0 .865-1.501l-11-19zM11 
                                  8.5v6h2v-6h-2zm0 8v2h2v-2h-2z"
                                fill="currentColor"
                              />
                            </svg>
                          )}
                        </div>
                        {req.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="submit-position">
                <button type="submit" className="signup-btn">Create Account</button>
              </div>
              <br/>
              <hr className="break" />
            </form>
          </>
        )}
        <br />
        <br />
      </div>
    </div>
  );
};

export default SignUp;
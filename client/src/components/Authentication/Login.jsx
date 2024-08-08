import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { signIn, confirmResetPassword, resetPassword } from 'aws-amplify/auth';
import outputs from '../../../../server/amplify_outputs.json';
import './Login.scss';

Amplify.configure(outputs);

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState('LOGIN');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const output = await resetPassword({ username: email });
      const { nextStep } = output;
      switch (nextStep.resetPasswordStep) {
        case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
          console.log(`Confirmation code was sent to ${nextStep.codeDeliveryDetails.deliveryMedium}`);
          setStep('CONFIRM_CODE');
          break;
        case 'DONE':
          console.log('Successfully reset password.');
          setStep('DONE');
          break;
        default:
          console.error('Unknown step', nextStep.resetPasswordStep);
      }
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  const handleConfirmResetPassword = async () => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword: newPassword,
      });
      console.log('Confirming reset password...');
      setStep('DONE');
    } catch (error) {
      console.error('Error confirming reset password', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.currentTarget
      await signIn({
        username: form.elements.email.value,
        password: form.elements.password.value,
      });
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login">
      <div role="banner" className="banner-cover">
        <div className="cover-components">
          <div className="component-1"/>
          <div className="component-2">
            <Link to='/' className="banner-title">BetSmart</Link>
          </div>
          <div className="component-3">
            <Link className="banner-sign-up" to='/sign-up'>
              <p>Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="login-container">
        {step === 'LOGIN' && (
          <>
            <h1>Log In</h1>
            <h2>to continue to BetSmart</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-input" required />
              </div>
              <div className="password-container form-group no-padding">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-wrapper">
                  <input type={passwordVisible ? "text" : "password"} id="password" className="form-input" required />
                  <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#C5C5C5" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#C5C5C5" d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className='link-div forgot-password'>
                <a href='#' onClick={() => setStep('REQUEST_RESET')}>Forgot password?</a>
              </div>
              <div className="submit-position">
                <button type="submit" className="login-btn">Log In</button>
              </div>
              <div className="link-div no-account">
                Don't have an account?
                <Link to="/sign-up"> Sign up</Link>
              </div>
              <hr className="break" />
            </form>
          </>
        )}

        {step === 'REQUEST_RESET' && (
          <>
            <br />
            <h1>Reset Password</h1>
            <br />
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="recoveryEmail"
                  className="form-input"
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="submit-position">
                <button type="submit" className="login-btn">Reset</button>
              </div>
            </form>
          </>
        )}

        {step === 'CONFIRM_CODE' && (
          <>
            <br />
            <h1>Confirm Password Reset</h1>
            <br />
            <form onSubmit={handleConfirmResetPassword}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter the confirmation code"
                  id="recoveryCode"
                  className="form-input"
                  onChange={handleCodeChange}
                  required
                />
              </div>
              <div className="password-container form-group no-padding">
                <div className="password-wrapper">
                  <input 
                    type={passwordVisible ? "text" : "password"} 
                    placeholder="Enter your new password"
                    id="password" 
                    className="form-input" 
                    onChange={handleNewPasswordChange}
                    required 
                  />
                  <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#C5C5C5" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#C5C5C5" d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <br />
              <div className="submit-position">
                <button type="submit" className="login-btn">Reset</button>
              </div>
            </form>
          </>
        )}

        {step === 'DONE' && (
          <>
            <br />
            <form onSubmit={() => setStep('LOGIN')}>
              <h1>Password Reset Successfully</h1>
              <h2>You can now log in with your new password.</h2>
              <div className="submit-position">
                <button type="submit" className="login-btn">Go to Login</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Form = () => {
    //state variables(like firstNmae,lastNmae..) are initialized using the useState hook
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState({}); // Track form errors
  const [role, setRole] = useState('user'); // New state for role
  const [passwordStrength, setPasswordStrength] = useState('Weak'); // New state for password strength


  const fontFamilyStyle = {
    fontFamily: 'Dancing Script, cursive'
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //called when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address!' }));
      return;
    }

    // if (password !== confirmPassword) {
    //   setErrors((prevErrors) => ({ ...prevErrors, password: 'Passwords do not match!' }));
    //   return;
    // }

    setRegistrationSuccess(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getPasswordStrength = () => {
    // Password strength indicator logic here by length
    if (password.length < 6) {
      return 'Weak';
      //lenght is btwn 6 and 8, doesnt contain a digit or a special character
    } else if (password.length < 9 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      return 'Medium';
    } else {
      return 'Strong';
    }
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    //updates pwd state variable and cal the pwd strength using getPasswordStrength
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  
//rendering the form 
  return (
    <div style={{ backgroundColor: '#6791AF', height: '150vh', paddingTop: '20px'}}>
    <div className="container-sm shadow rounded "
     style={{ backgroundColor: '#ffffff',
     width: '450px' ,
     position: 'relative',
     height: 'auto', 
     display:'flex', 
     alignItems:'center',
     padding:'20px',
     justifyContent: 'center'
     }}>
      <div className="col">
        {registrationSuccess ? (
          <div>
            <h2>Registration successful!</h2>
            <p>Welcome, {firstName} {lastName} ({username})</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
             <h2 style={fontFamilyStyle}>Abren</h2>
             <h2>Sign Up</h2>
            <div className='row'>
            <div className="mb-1 col">
              <label htmlFor="firstName" className="form-label"></label>
              <input
                type="text"
                // if errors.firstname is true the is-invalid class is added to hhighligh the input field as being invalid
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                id="firstName"
                value={firstName}
                //onchange is an event listener that triggers when the value of the input field changes.
                //e.target refers to the element that triggered the event,the input field nad e.target.values retrives the current value of the input field
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder='First name'
                // style={{ height: '60px ', borderColor: '#6791AF'}}
                style={{  borderColor: '#6791AF'}}

                
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="mb-1 col">
              <label htmlFor="lastName" className="form-label"></label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder='Last name'
                // style={{ height: '60px ' , borderColor: '#6791AF'}}
                style={{  borderColor: '#6791AF'}}



              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            </div>
            <div className="mb-1">
              <label htmlFor="email" className="form-label"></label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
                style={{  borderColor: '#6791AF'}}


              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-1">
              <label htmlFor="username" className="form-label"></label>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Username'
                // style={{ height: '60px ' , borderColor: '#6791AF'}}
                style={{  borderColor: '#6791AF'}}



              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            <div className="mb-1">
              <label htmlFor="role" className="form-label"></label>
              <select
                className="form-select"
                id="role"
                value={role}
                placeholder='Role'
                // style={{ height: '60px ' , borderColor: '#6791AF'}}
                style={{  borderColor: '#6791AF'}}

                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"></label>
              <div className="input-group">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange} // Update password and strength on change
                  required
                  placeholder='Password'
                //   style={{ height: '60px ' , borderColor: '#6791AF'}}
                style={{  borderColor: '#6791AF'}}


                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </button>
              </div>
              {password && (
                <div className={`password-strength-bar ${passwordStrength.toLowerCase()}`}>
                  <div className="progress">
                  <div
  className="progress-bar"
  role="progressbar"
  style={{
    width: `${
      passwordStrength === 'Weak'
        ? 33
        : passwordStrength === 'Medium'
        ? 66
        : passwordStrength === 'Strong'
        ? 100
        : 0
    }%`,
  }}
  aria-valuenow={
    passwordStrength === 'Weak'
      ? 33
      : passwordStrength === 'Medium'
      ? 66
      : passwordStrength === 'Strong'
      ? 100
      : 0
  }
  aria-valuemin="0"
  aria-valuemax="100"
></div>
                  </div>
                  <span className="password-strength-label">{passwordStrength}</span>
                </div>
              )}
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
              {/* <div className="mb-1">
                <label htmlFor="confirmPassword" className="form-label"></label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder='Confirm password'
                  style={{ height: '60px '}}

                  
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div> */}
              <button type="submit" className="btn btn-primary"
              style={{
                backgroundColor: '#213D52',
                width: '200px',
                paddingBottom : '5px',
                marginBottom: '5px'
            
             }}
              >Sign Up</button>
             <p>
              Already have an account?{' '}
              <a href="/" style={{ color: '#213D52' }}>Login</a>
            </p>
            </form>
            
          )}
        </div>
      </div>
      </div>
      );
    };
    
    export default Form;
    
    
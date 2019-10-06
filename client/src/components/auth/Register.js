import React, { Fragment, useState } from "react";
//import axios from 'axios';
import { setAlert } from "../../actions/alert";
import { registerUser } from "../../actions/auth";
//import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const Register = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch(() => setAlert(), () => registerUser());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords Do Not Match", "danger"));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'> Create Your Account!!!</i>
      </p>
      <form onSubmit={e => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <small className='form-text'>
          This site uses Gravatar,so if you want a profile image, use gravatar
          email.
        </small>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            minLength='6'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            minLength='6'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='Register' className='btn btn-primary' />
        </div>
      </form>
      <p className='my-1'>
        Already have an Account link <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func,
  setAlert: PropTypes.array,
  isAuthenticated: PropTypes.bool
};

export default Register;

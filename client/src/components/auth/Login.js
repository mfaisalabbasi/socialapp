import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";

//import PropTypes from "prop-types";

const Login = () => {
  const dispatch = useDispatch(() => login());
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'>Sign In Your Account!!!</i>
      </p>
      <form onSubmit={e => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Enter Your Email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='Enter Your Password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='LogIn' className='btn btn-primary' />
        </div>
      </form>
      <p className='my-1'>
        Don't have an Account <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};
// Login.propTypes = {
//   isAuthenticated: PropTypes.bool,
//   login: PropTypes.func
// };
export default Login;

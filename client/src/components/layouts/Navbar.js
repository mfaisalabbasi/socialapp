import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = () => {
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch(() => logout());
  const { loading, isAuthenticated } = authState;
  const styles = { listStyle: "none" };
  const authLinks = (
    <Fragment>
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        <li>
          <Link to='/posts'>Posts</Link>
        </li>
        <li style={styles}>
          <Link to='/dashboard'>
            <i className='fas fa-user    '></i>
            {"  "}
            Dashboard
          </Link>
        </li>
        <li style={styles}>
          <a onClick={() => dispatch(logout())} href='#!'>
            <i className='fas fa-sign-out-alt    '></i>
            {"  "}
            Logout
          </a>
        </li>
      </ul>
    </Fragment>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>login</Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i>DevConnector
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </Fragment>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func,
  authState: PropTypes.object
};
export default Navbar;

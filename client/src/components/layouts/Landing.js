import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
const Landing = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Developer Connector</h1>
            <p className='lead'>
              Create Developer Profile/portfolio and give get help to
              other...Developer
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                SignUp
              </Link>
              <Link to='/login' className='btn '>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};
export default Landing;

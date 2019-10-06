import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentUser } from "../../actions/profile";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { deleteAccount } from "../../actions/profile";
const Dashboard = () => {
  const dispatch = useDispatch(() => getCurrentUser(), () => deleteAccount());
  const profileUser = useSelector(state => state.profile);
  const auth = useSelector(state => state.auth);
  const { profile, loading } = profileUser;
  const { user } = auth;

  useEffect(() => dispatch(getCurrentUser()), [dispatch]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fa fa-user'></i>
        {"  "}Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => dispatch(deleteAccount())}
            >
              Delete My Account!!!
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func,
  deleteAccount: PropTypes.func,
  auth: PropTypes.object,
  profileUser: PropTypes.object
};
export default Dashboard;

import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import TopProfile from "./TopProfile";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import { Link } from "react-router-dom";
import { getProfileByUserId } from "../../actions/profile";
import Spinner from "../layouts/Spinner";

const Profile = ({ match }) => {
  const dispatch = useDispatch(() => getProfileByUserId());
  const getProfile = useSelector(state => state.profile);
  const auth = useSelector(state => state.auth);
  const { loading, profile } = getProfile;
  useEffect(() => dispatch(getProfileByUserId(match.params.id)), [
    dispatch,
    match.params.id
  ]);
  return (
    <Fragment>
      {profile === null && loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Go Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <TopProfile profile={profile} />
            <ProfileAbout profile={profile} />
            <div class='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Added Yet...</h4>
              )}
            </div>
            <div class='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>Education Not Added yet!!!</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
Profile.propTypes = {
  getProfileByUserId: PropTypes.func,
  getProfile: PropTypes.object
};
export default Profile;

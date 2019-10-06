import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layouts/Spinner";
import ProfileItems from "./ProfileItems";

const Profiles = () => {
  const profile = useSelector(state => state.profile);
  const { profiles, loading } = profile;
  const dispatch = useDispatch(() => getProfiles());
  useEffect(() => dispatch(getProfiles()), [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and Connect With
            Developers...
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItems key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>profile not Found !!!...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;

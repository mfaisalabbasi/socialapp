import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, description }
}) => {
  return (
    <Fragment>
      <div>
        <h3>{school}</h3>
        <p>
          <Moment format='YYYY-MM-DD'>{from}</Moment> -{" "}
          {!to ? "NOW" : <Moment format='YYYY-MM-DD'>{to}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {fieldofstudy}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </Fragment>
  );
};
export default ProfileEducation;

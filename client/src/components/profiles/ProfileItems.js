import React from "react";
import { Link } from "react-router-dom";

const ProfileItems = ({
  profile: {
    user: { _id, name, avatar },
    status,
    skills,
    company,
    location
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='profile Missed...' className='img-round' />
      <div>
        <h2>{name}</h2>
        <p>
          {status}
          {company && <span>at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>at {location}</span>} </p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProfileItems;

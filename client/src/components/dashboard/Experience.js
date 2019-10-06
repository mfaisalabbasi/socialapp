import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience }) => {
  const dispatch = useDispatch(() => deleteExperience());
  const experiences = experience.map(exp => (
    <tr key={exp.id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='YYYY-MM-DD'>{exp.from}</Moment>-
        {exp.to === null ? "Now" : <Moment format='YYYY-DD-MM'>exp.to</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => dispatch(deleteExperience(exp.id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Year</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};
Experience.propTypes = {
  deleteExperience: PropTypes.func
};
export default Experience;

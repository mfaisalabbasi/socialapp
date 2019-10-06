import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profile";
const Education = ({ education }) => {
  const dispatch = useDispatch(() => deleteEducation());
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYYY-MM-DD'>{edu.from}</Moment>-
        {edu.to === null ? "Now" : <Moment format='YYYY-DD-MM'>edu.to</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => dispatch(deleteEducation(edu.id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Schools</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>From</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};
Education.propTypes = {
  deleteEducation: PropTypes.func
};
export default Education;

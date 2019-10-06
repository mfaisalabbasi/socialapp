import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { addComment } from "../../actions/post";
import { useSelector } from "react-redux";

const CommentForm = ({ postId }) => {
  const dispatch = useSelector(() => addComment());
  const [text, setText] = useState("");
  return (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>leave a comment...</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={e => {
            e.preventDefault();
            dispatch(addComment({ text }, postId));
            setText("");
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            required
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};
CommentForm.propTypes = {
  addComment: PropTypes.func
};
export default CommentForm;

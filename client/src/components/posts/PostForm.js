import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../actions/post";

const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch(() => addPost());

  return (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={e => {
            e.preventDefault();
            dispatch(addPost({ text }));
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
PostForm.propTypes = {
  addPost: PropTypes.func
};
export default PostForm;

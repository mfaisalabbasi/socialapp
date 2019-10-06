import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";
import { getPosts } from "../../actions/post";
import PostItems from "./PostItems";
import PostForm from "./PostForm";

const Posts = () => {
  const dispatch = useDispatch(() => getPosts());
  const post = useSelector(state => state.post);
  const { loading, posts } = post;
  useEffect(() => dispatch(getPosts()), [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome to Community...
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItems key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};
Posts.propTypes = {
  getPost: PropTypes.func,
  post: PropTypes.object
};
export default Posts;

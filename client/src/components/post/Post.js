import React, { Fragment, useEffect } from "react";
import { getPost } from "../../actions/post";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";
import PostItems from "../posts/PostItems";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = ({ match }) => {
  const dispatch = useDispatch(() => getPost());
  const fetchPost = useSelector(state => state.post);
  const { loading, post } = fetchPost;

  useEffect(() => dispatch(getPost(match.params.id)), [dispatch]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostItems post={post} showActions={true} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};
Post.protoTypes = {
  getPost: PropTypes.func,
  fetchPost: PropTypes.object
};
export default Post;

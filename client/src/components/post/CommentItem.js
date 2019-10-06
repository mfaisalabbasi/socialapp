import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { removeComment } from "../../actions/post";

const CommentItem = ({
  comment: { _id, avatar, text, name, user, date },
  postId
}) => {
  const dispatch = useDispatch(() => removeComment());
  const auth = useSelector(state => state.auth);
  return (
    <Fragment>
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link href={`/profile/${user}`}>
            <img class='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{text}</p>
          <p class='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={e => dispatch(removeComment(postId, _id))}
            ></button>
          )}
        </div>
      </div>
    </Fragment>
  );
};
CommentItem.propTypes = {
  postId: PropTypes.number,
  comment: PropTypes.object,
  auth: PropTypes.object,
  deleteComment: PropTypes.func
};
export default CommentItem;

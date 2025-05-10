import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../../components";
import { Comment } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAsync } from "../../../../action";
import { PROP_TYPE, ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selectors";
import PropTypes from "prop-types";
import styled from "styled-components";
const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

  const userRole = useSelector(selectUserRole);
  const isGuest = userRole === ROLE.GUEST;

  const onNewCommentAdd = (postId, content) => {
    dispatch(addCommentAsync(postId, content));
    setNewComment("");
  };
  return (
    <div className={className}>
      {!isGuest && (
        <div className="new-comment">
          <textarea
            name="comment"
            value={newComment}
            placeholder="Комментарии ..."
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <Icon
            icon={faPaperPlane}
            margin="3px 0 0 10px"
            onClick={() => onNewCommentAdd(postId, newComment)}
          />
        </div>
      )}

      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => {
          return (
            <Comment
              key={id}
              id={id}
              author={author}
              content={content}
              postId={postId}
              publishedAt={publishedAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  width: 580px;
  margin: 0 auto;

  & .new-comment {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 0;
    width: 100%;
  }

  & .new-comment textarea {
    resize: none;
    width: 550px;
    height: 120px;
    font-size: 18px;
  }

  & .comments {
    margin: 20px 0 0;
  }
`;

Comments.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
  postId: PropTypes.string.isRequired,
};

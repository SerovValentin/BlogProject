import PropTypes from "prop-types";
import {
  faCircleUser,
  faCalendar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  removeCommentAsync,
  openModal,
  CLOSE_MODAL,
} from "../../../../../../action";
import { Icon } from "../../../../../../components";
import { useSelector } from "react-redux";
import { checkAccess } from "../../../../../../utils";
import { ROLE } from "../../../../../../constants";
import { selectUserRole } from "../../../../../../selectors";
import styled from "styled-components";

const CommentContainer = ({
  className,
  author,
  content,
  publishedAt,
  id,
  postId,
}) => {
  const dispatch = useDispatch();

  const userRole = useSelector(selectUserRole);
  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(postId, id)), dispatch(CLOSE_MODAL);
        },
        onCansel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdminOrModerator = checkAccess(
    [ROLE.ADMIN, ROLE.MODERATOR],
    userRole
  );

  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon icon={faCircleUser} margin="0 10px 0 0" size="18px" />
            {author}
          </div>
          <div className="published-at">
            <Icon icon={faCalendar} margin="-3px 10px 0 0" size="18px" />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      {isAdminOrModerator && (
        <Icon
          icon={faTrash}
          margin="3px 0 0 13px"
          size="18px"
          onClick={() => onCommentRemove(id)}
        />
      )}
    </div>
  );
};

export const Comment = styled(CommentContainer)`
display: flex;
 margin-top: 10px;
 width: 100%;

  & .comment {
    width: 550px;
    padding: 5px 10px;
   border: 1px solid black;
  }
  & .information-panel {
    display: flex;
    justify-content: space-between;
  }
  & .author {
    display: flex;
  } 
  & .published-at {
    display: flex;
    width: 32%;
    
    }
  }`;

CommentContainer.propTypes = {
  postId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
};

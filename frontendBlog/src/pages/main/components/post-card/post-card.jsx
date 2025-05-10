import { faCalendar, faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { Icon } from "../../../../components";
import PropTypes from "prop-types";
import styled from "styled-components";

const PostCardContainer = ({
  className,
  id,
  title,
  imageUrl,
  publishedAt,
  commentsCount,
}) => {
  return (
    <Link to={`/post/${id}`}>
      <div className={className}>
        <img src={imageUrl || null} alt={title} />
        <div className="post-card-footer">
          <h4>{title}</h4>
          <div className="post-card-info">
            <div className="published-at">
              <Icon icon={faCalendar} size="18px" margin="0 5px 0 0" />{" "}
              {publishedAt}
            </div>
            <div className="comments-count">
              <Icon icon={faComment} size="18px" margin="0 5px 0 0" />{" "}
              {commentsCount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const PostCard = styled(PostCardContainer)`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 20px;
  border: 1px solid black;
  height: 90%;

  & h4 {
    margin: 0;
  }

  & .post-card-footer {
    border-top: 1px solid black;
    padding: 5px;
  }
  & img {
    display: block;
  }

  & .post-card-info {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  & .published-at {
    display: flex;
  }
  & .comments-count {
    display: flex;
  }
`;

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
};

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SpecialPanel } from "../special-panel/special-panel";
import { H2, Icon } from "../../../../components";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { PROP_TYPE } from "../../../../constants";
const PostContentContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <img src={imageUrl || null} alt={title} />
      <H2>{title}</H2>
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="-20px 0 20px"
        editButton={
          <Icon
            icon={faPenToSquare}
            size="21px"
            margin="0 10px 0 20px"
            onClick={() => navigate(`/post/${id}/edit`)}
          />
        }
      />
      <div className="post-text">{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContentContainer)`
  & img {
    float: left;
    margin: 10px 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;

PostContent.propTypes = {
  post: PROP_TYPE.POST.isRequired,
};

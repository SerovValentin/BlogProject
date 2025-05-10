import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useRef, useState } from "react";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { sanitizeContent } from "../post-form/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { savePostAsync } from "../../../../action";
import styled from "styled-components";
import { PROP_TYPE } from "../../../../constants";
const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(title);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML);
    dispatch(
      savePostAsync(id, {
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent,
      })
    ).then(({ id }) => navigate(`/post/${id}`));
  };

  const onImageChange = ({ target }) => setImageUrlValue(target.value);
  const onTitleChange = ({ target }) => setTitleValue(target.value);
  return (
    <div className={className}>
      <Input
        value={imageUrlValue}
        placeholder="Изображение..."
        onChange={onImageChange}
      />
      <Input
        value={titleValue}
        placeholder="Заголовок..."
        onChange={onTitleChange}
      />
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="0px 0px"
        editButton={
          <Icon
            icon={faFloppyDisk}
            size="21px"
            margin="0 10px 0 20px"
            onClick={onSave}
          />
        }
      />
      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="post-text"
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  & .post-text {
    margin: 10px 0;
    min-height: 80px;
    border: 1px solid black;
    font-size: 18px;
    white-space: pre-line;
  }
`;

PostFormContainer.propTypes = {
  post: PROP_TYPE.POST.isRequired,
};

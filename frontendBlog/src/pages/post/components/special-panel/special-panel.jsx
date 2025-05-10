import { Icon } from "../../../../components";
import { openModal, removePostAsync, CLOSE_MODAL } from "../../../../action";
import { faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { checkAccess } from "../../../../utils";
import { ROLE } from "../../../../constants";
import PropTypes from "prop-types";
import { selectUserRole } from "../../../../selectors";
import { styled } from "styled-components";

const SpecialPanelConteiner = ({ className, publishedAt, editButton, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);

  const onPostRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(id)).then(() => navigate("/")),
            dispatch(CLOSE_MODAL);
        },
        onCansel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdmin = checkAccess([ROLE.ADMIN], userRole);
  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && <Icon icon={faCalendar} margin="0 6px 0 0" />}
        {publishedAt}
      </div>
      {isAdmin && (
        <div className="buttons">
          {editButton}
          {publishedAt && (
            <Icon
              icon={faTrash}
              size="21px"
              margin="0 0 0 10px"
              onClick={() => onPostRemove(id)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelConteiner)`
  display: flex;
  justify-content: space-between;
  margin: ${(margin) => margin};

  & .published-at {
    display: flex;
    font-size: 18px;
  }
  & i {
    position: relative;
    top: -1px;
  }
  & .buttons {
    display: flex;
  }
`;

SpecialPanelConteiner.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  editButton: PropTypes.func.isRequired,
};

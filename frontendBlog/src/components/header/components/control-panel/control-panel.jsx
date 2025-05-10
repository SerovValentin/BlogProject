import {
  faBackward,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { Icon, Button } from "../../../../components";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ROLE } from "../../../../constants";
import { selectUserRole, selectUserLogin } from "../../../../selectors";
import { logout } from "../../../../action";
import { checkAccess } from "../../../../utils";
import styled from "styled-components";

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 4px 0;
`;

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>

            <Icon
              icon={faRightFromBracket}
              size="24px"
              margin="0 0 4px 10px"
              onClick={onLogout}
            />
          </>
        )}
      </RightAligned>
      <RightAligned>
        <Icon
          icon={faBackward}
          size="20px"
          margin="10px 0 0 0 "
          onClick={() => navigate(-1)}
        />
        {isAdmin && (
          <>
            {" "}
            <Link to="/post">
              <Icon icon={faFileLines} margin="10px 0 0 18px" />{" "}
            </Link>
            <Link to="/users">
              <Icon icon={faUsers} margin="10px 0 0 18px" />{" "}
            </Link>
          </>
        )}
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;

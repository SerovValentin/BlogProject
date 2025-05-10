import { faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Icon } from "../../../../components";
import { TableRow } from "../table-row/table-row";
import PropTypes from "prop-types";
import styled from "styled-components";
import { PROP_TYPE } from "../../../../constants";
import { request } from "../../../../utils/request";

const UserRowContainer = ({
  className,
  id,
  login,
  registeredAt,
  roleId: userRoleId,
  roles,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (userId, newUserRoleId) => {
    request(`/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(
      ({ error }) => {
        if (error) {
          alert(error);
        } else {
          setInitialRoleId(newUserRoleId);
        }
      }
    );
  };

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;
  return (
    <div className={className}>
      <TableRow border={true}>
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registeredAt}</div>
        <div className="role-column">
          <select value={selectedRoleId} onChange={onRoleChange}>
            {roles.map(({ id: roleId, name: roleName }) => (
              <option value={roleId} key={roleId}>
                {roleName}
              </option>
            ))}
          </select>
          <Icon
            icon={faFloppyDisk}
            margin="0 0 0 10px"
            disabled={isSaveButtonDisabled}
            onClick={() => onRoleSave(id, selectedRoleId)}
          />
        </div>
      </TableRow>

      <Icon icon={faTrashCan} margin="0 0 0 10px" onClick={onUserRemove} />
    </div>
  );
};

export const UserRow = styled(UserRowContainer)`
  display: flex;
  margin: 10px 0;

  & select {
    font-size: 16px;
    padding: 0 5px;
  }
`;

UserRowContainer.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  registeredAt: PropTypes.string.isRequired,
  roleId: PROP_TYPE.ROLE_ID.isRequired,
  roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
  onUserRemove: PropTypes.func.isRequired,
};

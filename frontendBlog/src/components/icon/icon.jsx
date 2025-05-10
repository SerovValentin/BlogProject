import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";

const IconContainer = ({ className, icon, onClick, ...props }) => (
  <div className={className} onClick={onClick} {...props}>
    <FontAwesomeIcon icon={icon} />
  </div>
);
export const Icon = styled(IconContainer)`
  font-size: ${({ size = "20px" }) => size};
  margin: ${({ margin = "0" }) => margin};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};
  &:hover {
    cursor: ${({ onClick }) => onClick && "pointer"};
  }
`;

IconContainer.propTypes = {
  icon: PropTypes.oneOfType([icon, PropTypes.string]),
  size: PropTypes.string,
  onClick: PropTypes.func,
};

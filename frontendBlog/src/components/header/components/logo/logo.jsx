import { faCode } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { Link } from "react-router";

const LargeText = styled.div`
  font-size: 48px;
  font-weight: 600;
  line-height: 48px;
  margin-top: 4px;
`;

const SmallText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const LogoContainer = ({ className }) => {
  return (
    <Link className={className} to="/">
      <Icon icon={faCode} size="60px" margin="0 10px 0 0" />
      <div>
        <LargeText>Блог</LargeText>
        <SmallText>веб-разработчика</SmallText>
      </div>
    </Link>
  );
};

export const Logo = styled(LogoContainer)`
  display: flex;
  margin-top: -10px;
`;

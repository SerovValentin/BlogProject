import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Icon, Input } from "../../../../components";
import styled from "styled-components";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
  return (
    <div className={className}>
      <Input
        valuse={searchPhrase}
        placeholder="Поиск по заголовкам"
        onChange={onChange}
      />
      <Icon icon={faMagnifyingGlass} size="21px" />
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  position: relative;
  width: 340px;
  height: 40px;
  margin: 40px auto 0;

  & > input {
    padding: 10px 32px 10px 10px;
  }

  & > div {
    position: absolute;
    right: 3px;
    top: 9px;
    font-size: 21px;
  }
`;

Search.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

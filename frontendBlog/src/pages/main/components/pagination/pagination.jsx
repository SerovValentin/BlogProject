import { Button } from "../../../../components";
import PropTypes from "prop-types";
import styled from "styled-components";

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
  return (
    <div className={className}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Предыдущая
      </Button>
      <div className="current-page">Страница: {page}</div>
      <Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Следующая
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец{" "}
      </Button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
  padding: 0 35px;
  position: absolute;
  bottom: 140px;
  width: 100%;

  & button {
    margin: 0 5px;
  }

  & .current-page {
    width: 100%;
    height: 32px;
    margin: 0 5px;
    text-align: center;
    border: 1px solid black;
    font-size: 18px;
    font-weight: 500;
    line-height: 29px;
  }
`;

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

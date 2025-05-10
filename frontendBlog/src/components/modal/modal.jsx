import { Button } from "../button/button";
import { useSelector } from "react-redux";
import {
  selectModalIsOpen,
  selectModalOnCansel,
  selectModalOnConfirm,
  selectModalText,
} from "../../selectors";
import styled from "styled-components";

const ModalContainer = ({ className }) => {
  const isOpen = useSelector(selectModalIsOpen);
  const text = useSelector(selectModalText);
  const onConfirm = useSelector(selectModalOnConfirm);
  const onCansel = useSelector(selectModalOnCansel);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className}>
      <div className="overlay"></div>
      <div className="box">
        <h3>{text}</h3>
        <div className="buttons">
          <Button width="120px" onClick={onConfirm}>
            Да
          </Button>
          <Button width="120px" onClick={onCansel}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Modal = styled(ModalContainer)`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  & .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
  }
  & .box {
    position: relative;
    width: 400px;
    margin: 0 auto;
    top: 50%;
    transform: translate(0, -50%);
    padding: 1px 0 20px 20px;
    background-color: #fff;
    border: 1px solid black;
    z-index: 30;
    text-align: center;
  }
  & .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;

import styled from "styled-components";
import { createPortal } from "react-dom";
import { createContext, useContext, useState, cloneElement } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import CrossIcon from "../assets/icons/cross.svg";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  border-radius: 2.5rem;
  /* padding: 3.4rem 4rem; */
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-backdrop);
  z-index: 1000;
  transition: all 0.5s;
`;

const Cross = styled.img`
  height: 1.27rem;
  width: 1.27rem;
  z-index: 3;
  position: relative;
`;

const Button = styled.button`
  background: none;
  border: none;
  transition: all 0.2s;
  position: absolute;
  top: 4.7rem;
  right: 3.8rem;
  cursor: pointer;
  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const { ref } = useOutsideClick(close);

  if (name !== openName) {
    return null;
  }

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <Cross src={CrossIcon} />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })} </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

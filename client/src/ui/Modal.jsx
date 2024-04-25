import styled from "styled-components";
import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1040;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
  background: white;
  padding: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: auto;
  max-width: 90%;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Backdrop onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <HiXMark />
        </CloseButton>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </Backdrop>
  );
}

export default Modal;

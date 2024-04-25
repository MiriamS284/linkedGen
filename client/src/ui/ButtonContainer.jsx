import styled from "styled-components";
import { HiArrowLongLeft } from "react-icons/hi2";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledArrow = styled(HiArrowLongLeft)`
  font-size: 3rem;
  cursor: pointer;
`;

export { BackButton, ButtonContainer, BackButtonContainer, StyledArrow };

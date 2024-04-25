import styled, { css } from "styled-components";

// Container für die gesamte Form
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

// Styling für die Schritte-Übersicht
export const StepsContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
  }
`;

export const StepIndicator = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #0077b5;
  }

  ${(props) =>
    props.$isActive &&
    css`
      background-color: #0077b5;
      color: #ffffff;
    `}
`;

export const StepContent = styled.div`
  flex: 1;
  width: 100%;
`;

export const Button = styled.button`
  padding: 0.8rem 1.6rem;
  margin-top: 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #4f46e5;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #3730a3;
  }

  &:last-child {
    margin-right: 0;
  }

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: #e2e8f0;
      color: #1a202c;
    `}
`;

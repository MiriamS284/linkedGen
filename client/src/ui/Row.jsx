import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${(props) =>
    props.horizontal &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}

  @media (max-width: 768px) {
    flex-direction: column;

    & > button {
      width: 100%;
    }
  }
`;

export default Row;

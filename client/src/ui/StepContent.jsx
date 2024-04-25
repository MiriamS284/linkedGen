import styled from "styled-components";

export const OptionContainer = styled.div`
  margin: 1rem;
`;

export const CheckboxLabel = styled.label`
  display: block;
  padding: 10px;
  margin: 1rem 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) =>
    props.checked ? "rgba(0, 119, 181, 0.5);" : "transparent"};
  color: ${(props) => (props.checked ? "#ffffff" : "#000")};

  &:hover {
    background-color: ${(props) =>
      props.checked ? "rgba(0, 119, 181, 0.5);" : "#ffffff"};
  }
`;

export const Description = styled.p`
  margin-top: 0.5;
  margin-left: 1.5rem;
  color: #666;
  font-weight: 300;
`;

export const Checkbox = styled.input`
  margin-right: 1rem;
`;

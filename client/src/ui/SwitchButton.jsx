import styled from "styled-components";

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: var(--linked-dark-blue);
  }

  &:checked + ${Slider}:before {
    transform: translateX(35px);
  }
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 24px;
  margin: 0 10px;
`;

function Switch({ isOn, handleToggle }) {
  return (
    <SwitchLabel>
      <Input type="checkbox" checked={isOn} onChange={handleToggle} />
      <Slider className="slider"></Slider>
    </SwitchLabel>
  );
}

export default Switch;

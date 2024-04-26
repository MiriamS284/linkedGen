import styled from "styled-components";
import SwitchButton from "../../ui/SwitchButton";
import {
  HiOutlineCheck,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineNoSymbol,
} from "react-icons/hi2";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 20px;

  @media (max-width: 768px) {
    padding: 5px;
    margin: 5px;
    font-size: 1.2rem;
    height: auto;
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const Icon = styled.span`
  display: inline-flex;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

function SettingsForm() {
  return (
    <>
      <Form>
        <FormRow>
          <Label>Dunkelmodus aktivieren:</Label>
          <ToggleContainer>
            <Icon>
              <HiOutlineSun />
            </Icon>
            <SwitchButton />
            <Icon>
              <HiOutlineMoon />
            </Icon>
          </ToggleContainer>
        </FormRow>
      </Form>
      <Form>
        <FormRow>
          <Label>Benutzerdaten für Postgenerierung:</Label>
          <ToggleContainer>
            <Icon>
              <HiOutlineNoSymbol />
            </Icon>
            <SwitchButton />
            <Icon>
              <HiOutlineCheck />
            </Icon>
          </ToggleContainer>
        </FormRow>
      </Form>

      <Form>
        <FormRow>
          <Label>Benachrichtigungen aktivieren:</Label>
          <ToggleContainer>
            <Icon>
              <HiOutlineNoSymbol />
            </Icon>
            <SwitchButton />
            <Icon>
              <HiOutlineCheck />
            </Icon>
          </ToggleContainer>
        </FormRow>
      </Form>
      <Form>
        <FormRow>
          <Label>Benutzerdefinierte Settings:</Label>
          <ToggleContainer>
            <Icon>
              <HiOutlineNoSymbol />
            </Icon>
            <SwitchButton />
            <Icon>
              <HiOutlineCheck />
            </Icon>
          </ToggleContainer>
        </FormRow>
      </Form>
      <Form>
        <FormRow>
          <Label>Weitere benutzerdefinierte Settings:</Label>
          <ToggleContainer>
            <Icon>
              <HiOutlineNoSymbol />
            </Icon>
            <SwitchButton />
            <Icon>
              <HiOutlineCheck />
            </Icon>
          </ToggleContainer>
        </FormRow>
      </Form>
    </>
  );
}

export default SettingsForm;

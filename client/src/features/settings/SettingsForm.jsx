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

function SettingsForm() {
  return (
    <>
      <Form>
        <FormRow>
          <Label>Dunkelmodus aktivieren:</Label>
          <ToggleContainer>
            <span>
              <HiOutlineSun size={24} />
            </span>
            <SwitchButton />
            <span>
              <HiOutlineMoon size={24} />
            </span>
          </ToggleContainer>
        </FormRow>
      </Form>
      <Form>
        <FormRow>
          <Label>Benutzerdaten für Postgenerierung:</Label>
          <ToggleContainer>
            <span>
              <HiOutlineNoSymbol size={24} />
            </span>
            <SwitchButton />
            <span>
              <HiOutlineCheck size={24} />
            </span>
          </ToggleContainer>
        </FormRow>
      </Form>

      <Form>
        <FormRow>
          <Label>Benachrichtigungen aktivieren:</Label>
          <ToggleContainer>
            <span>
              <HiOutlineNoSymbol size={24} />
            </span>
            <SwitchButton />
            <span>
              <HiOutlineCheck size={24} />
            </span>
          </ToggleContainer>
        </FormRow>
      </Form>
      <Form>
        <FormRow>
          <Label>Benutzerdefinierte Settings:</Label>
          <ToggleContainer>
            <span>
              <HiOutlineNoSymbol size={24} />
            </span>
            <SwitchButton />
            <span>
              <HiOutlineCheck size={24} />
            </span>
          </ToggleContainer>
        </FormRow>
      </Form>
      <Form>
        <FormRow>
          <Label>Weitere benutzerdefinierte Settings:</Label>
          <ToggleContainer>
            <span>
              <HiOutlineNoSymbol size={24} />
            </span>
            <SwitchButton />
            <span>
              <HiOutlineCheck size={24} />
            </span>
          </ToggleContainer>
        </FormRow>
      </Form>
    </>
  );
}

export default SettingsForm;

import LanguageSelector from "../features/settings/SelectLanguageForm";
import styled from "styled-components";
import SettingsForm from "../features/settings/SettingsForm";

const SettingsSection = styled.div`
  width: 100%;
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 5px;
    margin: 5px 0;
    width: 100%;
  }
`;

function Settings() {
  return (
    <>
      <SettingsSection>
        <LanguageSelector />

        <SettingsForm />
      </SettingsSection>
    </>
  );
}

export default Settings;

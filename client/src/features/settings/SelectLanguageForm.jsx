import { useState } from "react";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";

const languageOptions = [
  { value: "en", label: "English", countryCode: "us" },
  { value: "es", label: "Español", countryCode: "es" },
  { value: "fr", label: "Français", countryCode: "fr" },
  { value: "de", label: "Deutsch", countryCode: "de" },
];

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 20px;
  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const Label = styled.label`
  font-weight: bold;

  @media (max-width: 768px) {
    margin-right: 5px;
    margin-bottom: 5px; // Fügt einen unteren Margin hinzu, um Raum zwischen Label und Select zu schaffen
  }
`;

const LanguageSelector = () => {
  const [selectedOption, setSelectedOption] = useState(languageOptions[0]); // default to English

  const handleChange = (option) => {
    setSelectedOption(option);
    console.log("Selected language:", option.label);
  };
  return (
    <Form>
      <FormRow>
        <Label>Sprachauswahl:</Label>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={languageOptions}
          getOptionLabel={(option) => (
            <>
              <ReactCountryFlag
                countryCode={option.countryCode}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  marginRight: "10px",
                }}
              />
              {option.label}
            </>
          )}
        />
      </FormRow>
    </Form>
  );
};

export default LanguageSelector;

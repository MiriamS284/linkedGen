import { useState } from "react";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { OptionContainer, Description } from "../../ui/StepContent";
import Textarea from "../../ui/Textarea";

const Step5 = ({ onUpdate }) => {
  const [textInputs, setTextInputs] = useState([{ value: "", id: 0 }]);

  const handleAddInput = () => {
    if (textInputs.length < 3) {
      setTextInputs([...textInputs, { value: "", id: textInputs.length }]);
    }
  };

  const handleChange = (id, newValue) => {
    const updatedInputs = textInputs.map((input) =>
      input.id === id ? { ...input, value: newValue } : input
    );
    setTextInputs(updatedInputs);
    onUpdate(updatedInputs.map((input) => input.value)); // Auto-save functionality
  };

  return (
    <OptionContainer>
      <Heading as="h2">Fügen Sie bis zu 3 Textbeispiele hinzu</Heading>
      <Description>
        z.Bsp. erfolgreiche Postings, Blogbeiträge, Kommentare etc.
      </Description>
      {textInputs.map((input, index) => (
        <Textarea
          key={input.id}
          value={input.value}
          onChange={(e) => handleChange(input.id, e.target.value)}
          placeholder={`Eingabe ${index + 1}`}
        />
      ))}
      {textInputs.length < 3 && (
        <Button variation="addButton" onClick={handleAddInput}>
          + Textbeispiel
        </Button>
      )}
    </OptionContainer>
  );
};

export default Step5;

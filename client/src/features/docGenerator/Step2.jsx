import Heading from "../../ui/Heading";
import {
  OptionContainer,
  CheckboxLabel,
  Description,
  Checkbox,
} from "../../ui/StepContent";

const Step2 = ({ onSelectOption, selectedOptions }) => {
  const options = [
    {
      id: "branchenexperten",
      title: "Branchenexperten und Fachleute",
      description:
        "Beiträge, die sich an Personen richten, die in Ihrer Branche tätig sind und spezifisches Fachwissen oder Interesse an branchenspezifischen Themen haben.",
    },
    {
      id: "führungskräfte",
      title: "Entscheidungsträger und Führungskräfte",
      description:
        "Inhalte, die darauf abzielen, Führungskräfte und Entscheidungsträger in Unternehmen anzusprechen, um Geschäftsmöglichkeiten zu schaffen oder strategische Partnerschaften einzugehen.",
    },
    {
      id: "kunden",
      title: "Potenzielle Kunden",
      description:
        "Beiträge, die darauf abzielen, potenzielle Kunden anzusprechen und sie von den Vorteilen Ihres Produkts oder Ihrer Dienstleistung zu überzeugen.",
    },
    {
      id: "fachkräfte",
      title: "Arbeitssuchende und Fachkräfte",
      description:
        "Inhalte, die darauf abzielen, Arbeitssuchende anzusprechen und sie über Karrieremöglichkeiten in Ihrem Unternehmen zu informieren oder ihnen Tipps und Ratschläge für ihre berufliche Entwicklung zu geben.",
    },
    {
      id: "absolventen",
      title: "Studierende und Absolventen",
      description:
        "Sie möchten LinkedIn nutzen, um qualifizierte Kandidaten anzuziehen und Ihr Unternehmen als attraktiven Arbeitgeber zu präsentieren.",
    },
  ];
  const handleCheckboxChange = (option) => {
    onSelectOption(option, "step2");
  };

  return (
    <OptionContainer>
      <Heading as="h2">
        Wer ist die Zielgruppe für die LinkedIn-Beiträge?
      </Heading>
      {options.map((option) => (
        <div key={option.id}>
          <CheckboxLabel
            style={{
              backgroundColor: selectedOptions.some((o) => o.id === option.id)
                ? "rgba(0, 119, 181, 0.5)"
                : "transparent",
            }}
          >
            <Checkbox
              type="checkbox"
              checked={selectedOptions.some((o) => o.id === option.id)}
              onChange={() => handleCheckboxChange(option)}
            />
            {option.title}
            <Description>{option.description}</Description>
          </CheckboxLabel>
        </div>
      ))}
    </OptionContainer>
  );
};

export default Step2;

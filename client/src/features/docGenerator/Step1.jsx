import Heading from "../../ui/Heading";
import {
  OptionContainer,
  CheckboxLabel,
  Description,
  Checkbox,
} from "../../ui/StepContent";
const Step1 = ({ selectedOptions, onSelectOption }) => {
  const options = [
    {
      id: "leadgenerierung",
      title: "Lead-Generierung",
      description:
        "Das Hauptziel besteht darin, potenzielle Kunden oder Interessenten anzuziehen und zu ermutigen, sich für weitere Informationen zu Ihrem Produkt oder Ihrer Dienstleistung zu registrieren oder Kontakt aufzunehmen",
    },
    {
      id: "branding",
      title: "Branding",
      description:
        "Die Beiträge sollen dazu beitragen, das Markenbewusstsein zu steigern und das Image und die Werte Ihres Unternehmens zu fördern.",
    },
    {
      id: "contentverbreitung",
      title: "Content-Verbreitung",
      description:
        "Sie möchten wertvolle Inhalte wie Blogbeiträge, Fallstudien oder Branchenberichte über LinkedIn teilen, um Ihre Expertise in Ihrem Bereich zu demonstrieren und Ihre Reichweite zu erhöhen.",
    },
    {
      id: "engagement",
      title: "Engagement",
      description:
        "Das Ziel besteht darin, eine aktive Community aufzubauen und das Publikum durch Fragen, Umfragen oder Diskussionen einzubeziehen.",
    },
    {
      id: "recruiting",
      title: "Recruiting",
      description:
        "Sie möchten LinkedIn nutzen, um qualifizierte Kandidaten anzuziehen und Ihr Unternehmen als attraktiven Arbeitgeber zu präsentieren.",
    },
  ];

  const handleCheckboxChange = (option) => {
    onSelectOption(option, "step1");
  };

  return (
    <OptionContainer>
      <Heading as="h2">Was ist das Hauptziel der LinkedIn-Beiträge?</Heading>
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

export default Step1;

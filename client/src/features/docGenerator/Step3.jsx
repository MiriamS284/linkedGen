import Heading from "../../ui/Heading";
import {
  OptionContainer,
  CheckboxLabel,
  Description,
  Checkbox,
} from "../../ui/StepContent";

const Step3 = ({ onSelectOption, selectedOptions }) => {
  const options = [
    {
      id: "professionell",
      title: "Professionell und sachlich",
      description:
        "Verwenden Sie eine formelle Sprache und einen professionellen Ton, um Glaubwürdigkeit und Seriosität zu vermitteln.",
    },
    {
      id: "inspririerend",
      title: "Inspirierend und motivierend",
      description:
        "Nutzen Sie eine motivierende Sprache und einen inspirierenden Ton, um Ihr Publikum zu ermutigen und zu inspirieren, ihre Ziele zu verfolgen oder Herausforderungen zu meistern.",
    },
    {
      id: "freundlich",
      title: "Freundlich und zugänglich",
      description:
        "Verwenden Sie eine freundliche Sprache und einen zugänglichen Ton, um eine persönliche Verbindung zu Ihrem Publikum aufzubauen und sie zum Mitmachen zu ermutigen.",
    },
    {
      id: "informativ",
      title: "Fachlich und informativ",
      description:
        "Nutzen Sie eine fachliche Sprache und einen informativen Ton, um Ihr Fachwissen zu demonstrieren und wertvolle Einblicke oder Ratschläge zu geben.",
    },
    {
      id: "unterhaltsam",
      title: "Humorvoll und unterhaltsam",
      description:
        "Verwenden Sie einen humorvollen Ton und eine unterhaltsame Sprache, um Ihr Publikum zu amüsieren und eine positive Stimmung zu schaffen, während Sie dennoch relevante Informationen vermitteln.",
    },
  ];

  const handleCheckboxChange = (option) => {
    onSelectOption(option, "step3");
  };

  return (
    <OptionContainer>
      <Heading as="h2">
        Welche Art von Ton und Sprache möchten Sie in den Beiträgen verwenden?
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

export default Step3;

import Heading from "../../ui/Heading";
import {
  OptionContainer,
  CheckboxLabel,
  Description,
  Checkbox,
} from "../../ui/StepContent";

const Step4 = ({ onSelectOption, selectedOptions }) => {
  const options = [
    {
      id: "multimedien",
      title: "Multimediale Inhalte",
      description:
        "Nutzen Sie eine Vielzahl von Medien wie Bilder, Videos, Infografiken oder Präsentationen, um Ihre Botschaft zu vermitteln und die Aufmerksamkeit Ihrer Zielgruppe zu gewinnen.",
    },
    {
      id: "statistiken",
      title: "Statistiken und Daten",
      description:
        "Integrieren Sie relevante Statistiken, Studien oder Datenvisualisierungen, um Ihre Aussagen zu untermauern und Ihr Publikum mit fundierten Informationen zu überzeugen.",
    },
    {
      id: "fallstudien",
      title: "Kundenreferenzen und Fallstudien",
      description:
        "Teilen Sie Erfolgsgeschichten, Kundenreferenzen oder Fallstudien, um die Wirksamkeit Ihrer Produkte oder Dienstleistungen zu demonstrieren und das Vertrauen potenzieller Kunden zu stärken.",
    },
    {
      id: "branchennews",
      title: "Teilen von Branchennews",
      description:
        "Veröffentlichen Sie regelmäßig Updates zu branchenspezifischen Entwicklungen, Trends oder Neuigkeiten, um Ihr Fachwissen zu zeigen und Ihre Zielgruppe über relevante Themen auf dem Laufenden zu halten.",
    },
    {
      id: "umfragen",
      title: "Fragerunden oder Umfragen",
      description:
        "Stellen Sie Fragen an Ihr Publikum, um Feedback zu erhalten, Diskussionen anzuregen oder Einblicke in deren Bedürfnisse und Interessen zu gewinnen. Sie können auch Umfragen durchführen, um Meinungen einzuholen oder Trends zu erfassen.",
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

export default Step4;

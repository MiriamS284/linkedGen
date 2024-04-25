import Heading from "../../ui/Heading";
import { OptionContainer } from "../../ui/StepContent";
import { Card, Grid, TextExampleDescription } from "../../ui/CardContainer";

const Step6 = ({ formData }) => {
  const labels = {
    purpose: "Hauptziel",
    targetgroup: "Zielgruppe",
    language: "Sprache",
    specifications: "Formatvorgaben",
    examples: "Textbeispiele",
  };

  return (
    <OptionContainer>
      <Heading as="h2">Zusammenfassung Ihres LinkedGen Styleguides</Heading>
      {Object.entries(formData).map(([stepKey, data]) => (
        <div key={stepKey}>
          <Heading as="h3">{labels[stepKey]}</Heading>
          {stepKey !== "examples" ? (
            <ul>
              {data.options.map((option, index) => (
                <li key={`${stepKey}-${option.id}-${index}`}>
                  {option.title}: {option.description}
                </li>
              ))}
            </ul>
          ) : (
            <Grid>
              {Array.isArray(data) ? (
                data.map((text, index) => (
                  <Card key={`${stepKey}-${index}`}>
                    <TextExampleDescription>{text}</TextExampleDescription>
                  </Card>
                ))
              ) : (
                <p>Keine Textbeispiele angegeben.</p>
              )}
            </Grid>
          )}
        </div>
      ))}
    </OptionContainer>
  );
};

export default Step6;

/*
   {formData.step5 && formData.step5.length > 0 && (
        <>
          <Heading as="h3">{labels.step5}</Heading>
          <Grid>
            {formData.step5.map((text, index) => (
              <Card key={index}>
                <TextExampleDescription>{text}</TextExampleDescription>
              </Card>
            ))}
          </Grid>
        </>
      )}

*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  StepsContainer,
  StepIndicator,
  StepContent,
} from "../../ui/FormContainer";
import { ButtonContainer } from "../../ui/ButtonContainer";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { submitFormData } from "../../services/apiStyleGuide";
import toast from "react-hot-toast";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    purpose: { options: [] },
    targetgroup: { options: [] },
    language: { options: [] },
    specifications: { options: [] },
    examples: [],
  });

  const prepareSubmissionData = () => {
    return {
      purpose: formData.purpose.options.map((opt) => ({
        title: opt.title,
        description: opt.description,
      })),
      targetgroup: formData.targetgroup.options.map((opt) => ({
        title: opt.title,
        description: opt.description,
      })),
      language: formData.language.options.map((opt) => ({
        title: opt.title,
        description: opt.description,
      })),
      specifications: formData.specifications.options.map((opt) => ({
        title: opt.title,
        description: opt.description,
      })),
      examples: formData.examples,
    };
  };

  const handleSelectOption = (selectedOption, step) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [step]: {
        ...prevFormData[step],
        options: prevFormData[step].options.find(
          (opt) => opt.id === selectedOption.id
        )
          ? prevFormData[step].options.filter(
              (opt) => opt.id !== selectedOption.id
            )
          : [...prevFormData[step].options, selectedOption],
      },
    }));
  };

  const handleUpdateStep5 = (textInputs) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      examples: textInputs,
    }));
  };

  const handleNext = () => {
    setCurrentStep(currentStep < 6 ? currentStep + 1 : currentStep);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep);
  };

  const handleSubmit = async () => {
    const submissionData = prepareSubmissionData();
    console.log("Submission Data on Submit:", submissionData);
    setIsLoading(true);
    try {
      const result = await submitFormData(submissionData);
      console.log("Response from server:", result);
      toast.success("Styleguidegenerierung erfolgreich abgeschlossen!");
      navigate("/linkedgen", {
        state: { styleGuideId: result.styleGuideId, submissionData },
      });
    } catch (error) {
      toast.error("Fehler beim Senden des Formulars.");
      console.error("Failed to submit form data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            selectedOptions={formData.purpose.options}
            onSelectOption={(option) => handleSelectOption(option, "purpose")}
          />
        );
      case 2:
        return (
          <Step2
            selectedOptions={formData.targetgroup.options}
            onSelectOption={(option) =>
              handleSelectOption(option, "targetgroup")
            }
          />
        );
      case 3:
        return (
          <Step3
            selectedOptions={formData.language.options}
            onSelectOption={(option) => handleSelectOption(option, "language")}
          />
        );
      case 4:
        return (
          <Step4
            selectedOptions={formData.specifications.options}
            onSelectOption={(option) =>
              handleSelectOption(option, "specifications")
            }
          />
        );
      case 5:
        return <Step5 onUpdate={handleUpdateStep5} />;
      case 6:
        return <Step6 formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <FormContainer>
      {!isLoading && (
        <StepsContainer>
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <StepIndicator
              key={step}
              $isActive={currentStep === step}
              onClick={() => setCurrentStep(step)}
            >
              {step}
            </StepIndicator>
          ))}
        </StepsContainer>
      )}
      <StepContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {renderStep()}
            <ButtonContainer>
              {currentStep > 1 && <Button onClick={handlePrev}>Zurück</Button>}
              {currentStep < 6 ? (
                <Button onClick={handleNext}>Weiter</Button>
              ) : (
                <Button onClick={handleSubmit}>Absenden</Button>
              )}
            </ButtonContainer>
          </>
        )}
      </StepContent>
    </FormContainer>
  );
};

export default MultiStepForm;

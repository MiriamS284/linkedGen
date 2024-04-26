import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../features/docGenerator/MultiStepForm";
import { useAuth } from "../context/AuthContext";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Section from "../ui/Section";
import Button from "../ui/Button";
import { BackButton, StyledArrow } from "../ui/ButtonContainer";
import { useIsMobile } from "../hooks/useIsMobile";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (
      currentUser &&
      currentUser.company &&
      currentUser.corporateGoals &&
      currentUser.companyProfile
    ) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [currentUser]);

  const handleStartClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleUpdateProfileClick = () => {
    navigate("/users");
  };
  const content = (
    <>
      {isMobile ? (
        <p>
          Bitte aktualisieren Sie die Informationen für Ihr LinkedGen Profil.
        </p>
      ) : (
        <>
          <p>
            Bitte fügen Sie in Ihrem Profil einen benutzerdefinierten Namen
            sowie ein neues Passwort hinzu.
          </p>
          <p>
            Weitere Informationen können in Ihrem Profil hinzugefügt werden, die
            Sie als relevant für LinkedGen empfinden.
          </p>
          <p>In Settings verwalten Sie Ihre Daten.</p>
        </>
      )}
      <h3>
        Unternehmen:{" "}
        <span>{currentUser.companyProfile || "Bitte angeben"}</span>
      </h3>
      <h3>
        Branche: <span>{currentUser.company || "Bitte angeben"}</span>
      </h3>
      <h3>
        Interessen: <span>{currentUser.corporateGoals || "Bitte angeben"}</span>
      </h3>
    </>
  );

  return (
    <div>
      {showForm && (
        <BackButton onClick={handleCloseForm}>
          <StyledArrow />
        </BackButton>
      )}
      {!showForm && (
        <>
          <Heading h1>Willkommen bei LinkedGen</Heading>
          <Section>{content}</Section>
          <Row horizontal>
            <Button
              size="medium"
              variation="secondary"
              onClick={handleUpdateProfileClick}
            >
              Profil aktualisieren
            </Button>
            <Button
              size="medium"
              variation="primary"
              onClick={handleStartClick}
            >
              Start LinkedGen
            </Button>
          </Row>
        </>
      )}
      {showForm && (
        <MultiStepForm
          onSubmit={(formData) => console.log("Form data submitted:", formData)}
        />
      )}
    </div>
  );
}

export default Dashboard;

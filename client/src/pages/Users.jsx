import ProfileForm from "../features/authentication/ProfileForm";
import Heading from "../ui/Heading";
import { useIsMobile } from "../hooks/useIsMobile";

function NewUsers() {
  const isMobile = useIsMobile();

  const content = isMobile ? (
    <Heading as="h1"> LinkedGen - Profil</Heading>
  ) : (
    <Heading as="h1">Aktualisieren Sie Ihren LinkedGen - Account</Heading>
  );

  return (
    <>
      {content}
      <ProfileForm />
    </>
  );
}

export default NewUsers;

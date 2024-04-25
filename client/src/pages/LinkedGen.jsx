import { useLocation } from "react-router-dom";
import LinkedGenPostForm from "../features/postings/LinkedGenPostForm";
import Heading from "../ui/Heading";

function LinkedGen() {
  const location = useLocation();
  const styleGuideId = location.state?.styleGuideId;

  return (
    <div>
      <Heading>Bestimmen Sie Ihr Thema für die LinkedGen Posts.</Heading>
      <LinkedGenPostForm styleGuideId={styleGuideId} />
    </div>
  );
}

export default LinkedGen;

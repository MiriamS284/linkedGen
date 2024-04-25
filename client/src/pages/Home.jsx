import { Link } from "react-router-dom";
import Heading from "../ui/Heading";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

export default function Home() {
  return (
    <div>
      <Heading>Welcome to LinkedGen!</Heading>
      <p>
        Loggen Sie sich mit Ihren zugewiesenen Benutzerdaten ein.
        <Link to="/login">
          <HiArrowLeftOnRectangle size="3rem" />
        </Link>{" "}
      </p>
    </div>
  );
}

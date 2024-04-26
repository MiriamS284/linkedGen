import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { HiMiniArrowLeftOnRectangle } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LogoutIcon = styled(HiArrowRightOnRectangle)`
  cursor: pointer;
  &:hover {
    color: var(--color-primary);
  }
`;
const Username = styled.span`
  font-weight: bold;
  margin-left: 20px;
`;

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <StyledHeader>
      <Username>
        {currentUser
          ? `Angemeldet als: ${currentUser.username}`
          : "Not logged in"}
      </Username>
      {currentUser ? (
        <LogoutIcon onClick={handleLogout} size="24" />
      ) : (
        <HiMiniArrowLeftOnRectangle
          onClick={() => navigate("/login")}
          size="24"
        />
      )}
    </StyledHeader>
  );
}

export default Header;

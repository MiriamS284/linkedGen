import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey 100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    gap: 0;
    justify-content: center;
    padding: 1.2rem;
    margin-bottom: 5rem;
    width: 150px;
    font-weight: 600;
    align-items: center;

    & span {
      display: none;
    }

    & svg {
      color: #0077b5;
    }
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo src="/img/Logo.png" alt="Logo_LinkedGen_Side" />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;

import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useSidebarVisibility } from "../context/VisibilityContext";
import SidebarToggle from "./SidebarToggle";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey 100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  justify-content: flex-start;
  opacity: 1;

  @media (max-width: 768px) {
    width: 150px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
    font-weight: 600;
    padding: 1.2rem;
    align-items: center;
    transition: transform 0.3s ease-in-out;
    opacity: 0.8;

    &:hover {
      transform: translateX(0);
    }

    & span {
      display: none;
    }

    & svg {
      color: #0077b5;
      width: 3rem;
      height: 3rem;
      margin-top: 3rem;
    }
  }
`;

function Sidebar() {
  const { isSidebarVisible } = useSidebarVisibility();

  return (
    <>
      <SidebarToggle />

      <StyledSidebar
        style={{
          transform:
            isSidebarVisible || window.innerWidth > 768
              ? "translateX(0)"
              : "translateX(-100%)",
        }}
      >
        <Logo src="/img/Logo.png" alt="Logo_LinkedGen_Side" />
        <MainNav />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;

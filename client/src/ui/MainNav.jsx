import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import { useSidebarVisibility } from "../context/VisibilityContext";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #0077b5;
  }
`;

function MainNav() {
  const { currentUser } = useAuth();
  const { toggleSidebar } = useSidebarVisibility();
  if (!currentUser) {
    return null;
  }

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" onClick={handleNavLinkClick}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/users" onClick={handleNavLinkClick}>
            <HiOutlineUsers />
            <span>Profil</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/postings" onClick={handleNavLinkClick}>
            <HiOutlineDocumentText />
            <span>Posts</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings" onClick={handleNavLinkClick}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;

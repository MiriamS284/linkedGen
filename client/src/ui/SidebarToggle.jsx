import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import styled from "styled-components";
import { useSidebarVisibility } from "../context/VisibilityContext";

const ToggleButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: #fff;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default function SidebarToggle() {
  const { isSidebarVisible, toggleSidebar } = useSidebarVisibility();

  return (
    <ToggleButton onClick={toggleSidebar}>
      {isSidebarVisible ? <HiChevronLeft /> : <HiChevronRight />}
    </ToggleButton>
  );
}

import { createContext, useState, useContext, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const SidebarVisibilityContext = createContext();

export const useSidebarVisibility = () => useContext(SidebarVisibilityContext);

export const SidebarVisibilityProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true); // Default to visible for all devices
  const isMobile = useIsMobile();

  useEffect(() => {
    // This will automatically hide the sidebar only on mobile when the component mounts
    // and when the isMobile status changes.
    setSidebarVisible(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    // This allows toggling on any device
    setSidebarVisible((prev) => !prev);
  };

  return (
    <SidebarVisibilityContext.Provider
      value={{ isSidebarVisible, setSidebarVisible, toggleSidebar }}
    >
      {children}
    </SidebarVisibilityContext.Provider>
  );
};

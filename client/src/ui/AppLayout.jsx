import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; // Rows for header, main content, and footer
  grid-template-columns: 200px 1fr; // Default columns for sidebar and main content

  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";

  height: 100vh;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Full width for smaller screens
    grid-template-areas:
      "header"
      "main"
      "footer";
  }

  .header {
    grid-area: header;
  }

  .sidebar {
    grid-area: sidebar;
    opacity: 1; // Full opacity by default

    @media (max-width: 768px) {
      opacity: 0.5; // Reduced opacity on smaller screens
      position: fixed;
      width: 200px;
      height: 100%;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  .main {
    grid-area: main;
  }

  .footer {
    grid-area: footer;
  }
`;

const LoginLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2 rem;
`;

function AppLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  if (isLogin) {
    return (
      <LoginLayout>
        <Container>
          <Outlet />
        </Container>
      </LoginLayout>
    );
  }

  return (
    <StyledAppLayout>
      <Header className="header" />
      <Sidebar className="sidebar" />

      <Main className="main">
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer className="footer" />
    </StyledAppLayout>
  );
}

export default AppLayout;

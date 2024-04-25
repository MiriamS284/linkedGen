import styled from "styled-components";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "../context/AuthContext";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

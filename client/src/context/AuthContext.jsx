import { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  logout as apiLogout,
  refreshAuthToken,
} from "../services/apiAuth";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        if (error.message.includes("token")) {
          try {
            await refreshAuthToken();
          } catch (refreshError) {
            toast.error("Session expired. Please login again.");
            apiLogout();
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const logout = async () => {
    await apiLogout();
    setCurrentUser(null);
    toast.success("Successfully logged out.");
  };

  const value = {
    currentUser,
    loading,
    setCurrentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

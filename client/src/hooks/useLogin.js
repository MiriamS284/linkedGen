import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as apiLogin, getCurrentUser } from "../services/apiAuth";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const data = await apiLogin(username, password);
      localStorage.setItem("token", data.token);
      const user = await getCurrentUser();
      setCurrentUser(user);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

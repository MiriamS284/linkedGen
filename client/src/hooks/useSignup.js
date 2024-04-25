import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { signup as apiSignup } from "../services/apiAuth";

export function useSignup() {
  const { setAuthToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiSignup(
        formData.company,
        formData.username,
        formData.email,
        formData.password
      );
      setAuthToken(data.token);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
}

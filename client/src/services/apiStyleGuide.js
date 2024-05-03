import api from "./axiosClient";
import { toast } from "react-hot-toast";

export const submitFormData = async (formData) => {
  try {
    const response = await api.post(`/styleguide/generate`, formData);
    toast.success("Formulardaten erfolgreich eingereicht!");
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    throw error;
  }
};

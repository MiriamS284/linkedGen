import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const submitFormData = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/styleguide/generate`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    throw error;
  }
};

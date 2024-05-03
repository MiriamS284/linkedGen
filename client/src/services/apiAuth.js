import api from "./axiosClient";
import { toast } from "react-hot-toast";

// Funktion zum Einloggen eines Benutzers
export async function login(username, password) {
  try {
    const response = await api.post(`/auth/login`, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      toast.success("Login erfolgreich!");
    } else {
      toast.error("Kein Token erhalten, Login fehlgeschlagen.");
    }
    return response.data;
  } catch (error) {
    toast.error(
      "Login fehlgeschlagen: " +
        (error.response?.data?.message || error.message)
    );
    throw error;
  }
}

// Funktion zum Abrufen der aktuellen Benutzerdaten
export async function getCurrentUser() {
  const response = await api.get(`/user/profile`);
  if (response.data && response.data.user) {
    return response.data.user;
  } else {
    throw new Error("User data not found in response");
  }
}

// Funktion zum Registrieren eines neuen Benutzers
export async function signup(company, username, email, password) {
  try {
    const response = await api.post(`/auth/signup`, {
      company,
      username,
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      toast.success("Registrierung erfolgreich!");
    } else {
      toast.error("Registrierung fehlgeschlagen.");
    }
    return response.data;
  } catch (error) {
    toast.error(
      "Registrierung fehlgeschlagen: " +
        (error.response?.data?.message || error.message)
    );
    throw error;
  }
}

// Funktion zum Aktualisieren des Benutzerprofils
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put(`/user/profile`, profileData);
    toast.success("Profil erfolgreich aktualisiert!");
    return response.data.user;
  } catch (error) {
    toast.error(
      "Profilupdate fehlgeschlagen: " +
        (error.response?.data?.message || error.message)
    );
    throw error;
  }
};

// Funktion zum Ändern des Passworts
export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put("/user/changePassword", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Error updating password: " + error.response?.data?.message ||
        error.message
    );
  }
};

// Funktion zum Auffrischen des Authentifizierungstokens
export async function refreshAuthToken() {
  try {
    const response = await api.post("/auth/refresh-token");
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    } else {
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    throw new Error("Unable to refresh token: " + error.message);
  }
}

// Funktion zum Ausloggen eines Benutzers
export async function logout() {
  localStorage.removeItem("token");
  toast.success("Logout erfolgreich!");
}

/*

//old version

import axios from "axios";

const API_URL = "http://localhost:5000/api";

export async function login(username, password) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Response data:", response.data);

  if (response.data && response.data.user) {
    console.log("User data found:", response.data.user);
    return response.data.user;
  } else {
    console.error("User data not found in response");
    throw new Error("User data not found in response");
  }
}

export async function signup(company, username, email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      company,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.put(`${API_URL}/user/profile`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.user;
};

export async function logout() {
  localStorage.removeItem("token");
}


*/

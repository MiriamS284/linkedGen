import axios from "axios";

const API_URL = "${process.env.REACT_APP_API_BASE_URL}/api";

axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export async function login(username, password) {
  const response = await axios.post(`/auth/login`, {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  }
  return response.data;
}

export async function getCurrentUser() {
  const response = await axios.get(`/user/profile`);
  if (response.data && response.data.user) {
    return response.data.user;
  } else {
    throw new Error("User data not found in response");
  }
}

export async function signup(company, username, email, password) {
  const response = await axios.post(`/auth/signup`, {
    company,
    username,
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  }
  return response.data;
}

export const updateProfile = async (profileData) => {
  const response = await axios.put(`/user/profile`, profileData);
  return response.data.user;
};

export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.put("/user/changePassword", {
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

export async function refreshAuthToken() {
  try {
    const response = await axios.post("/auth/refresh-token");
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      return response.data.token;
    } else {
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    throw new Error("Unable to refresh token: " + error.message);
  }
}

export async function logout() {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
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

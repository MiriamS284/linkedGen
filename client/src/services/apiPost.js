import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "${process.env.REACT_APP_API_BASE_URL}/api";

export const generateLinkedInPosts = async (topic, styleGuideId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/styleguide/generate-posts`,
      {
        topic,
        styleGuideId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Unbekannter Fehler beim Generieren der Posts.";
    console.error("Error generating LinkedIn posts:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const savePost = async (post) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Authentication token not found. Please log in again.");
    return;
  }
  try {
    const response = await axios.post(
      `${API_URL}/posts/save`,
      { topic: post.topic, title: post.title, content: post.content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 201) {
      toast.success("Post erfolgreich gespeichert!");
    } else {
      throw new Error("Failed to save post");
    }
  } catch (error) {
    console.error(
      "Error saving post:",
      error.response?.data?.message || error.message
    );
    toast.error(
      "Fehler beim Speichern des Posts: " +
        (error.response?.data?.message || error.message)
    );
  }
};

export const fetchUserPosts = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/posts/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const editPost = async (postId, postData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Authentication token not found");
    return;
  }
  console.log("Attempting to update post:", postId, postData);
  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Failed to update post: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error(
      `Error updating post: ${error.response?.data?.message || error.message}`
    );
  }
};

export const deletePost = async (postId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

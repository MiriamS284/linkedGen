import api from "./axiosClient";
import { toast } from "react-hot-toast";

export const generateLinkedInPosts = async (topic, styleGuideId) => {
  try {
    const response = await api.post(`/styleguide/generate-posts`, {
      topic,
      styleGuideId,
    });
    toast.success("Posts erfolgreich generiert!");
    return response.data;
  } catch (error) {
    handleError(error, "Unbekannter Fehler beim Generieren der Posts.");
  }
};

export const savePost = async (post) => {
  try {
    const response = await api.post(`/posts/save`, {
      topic: post.topic,
      title: post.title,
      content: post.content,
    });
    toast.success("Post erfolgreich gespeichert!");
    return response.data;
  } catch (error) {
    handleError(error, "Fehler beim Speichern des Posts.");
  }
};

export const fetchUserPosts = async () => {
  try {
    const response = await api.get(`/posts/user`);
    return response.data.posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const editPost = async (postId, postData) => {
  try {
    const response = await api.put(`/posts/${postId}`, postData);
    toast.success("Post erfolgreich aktualisiert!");
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error(
      `Error updating post: ${error.response?.data?.message || error.message}`
    );
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    toast.success("Post erfolgreich gelöscht!");
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error(
      "Fehler beim Löschen des Posts: " +
        (error.response?.data?.message || "Unbekannter Fehler")
    );
    throw error;
  }
};

function handleError(error, defaultMessage) {
  console.error(error);
  const message = error.response?.data?.message || defaultMessage;
  toast.error(message);
  throw new Error(message);
}

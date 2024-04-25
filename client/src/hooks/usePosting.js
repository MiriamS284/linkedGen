import { useState, useEffect } from "react";
import { fetchUserPosts, deletePost } from "../services/apiPost";
import { toast } from "react-hot-toast";

function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await fetchUserPosts();
        setPosts(fetchedPosts);
        setIsLoading(false);
      } catch (error) {
        setError("Fehler beim Laden der Posts.");
        console.error(error);
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((currentPosts) => currentPosts.filter((p) => p._id !== postId));
      toast.success("Post erfolgreich gelöscht.");
    } catch (error) {
      toast.error("Fehler beim Löschen des Posts.");
      console.error(error);
    }
  };

  return {
    posts,
    setPosts,
    isLoading,
    error,
    handleDelete,
  };
}

export default usePosts;

import { useState } from "react";
import { generateLinkedInPosts } from "../../services/apiPost";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import PostCards from "./PostCards";
import { toast } from "react-hot-toast";

const Label = styled.label`
  flex: 0 0 100px;
  margin-right: 10px;
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
  margin-right: 10px;
`;

function LinkedGenPostForm({ styleGuideId }) {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsGenerated, setPostsGenerated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading || postsGenerated) return;
    setIsLoading(true);
    try {
      const result = await generateLinkedInPosts(topic, styleGuideId);
      if (result.error) {
        throw new Error(result.error);
      }
      const postsArray = Object.values(result);

      if (postsArray.length > 0) {
        setPosts(postsArray);
        setPostsGenerated(true);
        toast.success("Posts erfolgreich generiert!");
      } else {
        throw new Error("Keine Posts generiert.");
      }
    } catch (error) {
      console.error("Fehler beim Generieren der Posts:", error);
      setError(error.message);
      toast.error(
        error.message || "Unbekannter Fehler beim Generieren der Posts."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setPostsGenerated(false);
    setPosts([]);
    setTopic("");
    setError("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label>Thema:</Label>
        <StyledInput
          type="text"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          placeholder="Thema für LinkedIn Postings"
          disabled={isLoading || postsGenerated}
        />
      </FormRow>

      <FormRow>
        {!postsGenerated && (
          <Button type="submit" disabled={isLoading || postsGenerated}>
            Generiere Postings
          </Button>
        )}
        {isLoading && <Spinner />}
      </FormRow>
      {posts.length > 0 && <PostCards posts={posts} topic={topic} />}
      {postsGenerated && <Button onClick={handleBack}>Neues Thema</Button>}
    </Form>
  );
}

export default LinkedGenPostForm;

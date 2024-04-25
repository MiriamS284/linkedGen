import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { savePost } from "../../services/apiPost";
import { toast } from "react-hot-toast";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
`;

const Card = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Content = styled.p`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostCards = ({ posts, topic }) => {
  const handleSavePost = async (post) => {
    await savePost(post);
  };

  const handleCopyPost = (content, event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(content).then(
      () => {
        toast.success("Post erfolgreich in Zwischenablage kopiert.");
      },
      () => {
        toast.error("Fehler beim Kopieren des Posts.");
      }
    );
  };

  return (
    <>
      <Heading>Ihre LinkedGen Posts zum Thema: {topic}</Heading>
      <Grid>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id}>
              <Title>{post.title}</Title>
              <Content>{post.content}</Content>
              <ButtonContainer>
                <Button size="small" onClick={() => handleSavePost(post)}>
                  Speichern
                </Button>
                <Button
                  size="small"
                  variation="secondary"
                  onClick={() => handleCopyPost(post.content, event)}
                >
                  Kopieren
                </Button>
              </ButtonContainer>
            </Card>
          ))
        ) : (
          <div>Keine Posts verfügbar.</div>
        )}
      </Grid>
    </>
  );
};

export default PostCards;

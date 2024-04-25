import { useState } from "react";
import usePosts from "../hooks/usePosting";
import EditPostModal from "../features/postings/EditPostModal";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import {
  HiOutlineTrash,
  HiOutlineDocumentDuplicate,
  HiOutlinePencil,
} from "react-icons/hi";
import {
  PostListCard,
  Grid,
  Description,
  TopicHeader,
  TopicTitle,
  DateText,
} from "../ui/CardContainer";
import Heading from "../ui/Heading";
import Section from "../ui/Section";
import { ButtonGroup } from "../ui/ButtonGroup";
import { toast } from "react-hot-toast";

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;
}

function Posts() {
  const { posts, setPosts, isLoading, error, handleDelete } = usePosts();
  const [editingPost, setEditingPost] = useState(null);

  const openEditModal = (post) => {
    setEditingPost(post);
  };
  const closeEditModal = () => {
    setEditingPost(null);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const postsByTopic = posts.reduce((acc, post) => {
    if (!acc[post.topic]) {
      acc[post.topic] = [];
    }
    acc[post.topic].push(post);
    return acc;
  }, {});

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
  const handleUpdate = async (updatedPost) => {
    try {
      const newPosts = posts.map((post) =>
        post._id === updatedPost._id
          ? {
              ...post,
              ...updatedPost,
            }
          : post
      );

      setPosts(newPosts);
      toast.success("Post erfolgreich aktualisiert!");
      closeEditModal();
    } catch (error) {
      toast.error("Fehler beim Aktualisieren des Posts.");
      console.error("Update Error:", error);
    }
  };

  return (
    <Section>
      <Heading>Meine gesammelten Posts:</Heading>
      {Object.entries(postsByTopic).map(([topic, posts]) => (
        <div key={topic}>
          <TopicHeader>
            <TopicTitle>{topic}</TopicTitle>
            <DateText>{formatDate(posts[0].dateSaved)}</DateText>
          </TopicHeader>
          <Grid>
            {posts.map((post) => (
              <PostListCard key={post._id}>
                <h3>{post.title}</h3>
                <Description>{post.content}</Description>
                <ButtonGroup>
                  <Button
                    size="small"
                    variation="primary"
                    onClick={() => handleCopyPost(post.content, event)}
                  >
                    <HiOutlineDocumentDuplicate />
                  </Button>
                  <Button
                    size="small"
                    variation="secondary"
                    onClick={() => openEditModal(post)}
                  >
                    <HiOutlinePencil />
                  </Button>
                  <Button
                    size="small"
                    variation="danger"
                    onClick={() => handleDelete(post._id)}
                  >
                    <HiOutlineTrash />
                  </Button>
                </ButtonGroup>
              </PostListCard>
            ))}
          </Grid>
        </div>
      ))}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={closeEditModal}
          onUpdate={handleUpdate}
        />
      )}
    </Section>
  );
}

export default Posts;

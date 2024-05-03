import { useState } from "react";
import Modal from "../../ui/Modal";
import { editPost } from "../../services/apiPost";
import { HiOutlineCheck } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  @media (min-width: 768px) {
    padding: 15px;
  }
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 350px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditPostModal = ({ post, onClose, onUpdate }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post._id || !title || !content) {
      toast.error("Postdaten sind unvollständig.");
      return;
    }
    try {
      const updatedData = { title, content };
      const updatedPost = await editPost(post._id, updatedData);
      onUpdate(updatedPost);
      onClose();
    } catch (error) {
      toast.error(`Fehler beim Aktualisieren des Posts: ${error.message}`);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <label>Titel:</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Inhalt:</label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <Button type="submit">
          <HiOutlineCheck />
        </Button>
      </Form>
    </Modal>
  );
};

export default EditPostModal;

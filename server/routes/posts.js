import express from "express";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", authenticateToken, async (req, res) => {
  const { topic, title, content } = req.body;
  const userId = req.user.userId;

  if (!topic || !title || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!userId) {
    return res.status(400).json({ message: "User ID is missing or invalid" });
  }

  try {
    const newPost = new Post({ topic, title, content, createdBy: userId });
    await newPost.save();
    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

    res
      .status(201)
      .json({ message: "Post created successfully!", postId: newPost._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.toString() });
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.userId });
    res.json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.toString() });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({
      message: "Failed to update the post",
      error: error.toString(),
    });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { posts: req.params.id },
    });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.toString() });
  }
});

export default router;

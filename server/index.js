import express from "express";
import cors from "cors";

import { config } from "dotenv";
config();
import authRouter from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import styleguideRoutes from "./routes/styleguide.js";
import postsRoutes from "./routes/posts.js";
import connectDB from "./config/dbConnect.js";

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://linked-21z6lp13a-miriams284s-projects.vercel.app",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const user = req.user
    ? {
        id: req.user.userId,
        username: req.user.username,
      }
    : "Guest";

  console.log("Request Details:", {
    path: req.path,
    method: req.method,
    body: req.body,
    user: user,
    headers: req.headers.authorization,
  });
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/styleguide", styleguideRoutes);
app.use("/api/posts", postsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

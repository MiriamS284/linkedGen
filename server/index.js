import express from "express";
import cors from "cors";
import helmet from "helmet";

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
  origin: ["http://localhost:5173", "https://linked-gen-iota.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply security and data processing middleware

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// HTTPS Redirect Middleware
app.use((req, res, next) => {
  if (
    req.headers["x-forwarded-proto"] !== "https" &&
    process.env.NODE_ENV === "production"
  ) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Define routes

app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/styleguide", styleguideRoutes);
app.use("/api/posts", postsRoutes);

// Error handling middleware should be last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

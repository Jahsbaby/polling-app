// app.js
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import pollsRoutes from "./src/routes/pollsRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// Body parsing with size limits to avoid DoS
app.use(express.json({ limit: "10kb" })); // small limit
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Cookies (if you later use tokens)
app.use(cookieParser());

// Rate limiter (tweak window and max as needed)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Mount routes
app.use("/polls", pollsRoutes);

// Generic error handler (avoid leaking stack traces in production)
app.use((err, req, res, next) => {
  console.error(err);
  if (process.env.NODE_ENV === "production") {
    return res.status(500).json({ error: "Internal server error" });
  }
  res.status(500).json({ error: err.message, stack: err.stack });
});

export default app;

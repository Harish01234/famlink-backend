// app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import familyRoutes from "./routes/family.routes.js";
import locationRoutes from "./routes/location.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.send("✅ FamTracker backend is running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/location", locationRoutes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;

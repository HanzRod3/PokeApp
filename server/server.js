import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Explicitly specify the origin you want to allow
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(express.json());
app.use(cors(corsOptions)); // Use the configured CORS options

const PORT = process.env.PORT || 8004;

dbConnect();

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

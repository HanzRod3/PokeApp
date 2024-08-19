import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import userRouter from "./routes/user.routes.js";
import pokeContainerRouter from "./routes/pokeContainer.routes.js"; // Import the PokeContainer Router
import activeRosterRouter from "./routes/activeRoster.routes.js"; // Import the ActiveRoster Router
import { pokemonRouter } from "./routes/pokemonRouter.routes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8004;

dbConnect();

app.use("/user", userRouter);
app.use("/pokecontainer", pokeContainerRouter); // Use the PokeContainer router
app.use("/activeroster", activeRosterRouter); // Use the ActiveRoster router
app.use("/pokemon", pokemonRouter); // Use the Pokemon router

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

import { Schema, model } from "mongoose";

const pokeContainerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pokemons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pokemon",
      },
    ],
  },
  { timestamps: true }
);

export default model("PokeContainer", pokeContainerSchema);

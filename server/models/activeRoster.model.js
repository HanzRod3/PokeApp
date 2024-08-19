import { Schema, model } from "mongoose";

const ActiveRosterSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activePokemons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pokemon",
      },
    ],
  },
  {
    timestamps: true,
    validate: {
      validator: function (v) {
        return v.activePokemons.length <= 6;
      },
      message: "Active roster can have up to 6 Pokémon only.",
    },
  }
);

export default model("ActiveRoster", ActiveRosterSchema);

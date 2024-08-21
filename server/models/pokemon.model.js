import { Schema, model } from "mongoose";

const pokemonSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Pokémon name is required"],
    },
    pokedexNumber: {
      type: Number,
      required: [true, "Pokédex number is required"],
    },
    types: [
      {
        type: String,
        required: [true, "At least one type is required"],
      },
    ],
    moves: {
      type: Array,
      validate: {
        validator: function (v) {
          return v.length <= 4;
        },
        message: "A Pokémon can have a maximum of 4 moves",
      },
    },
    sprite: {
      type: String,
      required: [true, "Sprite URL is required"],
    },
  },
  { timestamps: true }
);

export default model("Pokemon", pokemonSchema);

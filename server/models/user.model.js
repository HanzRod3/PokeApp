import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import validator from "validator";

const { isEmail } = validator;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "That username is already taken"],
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "That email is already in use"],
      validate: [isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },
  },
  { timestamps: true }
);

// Middleware to hash password before saving
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => next(err));
});

UserSchema.plugin(mongooseUniqueValidator);

export default model("User", UserSchema);

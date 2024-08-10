import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import validator from "validator";
import bcrypt from "bcrypt";

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

// middleware
// Virtual field for confirm password
UserSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Pre-validation hook to check if passwords match
UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

// Pre-save hook to hash the password
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

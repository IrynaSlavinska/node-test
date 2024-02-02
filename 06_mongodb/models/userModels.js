import { model, Schema } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import userRoles from "../constants/userRoles.js";

const userScema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    year: Number,
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.USER,
    },
    // hidden: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// MONGOOSE HOOKS ====================================
// userScema.pre(/ ^ find /, () => console.log("All find hooks")); // спрацьовує на всіх командах, які починаються зі слова find
// userScema.pre("find", () => console.log("Find hook"));

userScema.pre("save", async function (next) {
  // стрілочна функція тут працювати не буде, треба саме таке оголошення функції, бо потрібен контекст
  // Хук спрацбовує на методах "save" & "create", тобто створення і апдейт
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);

  next();
});

// CUSTOM METHODS ====================================
userScema.methods.checkPasswod = (candidate, passwordHash) =>
  compare(candidate, passwordHash);

const User = model("User", userScema);

export default User;

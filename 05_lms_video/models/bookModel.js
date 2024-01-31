import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";
import { genreList, datePattern } from "./modelsEquip.js";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      enum: genreList,
    },
    date: {
      type: String,
      // регулярний вираз дати в форматі 10-10-2010
      match: datePattern,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.post("save", handleMongooseError);
// коли при спробі збереження сталась помилка - нехай спрацює ця міддлвара
// error - яка саме помилка сталась
// dete - дані ,які намагались передати
//  next - функція, яка передає обробку далі

export const Book = model("book", bookSchema);

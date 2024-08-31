import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

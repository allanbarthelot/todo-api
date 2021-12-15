const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  label: {
    type: String,
  },
  done: {
    type: Boolean,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  list: {
    type: mongoose.Schema.ObjectId,
    ref: "List",
  },
  tags: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Todo", todoSchema);

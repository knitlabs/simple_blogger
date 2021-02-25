const mongoose = require('../db');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  content: { type: String },
});
const Post = mongoose.model('post', postSchema);

module.exports = Post;

const express = require('express');
const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const marked = require('marked');
const cors = require('cors');

const Post = require('./models/post');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      res.status(500).json({message: 'Internal Server Error'});
    } else {
      res.json(posts)
    }
  });
});

app.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  Post.findOne({_id: postId}, (err, post) => {
    if (err) {
      res.status(404).json({message: 'Not Found!'})
    } else {
      const postInMD = {
        title: post.title,
        author: post.author,
        date: post.date,
        content: DOMPurify.sanitize(marked(post.content))
      }
      res.json(postInMD)
    }
  });
});

app.post('/posts', (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const content = req.body.content;

  Post.create({title, author, content}, (err, post) => {
    if (err) {
      res.status(500).json({message: 'Internal server error'});
    } else {
      res.redirect(`/posts/${post._id}`);
    }
  })
});

module.exports = app;

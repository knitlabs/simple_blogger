const express = require('express');
const helmet = require('helmet');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const marked = require('marked');
const cors = require('cors');

const Post = require('./models/post');

const app = express();

// app.use(helmet({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/public', express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.render('home', { posts: posts });
    }
  });
});

app.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  Post.findOne({ _id: postId }, (err, post) => {
    if (err) {
      res.status(404).send('404');
    } else {
      const postInMD = {
        title: post.title,
        author: post.author,
        date: post.date,
        content: DOMPurify.sanitize(marked(post.content))
      }
      res.render('post', { post: postInMD });
    }
  });
});

app.get('/new', (req, res) => {
  res.render('newpost');
});

app.post('/posts', (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const content = req.body.content;

  Post.create({ title, author, content }, (err, post) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.redirect(`/posts/${post._id}`);
    }
  });
});

module.exports = app;

const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Render the homepage with existing blog posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment, include: User}],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      user: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/create', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json({ message: 'Please log in to create a post' });
      return;
    }

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET route for rendering the comment page
router.get('/comment/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, include: User }],
    });
    
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = postData.get({ plain: true });

    res.render('create-comment', { post, user: req.session.user_id });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST route for creating a comment
router.post(`/comment/:id/create/`, async (req, res) => {
  try {
    console.log("Server route reached");
    const { content, postId } = req.body;

    if (!content) {
      res.status(400).json({ message: 'Comment content is required' });
      return;
    }
    
    console.log("content and postId:", content, postId);
    // Create a new comment
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: postId, // Assuming you have a postId parameter
    });

    res.redirect('/');
    console.log("comment created successfully")
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
  


module.exports = router;


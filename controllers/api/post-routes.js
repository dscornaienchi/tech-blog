const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts, user: req.session.user_id });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// View a single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: User }],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('post', { post, user: req.session.user_id });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Add routes for creating, updating, and deleting posts

module.exports = router;

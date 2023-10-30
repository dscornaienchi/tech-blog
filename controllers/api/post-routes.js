const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Add other post routes, e.g., create, update, and delete

module.exports = router;

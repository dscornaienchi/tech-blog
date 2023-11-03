const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Custom middleware to check if the user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    // If the user is not logged in, redirect to the login page with a message
    res.redirect('/login?message=Please log in to access the dashboard.');
  } else {
    next(); // If the user is logged in, proceed to the route
  }
};

// GET route for rendering the user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch the user's posts along with associated data
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }, { model: Comment }],
    });

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard, passing the user's posts
    res.render('dashboard', { posts, user: req.session.user_id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route for rendering the edit post page
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
  // Your edit post route code
});

// PUT route for updating a post
router.put('/dashboard/edit/:id', withAuth, async (req, res) => {
  // Your update post route code
});

// DELETE route for deleting a post
router.delete('/dashboard/delete/:id', withAuth, async (req, res) => {
  // Your delete post route code
});

module.exports = router;





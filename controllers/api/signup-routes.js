// In signup-routes.js
const router = require('express').Router();
const { User } = require('../../models');

// GET route for rendering the signup form
router.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup form
});

// POST route for handling user registration
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
      // Other user data fields
    });

    // Save the user's data to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      return res.redirect('/'); // Redirect to the homepage or any other desired page});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

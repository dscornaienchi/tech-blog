const router = require('express').Router();
const { User } = require('../models');

// User registration route
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'Registration successful!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Add other user routes, e.g., login and logout

module.exports = router;

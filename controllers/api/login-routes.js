const router = require('express').Router();
const { User } = require('../../models');

router.get('/login', (req, res) => {
  res.render('login', { errorMessage: req.session.errorMessage });
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      return res.redirect('/'); // Redirect back to the login page
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.redirect('/'); // Redirect back to the login page
    }

    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.logged_in = true;

    res.redirect('/'); // Redirect to the homepage or any other desired page
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;











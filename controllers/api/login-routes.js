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
      req.session.errorMessage = 'Incorrect username or password, please try again';
      return res.redirect('/login');
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      req.session.errorMessage = 'Incorrect username or password, please try again';
      return res.redirect('/login');
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.redirect('/dashboard');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;









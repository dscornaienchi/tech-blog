const router = require('express').Router();

// GET route for logging out
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Clear the session data to log the user out
    req.session.destroy(() => {
      res.status(204).end(); // 204 status indicates no content
    });
  } else {
    res.status(404).end(); // 404 status indicates not found
  }
});

module.exports = router;


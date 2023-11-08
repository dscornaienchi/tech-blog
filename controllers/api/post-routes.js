const router = require('express').Router();
const { Post } = require('../../models');

// Access the update post page 
router.get('/update/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    try {
      const postData = await Post.findByPk(req.params.id);

      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = postData.get({ plain: true });

      res.render('update-post', { post, user: req.session.user_id });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

// route for updating a post
router.put('/edit/:id', async (req, res) => {
  console.log("hello world")
  console.log(req.params)
  try {
    console.log(req.session.user_id)
    if (!req.session.user_id) {
      return res.status(401).json({ message: 'Please log in to update a post' });
    }

    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
      console.log(updatedPost)
    if (updatedPost[0] === 0) {
      return res.status(404).json({ message: 'No post found with this id' });
    }
    res.status(200).json(updatedPost);
    //res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE route for deleting a post
router.delete('/delete/:id', async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ message: 'Please log in to delete a post' });
    }

    const postId = req.params.id;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'No post found with this id' });
    }

    if (post.user_id !== req.session.user_id) {
      return res.status(403).json({ message: "You don't have permission to delete this post" });
    }

    const deletedPost = await Post.destroy({
      where: {
        id: postId,
      },
    });

    if (deletedPost) {
    } else {
      res.status(500).json({ message: 'Failed to delete the post' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;




const router = require('express').Router();
const { Post } = require('../../models');

// POST route for creating a new post
router.post('/create', async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ message: 'Please log in to create a post' });
    }

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    if (newPost) {
      res.status(200).json(newPost);
    } else {
      res.status(500).json({ message: 'Failed to create a post' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT route for updating a post
router.put('/edit/:id', async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ message: 'Please log in to update a post' });
    }

    const postId = req.params.id;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'No post found with this id' });
    }

    if (post.user_id !== req.session.user_id) {
      return res.status(403).json({ message: "You don't have permission to edit this post" });
    }

    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: postId,
        },
      }
    );

    if (updatedPost[0] === 0) {
      return res.status(404).json({ message: 'No post found with this id' });
    }

    res.status(200).json({ message: 'Post updated successfully' });
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
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(500).json({ message: 'Failed to delete the post' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;




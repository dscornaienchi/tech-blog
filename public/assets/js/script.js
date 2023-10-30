// public/assets/js/script.js

// Example: Submit a comment
document.getElementById('comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#content').value;
    const post_id = window.location.href.split('/post/')[1];
  
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload(); // Refresh the page after posting a comment
      } else {
        alert('Failed to post comment');
      }
    }
  });
  

// Example: Submit a comment
document.getElementById('create-comment-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value;

  // Extract the post ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const post_id = urlParams.get('postId'); // Assuming the URL parameter is named 'postId'

  if (content) {
    const response = await fetch(`/comment/create`, {
      method: 'POST',
      body: JSON.stringify({ content, postId: post_id }), // Use postId for consistency
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload(); // Refresh the page after posting a comment
    } else {
      alert('Failed to post comment');
    }
  }
});




  
  
  
  
  
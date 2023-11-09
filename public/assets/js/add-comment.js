
// Example: Submit a comment
document.getElementById('create-comment-form').addEventListener('submit', async (event) => {
  console.log("Form submitted");
  event.preventDefault();

  const content = document.querySelector('#comment-content').value;
  const postId = window.location.pathname.split('/').pop(); // Get the post ID from the URL

  if (content) {
    const response = await fetch(`/comment/:id/create/`, {
      method: 'POST',
      body: JSON.stringify({ content, postId: postId }), // Use postId for consistency
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.href = '/' 
    } else {
      alert('Failed to post comment');
    }
  }
});




  
  
  
  
  
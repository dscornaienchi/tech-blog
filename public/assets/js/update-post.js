document.getElementById('update-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
  
    console.log('Title:', title);
    console.log('Content:', content);
  
    if (title && content) {
      console.log('Updating Post'); 
      const response = await fetch(`/edit/7`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        alert('Failed to update post');
      }
    }
  });

  document.getElementById('update-post-form').addEventListener('delete', async (event) => {
    event.preventDefault();
    
    // Add code to confirm the delete action (e.g., using a confirmation dialog)
    const confirmDelete = confirm('Are you sure you want to delete this post?');

    if (confirmDelete) {
        const postId = event.target.getAttribute('data-id'); // Assuming you have a data-id attribute on the delete button

        const response = await fetch(`/delete/:id`, {
            method: 'DELETE',
        });

        if (response.ok) {
            window.location.href = '/dashboard'; // Redirect to the dashboard page after deleting the post
        } else {
            alert('Failed to delete post');
        }
    }
});

document.getElementById('update-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
    const queryString = window.location;
    const id = queryString.pathname.split('/').pop();

    console.log('Title:', title);
    console.log('Content:', content);
  
    if (title && content) {
      console.log('Updating Post'); 
      const response = await fetch(`/edit/${id}`, {
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

document.getElementById('deletepost').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Delete Post');

    const queryString = window.location;
    const id = queryString.pathname.split('/').pop();
    
    // Add code to confirm the delete action (e.g., using a confirmation dialog)
    const confirmDelete = confirm('Are you sure you want to delete this post?');

    if (confirmDelete) {

        const response = await fetch(`/api/delete/${id}`, {
            method: 'DELETE',
        });
        
        console.log(response);
        if (response.ok) {
            window.location.href = '/dashboard'; // Redirect to the dashboard page after deleting the post
        } else {
            alert('Failed to delete post');
        }
    }
});

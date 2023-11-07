// public/assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const toggleButton = document.getElementById('toggle-button');
  const logoutButton = document.getElementById('logout-button');

  let isLoginForm = true;

  toggleButton.addEventListener('click', function () {
    isLoginForm = !isLoginForm;

    if (isLoginForm) {
      loginForm.querySelector('h1').textContent = 'Login';
      loginForm.querySelector('button').textContent = 'Login';
      logoutButton.textContent = 'Logout';
    } else {
      loginForm.querySelector('h1').textContent = 'Sign Up';
      loginForm.querySelector('button').textContent = 'Sign Up';
      logoutButton.textContent = 'Login';
    }
  });

  // Handle the click event on the "Logout" button
  logoutButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const response = await fetch('/logout', {
      method: 'POST',
    });

    if (response.ok) {
      // Redirect to the homepage after logging out
      window.location.href = '/';
    } else {
      alert('Failed to log out');
    }
  });

  // Handle the click event on the "Create Post" button
  document.getElementById('create-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
  
    console.log('Title:', title); // Add this line
    console.log('Content:', content); // Add this line
  
    if (title && content) {
      console.log('Submitting post data...'); // Add this line
      const response = await fetch(`/api/posts/create`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('Response:', response); // Add this line
  
      if (response.ok) {
        window.location.href = '/dashboard'; // Redirect to the dashboard page
      } else {
        alert('Failed to create a new post');
      }
    }
  });

  // Handle the click event on the "Edit Post" button
  document.querySelectorAll('.edit-post').forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const postId = event.target.getAttribute('data-id');
      // Redirect to the edit post page (you need to create an edit post route)
      window.location.href = `/dashboard/edit/${postId}`;
    });
  });

  // Handle the click event on the "Delete Post" button
  document.querySelectorAll('.delete-post').forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const postId = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/delete/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the dashboard after deleting a post
        document.location.reload();
      } else {
        alert('Failed to delete the post');
      }
    });
  });

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

  // ...
});


  
  
  
  
  
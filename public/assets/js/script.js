// public/assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const toggleButton = document.getElementById('toggle-button');

  let isLoginForm = true;
  
  toggleButton.addEventListener('click', function () {
      isLoginForm = !isLoginForm;

      if (isLoginForm) {
          loginForm.querySelector('h1').textContent = 'Login';
          loginForm.querySelector('button').textContent = 'Login';
      } else {
          loginForm.querySelector('h1').textContent = 'Sign Up';
          loginForm.querySelector('button').textContent = 'Sign Up';
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
  
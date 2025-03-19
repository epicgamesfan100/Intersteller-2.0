document.getElementById('proxy-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const url = document.getElementById('url-input').value;

  // Validate URL format
  if (!isValidUrl(url)) {
    alert('Please enter a valid URL.');
    return;
  }

  // Show loading message
  document.getElementById('response-output').textContent = 'Proxying request...';

  // Send URL to the backend proxy server
  fetch('https://localhost:3000/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('response-output').textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    document.getElementById('response-output').textContent = `Error: ${error.message}`;
  });
});

function isValidUrl(url) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

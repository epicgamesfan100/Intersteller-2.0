document.getElementById('proxy-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const url = document.getElementById('url-input').value;
  
  if (!isValidUrl(url)) {
    alert('Please enter a valid URL.');
    return;
  }

  // Simulate the proxy call
  document.getElementById('response-output').textContent = `Proxying request to: ${url}`;

  // Normally here you would send a request to your server-side proxy
  // Fetch request is just an example (you need to implement your backend proxy logic)

  fetch('/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url })
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

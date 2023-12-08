function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
function getAnswer(offer, chatURL) {
  const rc = new RTCPeerConnection();
    console.log(offer);
  // Set up a data channel for communication
  rc.ondatachannel = e => {
    rc.dc = e.channel;

    // Listen for incoming messages on the data channel
    rc.dc.onmessage = e => console.log("New message from client: " + e.data);

    // Handle the event when the data channel is opened
    rc.dc.onopen = e => console.log("Connection opened!!");
  };

  // Set the remote description using the offer
  rc.setRemoteDescription(offer)
    .then(() => {
      console.log("Offer set");

      // Create an answer for the offer
      return rc.createAnswer();
    })
    .then(answer => rc.setLocalDescription(answer))
    .then(() => {
      console.log("Answer created");

      // Now, you can access the local description (answer) and send it to the server
      const newAnswer = JSON.stringify(rc.localDescription);
      console.log('New answer contains: ' + newAnswer);

      // Send the answer to the server using a POST request with a JSON payload
      return fetch(chatURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({ answer: newAnswer }),
      });
    })
    .then(response => response.json())
    .then(result => {
      console.log('Answer sent successfully:', result.message);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
    var encodedData = encodeURIComponent(newAnswer);
}

// Example usage:;
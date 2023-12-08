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

function getOffer(answer) {
console.log("answer"+"this is "+ answer);
  const lc = new RTCPeerConnection();

  // Create a data channel
  const dc = lc.createDataChannel("Channel");
  dc.onmessage = (e) => console.log("Just got a message: " + e.data);

  // Declare newoffer and use promise chaining
  let newoffer;

  lc.createOffer()
    .then((offer) => {
      return lc.setLocalDescription(offer);
    })
    .then(() => {
      // Access the local description
      const offer = JSON.stringify(lc.localDescription);
      newoffer = offer;
      console.log('newoffer contains: ' + newoffer);

      // Send the offer to the server
      return fetch(homeURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({ offer: newoffer }),
      });
    })
    .then(response => response.json())
    .then(result => {
      console.log('offer sent successfully:', result.message);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
    var encodedData = encodeURIComponent(newoffer);

   // get answer back and set Remote description
    lc.setRemoteDescription(answer);
}

// Call the function to generate the offer


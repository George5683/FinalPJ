// For the search socket button 
var socket = null;

document.getElementById('unicastcall').addEventListener('click', async () => {

  console.log("Service Call Button Pressed");

  // LED or TEMP
  let Service = document.getElementById('service').value;
  let ServiceName = document.getElementById('serviceName').value;
  let thingId = document.getElementById('thingID').value;
  let ServiceIp = document.getElementById('ServiceIp').value;
  let Input = document.getElementById('ServiceInput').value;

  const data = {
    thingId: thingId,
    ServiceName: ServiceName,
    ServiceIp: ServiceIp,
    Input : Input
  };

  try {
    const response = await fetch('/unicast', {
      method: 'PUT', // Use PUT method
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.text(); // Get response as text (for Buffer handling)
      let jsonObject;
      try {
        jsonObject = JSON.parse(responseData); // Attempt to parse JSON
      } catch (error) {
        console.error('Error parsing response:', error);
        document.getElementById("response-message").innerText = "Error parsing response";
        return;  // Exit if parsing fails
      }

      const serviceResult = jsonObject["Service Result"];
      document.getElementById("response-message").innerText = `Service Result: ${serviceResult}`;
    } else {
      console.error('Server responded with error:', response.statusText);
      document.getElementById("response-message").innerText = `Server Error: ${response.statusText}`;
    }
  } catch (error) {
    console.error('Error occurred while sending data to server:', error);
    document.getElementById("response-message").innerText = "Error sending data";
  }
});

// Function to start listening for messages from the server
function startListening() {
  // Create a new WebSocket connection to the specified IP and port
  socket = new WebSocket('ws://192.168.1.11:6888');
  console.log('Socket created and listening');

  // Listen for messages from the server
  socket.onmessage = function(event) {
    // Get the data from the message
    var data = event.data;

    //Parse the data from the message
    var jsonData = JSON.parse(data);
    console.log('Received search data:', jsonData);

    // Find the search-response div
    var searchResponse = document.getElementById('search-response');

    // Add the data to the search-response div
    searchResponse.textContent += JSON.stringify(jsonData, null, 2) + '\n';
  };

  // Handle connection errors
  socket.onerror = function(event) {
    var searchResponse = document.getElementById('search-response');
    searchResponse.textContent = 'Failed to connect. Please check the server.';
  };
}

// Function to stop listening for messages from the server
function stopListening() {
  if (socket) {
    socket.close();
    console.log('Socket closed');
    socket = null;
  }
}

// Start listening when the "Start Socket Search" button is pressed
document.getElementById('startSocketSearch').addEventListener('click', startListening);

// Stop listening when the "Stop Socket Search" button is pressed
document.getElementById('stopSocketSearch').addEventListener('click', stopListening);

// NEEDS TESTING
// // Start listening when the "Start Socket Search" button is pressed
// document.getElementById('startSocketSearch').addEventListener('click', startListening);

// // Stop listening when the "Stop Socket Search" button is pressed
// document.getElementById('stopSocketSearch').addEventListener('click', stopListening);

// // Function to start listening for messages from the server
// function startListening() {
//   // Create a new WebSocket connection to the specified IP and port
//   socket = new WebSocket('ws://192.168.1.40:6888');
//   console.log('Socket created and listening');

//   // Listen for messages from the server
//   socket.onmessage = function(event) {
//     // Get the data from the message
//     var data = event.data;

//     // Parse the data from the message
//     var jsonData = JSON.parse(data);
//     console.log('Received search data:', jsonData);

//     // Find the search-response div
//     var searchResponse = document.getElementById('search-response');

//     // **Update for Bullet Points:**
//     //   - Create a list element (LI) for each received message
//     let listItem = document.createElement('li');
//     listItem.textContent = JSON.stringify(jsonData, null, 2);  // Formatted JSON
    
//     //   - Append the list item to the search-response div
//     searchResponse.appendChild(listItem);
//   };

//   // Handle connection errors
//   socket.onerror = function(event) {
//     var searchResponse = document.getElementById('search-response');
//     searchResponse.textContent = 'Failed to connect. Please check the server.';
//   };
// }
const express = require('express');
const net = require('net');
const path = require('path');
const bodyParser = require('body-parser');
const dgram = require('dgram');

const app = express();
const port = 8000;
const staticPath = path.join(__dirname, 'public'); // Public folder for static files

let info;
let response = ''; // Initialize an empty string to store the response
let jsonObject;

let searchData;
let multicastSocket;

// Define multicast IP and port as variables (you can change these)
const MCIp = '224.0.0.1'; // Replace with actual multicast group address
const MCPort = 1235; // Replace with multicast port used

// Middleware to parse JSON bodies (npm install express body-parser)
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(staticPath));

// Only for Functions
function startMulticastListening(multicastIp, multicastPort) {
  if (!multicastIp || !multicastPort) {
    throw new Error('Missing multicast IP or port');
  }

  multicastSocket = dgram.createSocket('udp4', (message, remote) => {
    try {
      // Parse the received data as JSON (if applicable)
      const searchData = JSON.parse(message.toString());
      console.log(`Received data from ${remote.address}:${remote.port}`, searchData);
    } catch (err) {
      console.error('Failed to parse received data:', err);
    }
  });

  // Join the multicast group
  multicastSocket.joinMulticast(multicastIp, () => {
    console.log(`Listening for multicast on ${multicastIp}:${multicastPort}`);
  });

  multicastSocket.on('error', (err) => {
    console.error('Socket error:', err);
  });
}

function stopMulticastListening() {
  if (multicastSocket) {
    multicastSocket.close(); // Close the socket
    console.log('Stopped listening for multicast');
  } else {
    console.warn('Multicast listening is not started yet.');
  }
}

function sendUnicastMessage(message, ip, targetPort) {
  return new Promise((resolve, reject) => {
    console.log("sending Message");
    const client = new net.Socket();

    client.connect({ host: ip, port: targetPort }, () => {
      client.write(message);
    });

    client.on('data', (data) => {
      response = data.toString();
    });

    client.on('error', (err) => {
      reject(err);
    });

    client.on('close', () => {
      try {
        jsonObject = JSON.parse(response);
        const serviceResult = jsonObject["Service Result"];
        console.log("Service Result: ", serviceResult);
        console.log('Response received:', response);
        resolve(serviceResult);
      } catch (error) {
        reject(error);
      }
    });
  });
}

startMulticastListening(MCPort, MCIp);

app.put('/unicast', (req, res) => {
  const { thingId, ServiceName, ServiceIp, Input } = req.body; // Extract all data
  console.log("thingId,serviceName gotten in /unicast");
  console.log(Input);

  // Validate the request body (optional)
  try {
    if (!thingId || !ServiceName) {
      throw new Error('Missing required data in request body.');
    }

    // Check and assign ServiceInputs to Input
    let ServiceInput;
    if (Input && Input.trim()) {
      // ServiceInputs has content, use it
      ServiceInput = `(${Input})`;
    } 
    else {
      // ServiceInputs is empty or only whitespace, use default
      ServiceInput = "()";
    }

    const tweetType = "Service call";
    const spaceId = "Lab4";

    // Construct the message string using template literals
    const message = `
    {
      "Tweet Type": "${tweetType}",
      "Thing ID": "${thingId}",
      "Space ID": "${spaceId}",
      "Service Name": "${ServiceName}",
      "Service Inputs": "${ServiceInput}"
    }`;

    console.log('Message sent:',message);

    const targetPort = 6668;

    // Send the constructed message over the socket and wait for response
    sendUnicastMessage(message, ServiceIp, targetPort)
      .then((serviceResult) => {
        console.log('Service Result before send:', serviceResult);
        res.status(200).send(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error sending unicast call');
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending unicast call');
  }
});

// Handle any unmatched routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
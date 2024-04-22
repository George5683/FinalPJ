const express = require('express');
const net = require('net');
const path = require('path');
const bodyParser = require('body-parser');
const dgram = require('dgram');
const fs = require('fs');
const readline = require('node:readline')
const parser = require('./parsers')


const app = express();
const port = 8000;
const staticPath = path.join(__dirname, 'public'); // Public folder for static files

let info;
let response = ''; // Initialize an empty string to store the response
let jsonObject;

let searchData;
let multicastSocket;

// Line reader
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const pathSaves = __dirname + '/public/Saves/';

// Define multicast IP and port as variables (you can change these)
const MCIp = '224.0.0.1'; // Replace with actual multicast group address
const MCPort = 1235; // Replace with multicast port used

// Middleware to parse JSON bodies (npm install express body-parser)
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(staticPath));

//Contains all info about every Entity, Id, Service etc

const Connections = [];
const Things = [];
const EntityLanguages = [];
const Services = [];
const Relationships = [];
const Apps = [];
const SavedApps = [];

// Only for Functions


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

app.put("/doservice", (req, res) =>{


  let json1 = parser.ServiceCallCreator(Services, EntityLanguages, demoJson);

  console.log(json1);
  try{
    parser.ServiceRequest(json1)
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

})


app.get("/Services",(req, res) =>{
  //get json value, then push it to service array
  console.log("GET /Services");
  console.log(Services);
  res.json((Services));
})

app.get("/Things",(req, res) =>{
  //get json value, then push it to service array
  console.log("GET /Things");
  console.log(Things);
  res.json((Things));
})
app.get("/Relationships",(req, res) =>{
  //get json value, then push it to service array
  console.log("GET /Relationships");
  console.log(EntityLanguages);

  res.json((Relationships));

})

//Get Saved Files
app.get(`/Saves`, (req, res,) => {
  console.log("here is new" + SavedApps);
  res.json(JSON.stringify(SavedApps));
})

//Create Saved Files
app.put(`/Saves`,(req, res,) => {
  SaveList = "Files to Save";


  res.status(100);
})

// Handle any unmatched routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

function createFile(name){
  try{
    content = "temp stuff"
    fs.writeFile(pathSaves + name + ".txt", content, error => {
      if(error){
        console.error(error);
      }
      else{
        //write
      }
    });
  }
  catch (error) {
    console.error(error);
  }
}


function MultiConnect(){
  var MULTIPORT = 1235;
  var MCAST_ADDR = "232.1.1.1";
  var server = dgram.createSocket("udp4");
  server.bind(MULTIPORT, function(){
    server.setBroadcast(true);
    server.setMulticastTTL(128);
    server.addMembership(MCAST_ADDR);
  });



  server.on('message', function (multicastMessage,remote){
    let ParsedMessage = multicastMessage.toString();
    console.log('MCast Msg: From: ' + remote.address + ':' + remote.port +' - \n' + multicastMessage);
    ParsedMessage = ParsedMessage.replace('\"Input\"', '\\\"Input\\\"');
    ParsedMessage = ParsedMessage.replace(/\s/g, '');
    ParsedMessage = JSON.parse(ParsedMessage)
    var filter = "TweetType";
    //console.log(ParsedMessage);
    switch (ParsedMessage[filter]){

      case 'Service':
        //console.log("Services:");
        //console.log(Services);
        let newService = parser.Services(Services, ParsedMessage);
        if(newService === null){
          break;
        }
        else{
          Services.push(newService);
        }
        break;

      case "Relationship":
        //need relationships to continue
        console.log("Relationship");
        break;

      case "Identity_Thing":
        //console.log("Identity_Thing:");
        //console.log(Things);
        let newThing = parser.Things(Things, ParsedMessage);
        if(newThing === null){
          break;
        }
        else{
          Things.push(newThing);
        }
        break;

      case "Identity_Language":
        //console.log("Identity_Language");
        let entityLanguage = parser.EntityLanguage(EntityLanguages, ParsedMessage, remote.address, remote.port);
        if(entityLanguage === null){
          break;
        }
        else{
          EntityLanguages.push(entityLanguage);
        }
        break;

      case "Identity_Entity":
        //console.log("Identity_Entity:");
        //console.log(Entities);
        break;
    }
  })
}

function broadcastNew() {
  var message = new Buffer(news[Math.floor(Math.random()*news.length)]);
  server.send(message, 0, message.length, MULTIPORT,MCAST_ADDR);
  console.log("Sent " + message + " to the wire...");
}


const demoJson =
    {
      "ServiceName": "LEDChange",
      "ServiceInputs": "(1)"
    }


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  fs.readdir(pathSaves, (error, files) => {
    if(error){
      console.error("Couldn't read directory");
    }
    const Saves = files.filter(file => path.extname(file).toLowerCase() === '.txt');
    Saves.forEach(SingleSave => {
      console.log("Saved file: " + SingleSave);
      const filePath = path.join(pathSaves, SingleSave);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        SavedApps.push(JSON.parse(data));
        //console.log(JSON.parse(data));
      });

    });

  });


  MultiConnect();




/*
  rl.question(`What do you want to do? Make or Read`, option => {
    let json1 = parser.ServiceCallCreator(Services, EntityLanguages, demoJson);
    console.log(json1);
    try{
      parser.ServiceRequest(json1)
          .then((serviceResult) => {

          })
          .catch((error) => {
            console.error(error);

          });
    } catch (error) {
      console.error(error);

    }
  });
  rl.question(`What do you want to do? Make or Read`, option => {
    if(option === 'Make' || option === 'make'){
      rl.question(`Enter a file name`, name => {
        console.log(`Making ${name}`);
        createFile(name);
        rl.close();
      });
    }
    else if(option === 'Read' || option === 'read') {

    }
  });
*/

});

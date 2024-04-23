const express = require('express');
const net = require('net');
const path = require('path');
const bodyParser = require('body-parser');
const dgram = require('dgram');
const fs = require('fs');
const readline = require('node:readline')
const parser = require('./parsers')
const {AppCancel} = require("./parsers");


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
const AppName = '';
// Only for Functions

let AppInstance = null;



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

app.put(`/App-Activate`, async (req, res) => {
  console.log("-----Starting App-----");
  let AppName = req.body;
 // console.log("recieved: ");
  //console.log(AppName);

  let RunApp = await parser.AppFinder(AppName, SavedApps);
  let AppInstruction = RunApp["Instruction"];

  try{
    if(AppInstance){
      console.log("-----Already an App running-----");
      res.send('App stopped').status(240);
    }
    else{
      parser.AppAllow();
      AppInstance = parser.AppRunner(AppInstruction, Services, EntityLanguages);
      await AppInstance;
      AppInstance = null;
      console.log("-----App Complete-----");
      res.send('App stopped').status(200);
    }
  }
  catch (error){
    console.log("App Failed:"+ error);
    res.send('App stopped').status(250);
  }
})

app.put("/App-Stop",async (req, res) => {
  console.log("-----App Stop-----");
  if (AppInstance) {
    await parser.AppCancel();
    AppInstance = null;
    parser.AppAllow();
    console.log('-----App Stopped-----');
    res.send('App stopped').status(200);
  } else {
    res.send('No App is Running').status(230);
  }
})

app.put("/App-Delete",async (req, res) => {
  console.log("-----App Delete-----");
  let AppName = req.body;
  let deleted = false;
  if(Array.isArray(SavedApps)){
    for(i = 0; i < SavedApps.length; i++){
      if(SavedApps[i]["AppName"] === AppName["AppName"]){
        SavedApps.splice(i,1);
        console.log(SavedApps)
        console.log(pathSaves+`${AppName["AppName"]}.txt`);
        fs.rm(pathSaves+`${AppName["AppName"]}.txt`,(error) => {
          if(error){
            console.error("Couldn't read directory");
          }
        deleted = true;
        });
      }
    }
  }
  if(deleted){
    loadApps();
    res.json(JSON.parse("{\"Reply\": \"Deleted App\"}")).status(200);
  }
  else{
    res.json("{\"Reply\": \"App could not be found\"}").status(200);
  }
})
app.put("/App-Save",async (req, res) => {
  console.log("-----App-Save-----");
  let newApp = req.body;
  let Exists = false;
  console.log(newApp);

  if(Array.isArray(SavedApps)){
    for(i = 0; i < SavedApps.length; i++){
      if(SavedApps[i]["AppName"] === newApp["AppName"]){
        Exists = true;
        console.log("AppName in use");
      }
    }
    if(!Exists){
      SavedApps.push(newApp);
      console.log("-----Saved New App-----");
      res.json(JSON.parse("{\"Reply\": \"App Saved\"}")).status(200);
    }
    else{
      res.json("{\"Reply\": \"App could not be Saved\"}").status(200);
    }
  }

})
//Get Saved Files
app.get(`/Get-Apps`, (req, res,) => {
  console.log("-----Get Saves-----");
  loadApps();
  res.json(SavedApps);
})
app.get("/Services",(req, res) =>{
  //get json value, then push it to service array
  console.log("-----GET Services-----");
  //console.log(Services);
  res.json((Services));
})

app.get("/Things",(req, res) =>{
  //get json value, then push it to service array
  console.log("-----GET Things-----");
  //console.log(Things);
  res.json((Things));
})
app.get("/Relationships",(req, res) =>{
  //get json value, then push it to service array
  console.log("-----Get Relationships-----");
  res.json((Relationships));
})

app.put("/App-Editor",(req, res) =>{
  console.log("-----App-Editor-----");
  let AppName = req.body;
  let ReturnApp;
  let Success = false;
  if(Array.isArray(SavedApps)){
    for(i = 0; i < SavedApps.length; i++){
      if(SavedApps[i]["AppName"] === AppName["AppName"]){
        ReturnApp = SavedApps[i];
        Success = true;
        res.json(ReturnApp).status(200);
      }
    }
  }
  if(!Success){
    res.json(JSON.parse("{\"Reply\": \"Couldnt't get app\"}")).status(250);
  }
})


//Create Saved Files

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

    //console.log('MCast Msg: From: ' + remote.address + ':' + remote.port +' - \n' + multicastMessage);

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
        let newRelationship = parser.Relationships(Relationships, ParsedMessage);
        if(newRelationship === null){
          break;
        }
        else{
          Relationships.push(newRelationship);
        }
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
async function loadApps(){
  fs.readdir(pathSaves, (error, files) => {
    if(error){
      console.error("Couldn't read directory");
    }
    const Saves = files.filter(file => path.extname(file).toLowerCase() === '.txt');
    Saves.forEach(SingleSave => {
      //console.log("Saved file: " + SingleSave);
      const filePath = path.join(pathSaves, SingleSave);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);

        }
        let newSave = JSON.parse((data))
        let Addit = true;
        for(i = 0; i < SavedApps.length; i++){
          if(SavedApps[i]["AppName"] === newSave["AppName"]){
            Addit = false
          }
        }
        if(Addit){
          SavedApps.push(newSave);
          console.log("Saved file: " + SingleSave);
        }
      });
    });
  });
}


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  loadApps();
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

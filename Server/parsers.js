const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const {response} = require("express");
const net = require("net");

module.exports = {Services, Things, EntityLanguage, ServiceRequest, ServiceCallCreator};


function Services(Services, newService){
    delete newService["TweetType"];
    let isnew = true;
    let key = "Name";
    //console.log("Checking");
    //console.log(JSON.stringify(Things[0]) + " and " + newThing["ThingID"]);
    if(Array.isArray(Services)){
        for(i = 0; i < Services.length; i++){
            if(Services[i][key] === newService[key]){
                isnew = false;
            }
        }
        if (isnew){
            return newService
        }
        else {
            return null
        }
    }
    else{
        return newService
    }
}
function EntityLanguage(EntityLanguage, newEntityLanguage, address, port){
    delete newEntityLanguage["TweetType"];
    newEntityLanguage["IP"] = address;
    newEntityLanguage["Port"] = port;
    let isnew = true;
    let key = "ThingID";
    //console.log("Checking");
    //console.log(JSON.stringify(Things[0]) + " and " + newThing["ThingID"]);
    if(Array.isArray(EntityLanguage)){
        for(i = 0; i < EntityLanguage.length; i++){
            if(EntityLanguage[i][key] === newEntityLanguage[key]){
                console.log("Detected Thing");
                isnew = false;
            }
        }
        if (isnew){
            return newEntityLanguage
        }
        else {
            return null
        }
    }
    else{
        return newEntityLanguage
    }

}
function Things(Things, newThing){
    delete newThing["TweetType"];
    let isnew = true;
    let key = "Name";
    //console.log("Checking");
    //console.log(JSON.stringify(Things[0]) + " and " + newThing["ThingID"]);
    if(Array.isArray(Things)){
        for(i = 0; i < Things.length; i++){
            if(Things[i][key] === newThing[key]){
                console.log("Detected Thing");
                isnew = false;
            }
        }
        if (isnew){
            return newThing
        }
        else {
            return null
        }
    }
    else{
        return newThing
    }
}

const demoJson =
    {
        "Tweet Type": "Service call",
        "Thing ID": "led",
        "Space ID": "Lab4",
        "Service Name": "change",
        "Service Inputs": "(1)"
    }
function ServiceCallCreator(Services, Entities, request){

    let serviceCall = 'Service call';
    let thingId = '';
    let spaceId = '';
    let serviceName = 'LEDChange';
    let serviceInputs = "(1)";
    let hostIP = "";
    let targetPort = 0;

    if(Array.isArray(Services)){
        for(i = 0; i < Services.length; i++){
            if(Services[i]["Name"] === request["ServiceName"]){
                thingId = Services[i]["ThingID"];
                spaceId = Services[i]["SpaceID"]
                console.log("Found Service. Here is ThingID: " + thingId);
            }
        }
    }
    if(Array.isArray(Entities)){
        for(i = 0; i < Entities.length; i++){
            if(Entities[i]["ThingID"] === thingId){
                hostIP = Entities[i]["IP"];
                targetPort = Entities[i]["Port"]
                console.log("Found Entity. Here is IP:Port " + hostIP + ':' + targetPort);
            }
        }
    }
    return  {
        "Tweet Type": serviceCall,
        "Thing ID": thingId,
        "Space ID": spaceId,
        "Service Name": request["ServiceName"],
        "Service Inputs": request["ServiceInputs"],
        "TargetIP": hostIP,
        "TargetPort": 6668
    }
}

function ServiceRequest(requestJson){
    const{ TweetType, ThingID, SpaceID, ServiceName, ServiceInputs, TargetIP, TargetPort} = requestJson;
    let response = '';

    const message = requestJson;

    return new Promise((resolve, reject) => {
        console.log("sending Message");
        const client = new net.Socket();
        console.log(JSON.stringify(requestJson), TargetPort);
        client.connect({ host: TargetIP, port: TargetPort }, () => {
            client.write(JSON.stringify(message));
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

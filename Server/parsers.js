const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const {response} = require("express");
const net = require("net");

module.exports = {Services, Things, EntityLanguage, ServiceRequest, ServiceCallCreator, AppFinder, AppRunner, AppCancel, AppAllow};
let AllowRun = true;

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
                //console.log("Detected Thing");
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

async function ServiceRequest(requestJson){
    const{ TweetType, ThingID, SpaceID, ServiceName, ServiceInputs, TargetIP, TargetPort} = requestJson;
    let response = '';

    const message = requestJson;

    return new Promise((resolve, reject) => {
        console.log("-----Sending Service Message-----");
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
                //console.log('Response received:', response);
                resolve(serviceResult);
            } catch (error) {
                reject(error);
            }
        });
    });
}

async function AppRunner(AppInstruction, services, EntityLanguages){
    let i = 0;


    if(Array.isArray(AppInstruction)){
        for(i; i < AppInstruction.length;){
            //console.log(AppInstruction.length);
            //console.log(i);
            if(!AllowRun){
                console.log("-----App Stopping-----")
                return;
            }
            const ServiceCall =  ServiceCallCreator(services, EntityLanguages, AppInstruction[i]);
            await ServiceRequest(ServiceCall)
                .then((serviceResult) => {
                    //console.log('Service Result before send:', serviceResult);
                    i++;
                })
                .catch((error) => {
                    console.error(error);

                });
            await wait(2000);
        }
    }
}



function AppFinder(AppName, SavedApps){
    //find right app
    console.log(SavedApps);
    let AppJson;
    if(Array.isArray(SavedApps)){
        for(i = 0; i < SavedApps.length; i++){
            if(SavedApps[i]["AppName"] === AppName["AppName"]){
                AppJson = SavedApps[i];
            }
        }
    }
    return AppJson
}

async function AppCancel(){
    AllowRun = false;
    await wait(5000);
}

function AppAllow(){
    AllowRun = true;
}

setTimeout(() => {
    // Code to be executed after the wait time
    console.log('Waited for 1 second');
}, 1000);
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
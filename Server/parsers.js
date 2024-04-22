const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const {response} = require("express");

module.exports = {Services, Things, Entities};


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
function Entities(Entities, newEntity){
    delete newEntity["TweetType"];
    let isnew = true;
    let key = "ThingID";
    //console.log("Checking");
    //console.log(JSON.stringify(Things[0]) + " and " + newThing["ThingID"]);
    if(Array.isArray(Entities)){
        for(i = 0; i < Entities.length; i++){
            if(Entities[i][key] === newEntity[key]){
                console.log("Detected Thing");
                isnew = false;
            }
        }
        if (isnew){
            return newEntity
        }
        else {
            return null
        }
    }
    else{
        return newEntity
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


async function ServiceCall(){
    const demoJson =
    {
        "Tweet Type": "Service call",
        "Thing ID": "led",
        "Space ID": "Lab4",
        "Service Name": "change",
        "Service Inputs": "(1)"
    }




}

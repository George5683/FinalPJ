const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const {response} = require("express");

module.exports = {Services};


const rpitest1 = {
    "RpiIdentifier": "rPi-test",
    "ServiceName": "testservice",
    "InputParameterNumber": "0",
    "InputParameterName": "string"
}
const rpitest2 = {
    "RpiIdentifier": "rrPi-test2",
    "ServiceName": "testservice2",
    "InputParameterNumber": "0",
    "InputParameterName": "string"
}


function Services(Connections){
    Connections.push(rpitest1);
    Connections.push(rpitest2);

    var Response = [];



    return Connections
}

///<reference path="typings/references.ts" />

import fs = require("fs");
import express = require("express");
import http = require("http");

var config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

var app = express();
app.set("port", config.port);
app.get("/", function(request, response){
    response.send("hello!");
});

var server = http.createServer();
server.on('request', app);
server.listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});


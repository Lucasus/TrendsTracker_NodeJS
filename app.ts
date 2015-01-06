///<reference path="typings/references.ts" />

import express = require('express');
import http = require('http');
import path = require('path');
import fs = require('fs');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');

var favicon = require('static-favicon');
var logger = require('morgan');
var config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

var app = express();

app.configure(() =>
{
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

var routes = require('./routes');
app.get('/', routes.index);
app.get('/api/keywords', routes.keyword.list);
//function (req, res, next) {
//
//    //Todo.findById(req.params.id, function(err, todo){
//    //    if(err) res.send(err);
//    //    res.json(todo);
//    //});
//});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    (<any>err).status = 404;
    next(err);
});

/// error handlers
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;

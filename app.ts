///<reference path="typings/references.ts" />
///<reference path="routes/interfaces.ts" />

import express = require('express');
import http = require('http');
import path = require('path');
import mongoose = require('mongoose');
import fs = require('fs');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');

var models = require('./models');
var favicon = require('static-favicon');
var logger = require('morgan');
var config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
var db = mongoose.connect('mongodb://localhost/trends_tracker', {safe: true})

var app = express();

app.configure(() =>
{
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(function(req, res, next) {
        (<any>req).models = models;
        return next();
    });

    app.use((<any>favicon)());
    app.use((<any>logger)('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

var routes: tt.routes = require('./routes');
app.get('/', routes.index);
app.get('/api/keywords', routes.keyword.get);
app.get('/api/keywords/:name', routes.keyword.details);
app.post('/api/keywords', routes.keyword.add);
app.post('/api/keywords/:id', routes.keyword.edit);
app.delete('/api/keywords/:id', routes.keyword.delete);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    (<any>err).status = 404;
    next(err);
});

// error handlers
(<any>app).use(function(err, req, res, next) {
    (<any>res).render('error', {
        message: (<any>err).message,
        error: (<any>err)
    });
});

module.exports = app;

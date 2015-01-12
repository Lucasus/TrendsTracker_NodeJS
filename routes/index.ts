///<reference path="../typings/references.ts" />\
exports.keyword = require('./keyword');

/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Trends Tracker' });
};

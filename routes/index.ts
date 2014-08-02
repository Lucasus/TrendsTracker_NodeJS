///<reference path="../typings/references.ts" />

/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

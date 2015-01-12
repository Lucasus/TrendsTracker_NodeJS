///<reference path="../typings/references.ts" />

/* GET home page. */
exports.get = function(req, res, next){
  if(req.query.id)
  {
      req.models.Keyword.findById(req.query.id, function(error, keyword) {
          if (error) {
              return next(error);
          }
          res.send(keyword);
      });
  }
  else
  {
      var pageSize = 5;
      req.models.Keyword.getPage(Number(req.query.page), pageSize, req.query.searchTerm, req.query.sortType, function(error, keywords) {
          if (error) {
              return next(error);
          }
          res.send({
              items: keywords,
              searchTerm: req.query.searchTerm,
              sortType: req.query.sortType,
              pageSize: pageSize,
              page: req.query.page,
              totalRecordsCount: 8
          });
      });
  }
};

exports.details = function(req, res, next){
    req.models.Keyword.findOne({ name: req.params.name }, function(error, keyword) {
        if (error) {
            return next(error);
        }
        res.send(keyword);
    });
};

exports.create = function(req, res, next){
    var keyword = req.body;
    if (!keyword) {
        return next(new Error('No keyword payload.'));
    }
    req.models.Keyword.create(keyword, function(error, keywordResponse) {
        if (error) {
            return next(error);
        }
        res.send(keywordResponse);
    });
};

exports.edit = function(req, res, next){
    if (!req.params.id) {
        return next(new Error('No keyword ID.'));
    }
    req.models.Keyword.findById(req.params.id, function(error, keyword) {
        if (error) {
            return next(error);
        }
        keyword.update({$set: req.body}, function(error, count, raw){
            if (error) {
                return next(error);
            }
            res.send({affectedCount: count});
        })
    });
};

exports.delete = function(req, res, next){
    req.models.Keyword.findById(req.params.id, function(error, keword) {
        if (error) {
            return next(error);
        }
        if (!keword) {
            return next(new Error('article not found'));
        }
        keword.remove(function(error, doc){
            if (error) {
                return next(error);
            }
            res.send(doc);
        });
    });};




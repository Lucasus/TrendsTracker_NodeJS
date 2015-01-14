///<reference path="../typings/references.ts" />

/* GET home page. */
exports.get = function(req, res, next){
  if(req.query.id)
  {
      req.models.Keyword.findById(req.query.id).exec()
          .then(function(keyword){
              res.send(keyword);
          }).onReject(err => next(err));
  }
  else
  {
      var pageSize = 5;
      var totalKeywords;

      req.models.Keyword.getCount(req.query.searchTerm)
          .then(function(count){
              totalKeywords = count;
              return req.models.Keyword.getPage(Number(req.query.page), pageSize, req.query.searchTerm, req.query.sortColumn, req.query.sortType);
          })
          .then(function(keywords){
              res.send({
                  items: keywords,
                  searchTerm: req.query.searchTerm,
                  sortColumn: req.query.sortColumn,
                  sortType: req.query.sortType,
                  pageSize: pageSize,
                  page: req.query.page,
                  totalRecordsCount: totalKeywords
              });
          }).onReject(err => {
              next(err);
          });
  }
};

exports.details = function(req, res, next){
    req.models.Keyword.findOne({ name: req.params.name }).exec()
        .then(function(keyword){
            res.send(keyword);
        }).onReject(err => next(err))
};

exports.add = function(req, res, next){
    if (!req.body) {
        return next(new Error('No keyword payload.'));
    }
    req.models.Keyword.create(req.body).exec()
        .then(function(keyword){
            res.send(keyword);
        }).onReject(err => next(err));
};

exports.edit = function(req, res, next) {
    if (!req.params.id) {
        return next(new Error('No keyword ID.'));
    }
    req.models.Keyword.findById(req.params.id).exec()
        .then(function (keyword) {
            return keyword.update({$set: req.body}).exec();
        })
        .then(function (count) {
            res.send({affectedCount: count});
        }).onReject(err => next(err));
};

exports.delete = function(req, res, next){
    req.models.Keyword.findById(req.params.id).exec()
        .then(function(keyword){
            if (!keyword) {
                throw new Error('article not found');
            }
            return keyword.remove().exec();
        })
        .then(function(doc){
            res.send(doc);
        }).onReject(err => next(err));
};




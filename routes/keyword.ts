///<reference path="../typings/references.ts" />

/* GET home page. */
exports.list = function(req, res){
  res.send({
      items: [
        {
          "urlFriendlyName": "from nodejs",
          "name": "node js",
          "id": 3
        }],
      searchTerm: '',
      sortType: '',
      pageSize: 10,
      page: 1
    }
  );
};

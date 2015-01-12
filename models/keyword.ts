///<reference path="../typings/references.ts" />

import mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
    name: String
});

(<any>keywordSchema.static)({
    getPage: function(page, pageSize, searchTerm, sortType, callback){
        this.find({}, null, { skip: (page-1)*pageSize, limit: pageSize }, callback);
    }
})

module.exports = mongoose.model('Keyword', keywordSchema);

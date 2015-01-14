///<reference path="../typings/references.ts" />

import mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
    name: String
});

(<any>keywordSchema.static)({
    getPage: function(page, pageSize, searchTerm, sortColumn, sortType) {
        var searchParams = searchTerm ? {name: new RegExp(searchTerm, "i")} : {};
        var query = this.find(searchParams, null, { skip: (page - 1) * pageSize, limit: pageSize});
        if(sortColumn)
        {
            query = query.sort((sortType == -1 ? "-" : "") + sortColumn);
        }
        return query.exec();
    },
    getCount: function(searchTerm) {
        var searchParams = searchTerm ? {name: new RegExp(searchTerm, "i")} : {};
        return this.count(searchParams).exec();
    }
})

module.exports = mongoose.model('Keyword', keywordSchema);

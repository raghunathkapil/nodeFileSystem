var Q = require('q');
var fs = require('fs');

//empty user service object created.
var blogService = {};
blogService.readBlogsFile = readBlogsFile;
blogService.writeBlogFile = writeBlogFile;

function readBlogsFile() {
    var deferred = Q.defer();
    fs.readFile('dataObj.json', function (err, data) {
        if (err)
            deferred.reject(err);
        else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

function writeBlogFile(blogObj) {
    var deferred = Q.defer();
    fs.writeFile('dataObj.json', JSON.stringify(blogObj), function (err) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve("success");
    });
    return deferred.promise;
}

//module exports.
module.exports = blogService;
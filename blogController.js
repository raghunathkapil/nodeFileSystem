//Call the packages we need.
var express = require('express'); //call express.
var bodyParser = require('body-parser');
var fs = require('fs');
var blogService = require('./blogService');

var router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/blogs', getBlogs);
router.post('/blogs', createBlogs);
router.put('/blogs/:blogID', updateBlogs);
router.delete('/blogs/:blogID', deleteBlogs);

function getBlogs(req, res) {
    blogService.readBlogsFile()
        .then(function (blogs) {
            if (blogs) {
                res.send(JSON.parse(blogs));
            } else {
                res.sendStatus(404);
            }
        });
}

function createBlogs(req, res) {

    blogService.readBlogsFile()
        .then(function (blogs) {
            if (blogs) {
                var blogsObjects = JSON.parse(blogs);
                blogsObjects.push(req.body);
                blogService.writeBlogFile(blogsObjects)
                    .then(function (result) {
                        if (result === "success") {
                            res.send({
                                "message": "New Blog Created!"
                            });
                        } else {
                            res.sendStatus(404);
                        }
                    });
            } else {
                res.sendStatus(404);
            }
        });
}

function updateBlogs(req, res) {
    blogService.readBlogsFile()
        .then(function (blogs) {
            if (blogs) {
                var blogsObjects = JSON.parse(blogs);
                var updateBlogIndex = blogsObjects.findIndex(obj => obj.blogID === req.params.blogID);
                if (updateBlogIndex !== -1) {
                    blogsObjects[updateBlogIndex] = req.body;

                    blogService.writeBlogFile(blogsObjects)
                        .then(function (result) {
                            if (result === "success") {
                                res.send({
                                    "message": "Blog Updated!"
                                });
                            } else {
                                res.sendStatus(404);
                            }
                        });
                }
            } else {
                res.sendStatus(404);
            }
        });
}

function deleteBlogs(req, res) {
    blogService.readBlogsFile()
        .then(function (blogs) {
            if (blogs) {
                var blogsObjects = JSON.parse(blogs);
                var updateBlogIndex = blogsObjects.findIndex(obj => obj.blogID === req.params.blogID);
                if (updateBlogIndex !== -1) {
                    blogsObjects.splice(updateBlogIndex, 1);

                    blogService.writeBlogFile(blogsObjects)
                        .then(function (result) {
                            if (result === "success") {
                                res.send({
                                    "message": "Blog Deleted!"
                                });
                            } else {
                                res.sendStatus(404);
                            }
                        });
                }
            } else {
                res.sendStatus(404);
            }
        });
}

module.exports = router;

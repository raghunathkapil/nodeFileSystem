var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

app.listen('9090', function () {
    console.log("server runing on port 9090")
});

var blogController = require('./blogController');
app.use('/api', blogController);








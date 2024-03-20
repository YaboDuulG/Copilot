// Create web server
// 
// Load the http module to create an http server.
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var Comment = require('./models/comment.js');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();

// Connect to the database
mongoose.connect('mongodb://localhost/comments');

// Set up the express app
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

// Set up the router
router.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

router.get('/comments', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
});

router.post('/comments', function(req, res) {
  Comment.create({

var express = require ('express');

var server = require ('../server');

// var app = server.app;

// var connections = [];

var MongoClient = require ('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/vivante';

var io = require ('socket.io').listen(server);
// var sockets = io.connect('http://localhost:3033', {reconnect: true});

var router = express.Router();

router.get('/', function (req, res) {

    res.render('forum.html');
    // res.send(console.log('succes'));

});


// io.on('connection', function (socket) {
//
//     // var chat = db.collection('forum');
//
//     console.log('test');
//     socket.on('disconnect', function () {
//         console.log('test');
//     });

    // Handle input events
    // socket.on('input', function(data){
    //     // console.log(data);
    //     console.log('the message:' +data);
    // });

// });

// router.post('/forum', function (req, res){
//
//
//     MongoClient.connect(url, function (err, db) {
//         if (err) {
//             console.error(err.stack);
//         }
//
//     });
//
//
// });

module.exports = router;
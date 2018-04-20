
var express = require ('express');
var app = express();

var server = app.listen(process.env.PORT || 3033);
var io = require ('socket.io').listen(server).sockets;

var MongoClient = require ('mongodb').MongoClient;
var assert = require ('assert');

var url = 'mongodb://localhost:27017/vivante';



// var router = express.Router();

var bodyparser = require ('body-parser');

var fs = require ('fs');
var path = require ('path');
var consolidate = require('consolidate');

var insert = require ('./routes/insert');
var search = require ('./routes/search');
var report = require ('./routes/report');
var forum = require ('./routes/Forum');


app.engine('html', consolidate.swig);
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/insert', insert);
app.use('/search', search);
app.use('/report', report);
app.use('/forum', forum);

app.get('/home', function (request, response) {
    response.render('vivante.html');
});

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        // console.log(db);

        // db.close();

        io.on('connection', function (socket) {
            console.log('user connected');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });

            var dbse = db.collection('forum');

            dbse.find().limit(100).sort({_id:1}).toArray(function(err, res) {
                if (err) {
                    console.error('nothing');
                }

                io.emit('output', res);
                // console.log(res);
            });

                // console.log(res);
                socket.on('input', function(data){
                    console.log(data);

                    dbse.insertOne(data, function(err, result){
                        // console.log(result);
                    });
                    io.emit('input', data);

            });

        })
    });

module.exports = server;


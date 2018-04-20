var express = require ('express');
var app = express();

var router = express.Router();

var MongoClient = require ('mongodb').MongoClient;

var assert = require ('assert');

var url = 'mongodb://localhost:27017/vivante';

router.get('/', function (req, res) {
    // res.send(console.log('test'));
    res.render('report.html');
});

router.post('/report', function (req, res) {

    var data = [];

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // db.db('vivante');
        //
        // console.log("Connected correctly to server");

        var getdata = db.collection("vivtable").find();

        getdata.forEach(function (document, err) {
            assert.equal(null, err);
            data.push(document);
        }, function() {
            db.close();
            res.json(data);
        });
    });

        // res.append(getdata)

    // // console.log(data)



});

module.exports = router
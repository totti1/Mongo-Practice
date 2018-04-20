var express = require ('express');
// var app = express();

var router = express.Router();

var MongoClient = require ('mongodb').MongoClient;

var assert = require ('assert');

var url = 'mongodb://localhost:27017/vivante';

router.get('/', function (req, res) {

    res.render('search.html');
    // res.send(console.log('succes'));

});

router.post('/getsearchs', function (req, res) {

    var keyword = {amazina: req.body.search};
    var data = [];


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // db.db('vivante');
        //
        // console.log("Connected correctly to server");

        var getdata = db.collection("vivtable").find(keyword);
        //     .toArray(function (err, items) {
        //     assert.equal(null, err);
        //     // console.log(items);
        //
        //     db.close();
        //
        //     res.json(items);
        // });
        //
        // console.log(getdata);

        // console.log(getdata);

        getdata.forEach(function (document, err) {
            assert.equal(null, err);
            data.push(document);
        }, function() {
            db.close();
            res.json(data);
        });
    });

});

module.exports = router;
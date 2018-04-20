var express = require ('express');

var router = express.Router();

var MongoClient = require ('mongodb').MongoClient;

var assert = require ('assert');

var url = 'mongodb://localhost:27017/vivante';

// router.use(bodyparser.urlencoded({extended: false}));
// router.use(bodyparser.json());

router.get('/', function (request, response){

    // response.send(console.log('rendering this'));
    response.render('vivanteinsert.html');
});

router.post('/insert', function (request, response){

    var data = request.body;
    var vivdata = {
        irangamuntu : data.irangamuntu,
        amazina : data.amazina,
        igitsina : data.igitsina,
        irangamirere : data.irangamirere,
        se : data.se,
        nyina : data.nyina,
        amavuko : data.amavuko,
        yakirijwe : data.yakirijwe,
        yabatirijwe : data.yabatirijwe,
        akazi : data.akazi,
        umunyetorero : data.umunyetorero,
        amashuri : data.amashuri,
        ishami : data.ishami,
        impano : data.impano,
        telephone : data.telephone,
        email : data.email,
        akarere : data.akarere,
        umurenge : data.umurenge,
        akagari : data.akagari,
        umudugudu : data.umudugudu,
        umurimo : data.umurimo
    };
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // db.db('vivante');
        //
        // console.log("Connected correctly to server");

        db.collection("vivtable").insertOne(vivdata, function (err, result) {

           if (err){
               console.error(err.stack);
           }
            // assert.equal(null, err);
            console.log(result);
        });


        db.close();
    });
    response.redirect('/insert');

});

module.exports = router;

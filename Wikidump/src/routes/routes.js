var express = require('express');
var bodyParser = require('body-parser')

var fs = require('fs');
var mongodb = require('mongodb')

var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";
var databaseName = "";

var router = express.Router();

router.route("/").get(function (request, response) {
    // response.sendFile(__dirname + "/views/index.html");
    var data = {
        title: "Index Page",
        h1Text: "Pug index page"

    };
    response.render('index', data);

}
);
router.route("/get").post(function (req, res) {
    // response.sendFile(__dirname + "/views/index.html");
    console.log(req.body);

    (async function mongo() {
        try {
            var client = await mongoClient.connect(url);

            var db = client.db(databaseName);

            // var contactData = await db.collection("contactData").find().toArray();
            var getDate = {
                "Month": req.body.MonthTextBox,
                "Day": req.body.DayTextBox,
                "Year": req.body.YearTextBox
            }
            console.log(req.body.MonthTextBox);
            console.log(req.body.DayTextBox);
            console.log(req.body.YearTextBox);

            ISODate()

            await db.collection('TestCollection').find();
            // var item = await db.collection("items").findOne({ "item": req.params.item })
            res.redirect('/ThisDayInTime/' + req.body.MonthTextBox+"_"+req.body.DayTextBox+"_"+req.body.YearTextBox);
            // res.render("additem", model);
        } catch (err) {
            console.log("Add Item Error");
            console.log(err);
            res.json(err);
        } finally {
            client.close();
        }
    }());

}
);
router.route("/ThisDayInTime/{theDate}").get(function (request, response) {
    // response.sendFile(__dirname + "/views/index.html");
    var data = {
        title: "Index Page",
        h1Text: "Pug index page"

    };
    response.render('index', data);

}
);
module.exports = router;
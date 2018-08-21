var express = require('express');
var bodyParser = require('body-parser')

var fs = require('fs');
var mongodb = require('mongodb')

var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";
var databaseName = "TestDataBase";
var collection = "TestCollection";

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
            // console.log(req.body.MonthTextBox);
            // console.log(req.body.DayTextBox);
            // console.log(req.body.YearTextBox);

            // ISODate()

            var result = await db.collection(collection).find({"Date":{$gte: new Date(req.body.YearTextBox+"-"+req.body.MonthTextBox+"-"+req.body.DayTextBox)}}).toArray();
            // > db.TestCollection.find({"Date":{$gte: new Date("1990-01-01")}}).pretty()
            
            
            // var item = await db.collection("items").findOne({ "item": req.params.item })
            res.send(result);
            console.log(result);
            // res.redirect('/ThisDayInTime/' + req.body.MonthTextBox+"_"+req.body.DayTextBox+"_"+req.body.YearTextBox);
            // res.render("additem", model);
            console.log("No Error");
        } catch (err) {
            console.log(err);
            console.log("Error getting data")
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
    response.render('theDate', data);

}
);
module.exports = router;
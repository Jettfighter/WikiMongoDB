var express = require('express');
var fs = require('fs');
var mongoClient = require('mongodb').MongoClient;

var router = express.Router();

var url = "mongodb://localhost:27017";
var databaseName = "TestDataBase";

router.route("/loadData").get(
    function (req, res) {
        var fileData = JSON.parse(fs.readFileSync("./src/data/testData3.json", "utf8"));
        // console.log(fileData.Births);
        var timeZoneSTR = "T14:12:00Z"
        // var timeZoneSTR = "17:00:00.00";
        // console.log("Event Stuff");
        for (let index = 0; index < fileData.Events.length; index++) {
            // console.log(fileData.Events[index].Date);
            var strDate = fileData.Events[index].Date;
            var parsedDate = new Date(strDate + timeZoneSTR);
            fileData.Events[index].Date = parsedDate;
        }
        for (let index = 0; index < fileData.Births.length; index++) {
            // console.log(fileData.Births[index].Date);
            var strDate = fileData.Births[index].Date;
            var parsedDate = new Date(strDate + timeZoneSTR);
            fileData.Births[index].Date = parsedDate;
        }
        for (let index = 0; index < fileData.Deaths.length; index++) {
            // console.log(fileData.Deaths[index].Date);
            var strDate = fileData.Deaths[index].Date;
            var parsedDate = new Date(strDate + timeZoneSTR);
            fileData.Deaths[index].Date = parsedDate;
        }
        
        (async function mongo() {
            try {
                var client = await mongoClient.connect(url);
                var db = client.db(databaseName);

                var result1 = await db.collection("TestCollection").insertOne(fileData);


                // res.json(result1);
                res.send("DataLoaded");
                console.log("DataLoaded");
            } catch (err) {
                res.send(err);
                // console.log(err);
            } finally {
                client.close();
            }
        }());
    }
);

router.route("/dropData").get(
    function (req, res) {
        // var fileData = JSON.parse(fs.readFileSync("./src/data/data.json", "utf8"));
        // console.log(fileData);

        // IIFE Weirdness
        (async function mongo() {
            try {
                var client = await mongoClient.connect(url);
                var db = client.db(databaseName);

                db.dropDatabase(databaseName)

                res.send("Data dropped!");
            } catch (err) {
                res.send(err);
            } finally {
                client.close();
            }
        }());
    }
);

module.exports = router;
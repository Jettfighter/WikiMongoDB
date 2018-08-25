var express = require('express');
var fs = require('fs');
var mongoClient = require('mongodb').MongoClient;

var router = express.Router();

var url = "mongodb://localhost:27017";
// var databaseName = "ThisDayInHistory";

router.route("/loadData").get(
    function (req, res) {
        var Events = JSON.parse(fs.readFileSync("./src/data/Events.json", "utf8"));
        // var Births = JSON.parse(fs.readFileSync("./src/data/Births.json", "utf8"));
        // var Deaths = JSON.parse(fs.readFileSync("./src/data/Deaths.json", "utf8"));
        // var timeZoneSTR = "T14:12:00Z"
        console.log(Events);
        // console.log(Births);
        // console.log(Deaths);

        // for (let index = 0; index < Events.length; index++) {
        //     // console.log(fileData.Events[index].Date);
        //     var strDate = Events[index].Date;
        //     var parsedDate = new Date(strDate + timeZoneSTR);
        //     Events[index].Date = parsedDate;
        // }
        // for (let index = 0; index < Births.length; index++) {
        //     // console.log(fileData.Events[index].Date);
        //     var strDate = Births[index].Date;
        //     var parsedDate = new Date(strDate + timeZoneSTR);
        //     Births[index].Date = parsedDate;
        // }
        // for (let index = 0; index < Deaths.length; index++) {
        //     // console.log(fileData.Events[index].Date);
        //     var strDate = Deaths[index].Date;
        //     var parsedDate = new Date(strDate + timeZoneSTR);
        //     Deaths[index].Date = parsedDate;
        // }
        
        
        (async function mongo() {
            try {
                var client = await mongoClient.connect(url);
                var db = client.db(databaseName);

                // var result1 = await db.collection("TestCollection").insertOne(fileData);


                // res.json(result1);
                // res.send("DataLoaded");
                // console.log("DataLoaded");
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
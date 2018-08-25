var express = require('express');
var fs = require('fs');
var mongoClient = require('mongodb').MongoClient;

var router = express.Router();

var url = "mongodb://localhost:27017";
// var databaseName = "ThisDayInHistory";

router.route("/loadData").get(
    function (req, res) {
        // var Events = JSON.parse(fs.readFileSync("./src/data/Events.json", "utf8"));

        // console.log(Events);

        // (async function mongo() {
        //     try {
        //         var client = await mongoClient.connect(url);
        //         var db = client.db(databaseName);

        //         // var result1 = await db.collection("TestCollection").insertOne(fileData);


        //         // res.json(result1);
        //         // res.send("DataLoaded");
        //         // console.log("DataLoaded");
        //     } catch (err) {
        //         res.send(err);
        //         // console.log(err);
        //     } finally {
        //         client.close();
        //     }
        // }());
        res.send("You must use the CMD and mongoimport.exe to import data to the DB!");
    }
);

router.route("/getFile").get(function (req, res) {

    (async function mongo() {
        try {
            
            var result1 = JSON.parse(fs.readFileSync('./src/data/testData.json', 'utf8'));

            res.send(result1);
            var month;
            var day;
            var year;
            var details;
            var jsonObject = [];
            var jsonData;
            var data;

            var stream1 = fs.createWriteStream("./src/Data/Events/Events.json", { flags: 'a' });
            for (let i = 0; i < result1.data.Events.length; i++) {
                const element = result1.data.Events[i];
                // console.log(element.year)
                year = element.year;
                details = element.text;
                var date = new Date(result1.date + " " + year);
                // console.log(date.toLocaleDateString());
                date = date.toLocaleDateString();
                // console.log(date);
                jsonData = {
                    Date: date,
                    Details: details
                }
                jsonObject.push(jsonData);
                data = JSON.stringify(jsonObject);

            }

            stream1.write(data + ",");
            stream1.close();
            console.log("Imported Events Data");
            var month;
            var day;
            var year;
            var details;
            var jsonObject = [];
            var jsonData;
            var data;
            var stream2 = fs.createWriteStream("./src/Data/Births/Births.json", { flags: 'a' });
            for (let i = 0; i < result1.data.Births.length; i++) {
                const element = result1.data.Births[i];
                // console.log(element.year)
                year = element.year;
                details = element.text;
                var date = new Date(result1.date + " " + year);
                // console.log(date.toLocaleDateString());
                date = date.toLocaleDateString();
                // console.log(date);
                jsonData = {
                    Date: date,
                    Details: details
                }
                jsonObject.push(jsonData);
                data = JSON.stringify(jsonObject);

            }

            stream2.write(data + ",");
            stream2.close();
            console.log("Imported Births Data");
            var month;
            var day;
            var year;
            var details;
            var jsonObject = [];
            var jsonData;
            var data;
            var stream3 = fs.createWriteStream("./src/Data/Deaths/Deaths.json", { flags: 'a' });
            for (let i = 0; i < result1.data.Deaths.length; i++) {
                const element = result1.data.Deaths[i];
                // console.log(element.year)
                year = element.year;
                details = element.text;
                var date = new Date(result1.date + " " + year);
                // console.log(date.toLocaleDateString());
                date = date.toLocaleDateString();
                // console.log(date);
                jsonData = {
                    Date: date,
                    Details: details
                }
                jsonObject.push(jsonData);
                data = JSON.stringify(jsonObject);

            }
            stream3.write(data + ",");
            stream3.close();
            // console.log("Imported Deaths Data");
           
            // res.send("FileImported");

            console.log("No Error");
        } catch (err) {
            console.log(err);
            console.log("Error getting data")
            res.json(err);
        } finally {
            // client.close();
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
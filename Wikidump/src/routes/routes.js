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
    // console.log(req.body);

    (async function mongo() {
        try {
            var client = await mongoClient.connect(url);

            var db = client.db(databaseName);
            var month = req.body.MonthTextBox;
            var day = req.body.DayTextBox;
            var year = req.body.YearTextBox;
            
            // var result1 = await db.collection(collection).find({"Date":{$gte: new Date(year+"-"+month+"-"+day)}}).toArray();
            // var result2 = await db.collection(collection).find({"Date":{$gte: new Date(year+"-"+month+"-"+day)}});
            var result3 = await db.collection(collection).find().toArray();
            console.log("Results"+result3);
            for (let index = 0; index < result3.Events.length; index++) {
                const element = result3.Events[index];
                console.log("Element"+element);
                
            }

            // var date = result1[0].Date;
            // var dateStr = date.toString().substring(4,15);
            // console.log("Date: "+dateStr);
            // console.log("result1: " + result1[0].Date);
            // // console.log("result2: " + result2);
            // var model = {
            //     title : "This Day In History",
            //     Date : dateStr,
            //     Details : result1[0].Details
            // }
            // console.log("Modeltitle: "+model.title);
            // console.log("Modeldate: "+model.Date);
            // console.log("Modeldetails: "+model.Details);
            

            res.send(result3);
            // console.log("Result Array: "+result.Details);
            var redirectURL = "/ThisDayInTime/"+month+"/"+day+"/"+year
            // res.redirect(redirectURL);
            // res.render("template", model);
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
router.route("/ThisDayInTime/{month}/{day}/{year}").post(function (request, response) {
    // response.sendFile(__dirname + "/views/index.html");
    console.log(req);
    var data = {

    }
    response.render('theDate', data);

}
);
module.exports = router;
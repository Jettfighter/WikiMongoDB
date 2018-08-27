var express = require('express');
var bodyParser = require('body-parser')

var fs = require('fs');
var mongodb = require('mongodb')

var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";
// var databaseName = "ThisDayInHistory";
var databaseName = "test2";
var collection = "newcollection";
// var Events = "Events";

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
            var date = year+"-"+month+"-"+day;
            var details;

            var result4 = await db.collection(collection).find({Date:date}).toArray();
            console.log(result4);
            
            for (let i = 0; i < result4.length; i++) {
                const element = result4[i];
                // console.log(element.Date);
                // console.log(element.Details);
                // date = element.Date;
                // details = element.Details;
                
            }
           
            // res.send(result4);
   
            var model = {
                title : "This Day In History",
                result: result4
            }



            // var redirectURL = "/ThisDayInTime/"+month+"/"+day+"/"+year
            res.render("template", model);
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

router.route("/ThisDayInTime/{month}/{day}/{year}").post(function (request, response) {
    // response.sendFile(__dirname + "/views/index.html");
    console.log(req);
    var data = {

    }
    response.render('theDate', data);

}
);
module.exports = router;
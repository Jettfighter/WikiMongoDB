var express = require('express');
var bodyParser = require('body-parser')

var fs = require('fs');
var mongodb = require('mongodb')

var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";
// var databaseName = "ThisDayInHistory";
var databaseName = "test";
var collection = "testcollection";
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
// router.route("/get").post(function (request, response) {
//     // response.sendFile(__dirname + "/views/index.html");
//     (async function mongo() {
//         var month = request.body.MonthTextBox;
//         var day = request.body.DayTextBox;
//         var year = request.body.YearTextBox;
//         var urlStr = "http://history.muffinlabs.com/date/1/" + day;

//         response.redirect(urlStr);
//     }());


// }
// );
// router.route(urlStr).post(function (request, response) {
//     // response.sendFile(__dirname + "/views/index.html");
//     console.log(request);


// }
// );
router.route("/get").post(function (req, res) {
    // response.sendFile(__dirname + "/views/index.html");
    // console.log(req.body);

    (async function mongo() {
        try {
            // var client = await mongoClient.connect(url);

            // var db = client.db(databaseName);
            // var month = req.body.MonthTextBox;
            // var day = req.body.DayTextBox;
            // var year = req.body.YearTextBox;
            // var date = year+"-"+month+"-"+day;
            // var date = new Date(year+"-"+month+"-"+day);
            // console.log(date);
            // var date2 = new Date();
            // console.log(date2);
            
            // var result1 = await db.collection(collection).find().toArray();
            var result1 = JSON.parse(fs.readFileSync('./src/data/testData.json', 'utf8'));
            
            // var streamBirths = fs.createWriteStream("./src/Data/Births/Births.json", { flags: 'a' });
            // var streamDeaths = fs.createWriteStream("./src/Data/Deaths/Deaths.json", { flags: 'a' });
            res.send(result1);
            var month;
            var day;
            var year;
            var details;
            var jsonObject = [];
            var jsonData;
            var data;
            // console.log(result1.date);
            // console.log(date);
            // console.log(result1.data.Events);
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
                // fs.writeFileSync("./src/Data/Events/Events"+month+".json", data);
                // fs.writeFileSync("./src/Data/Births/Births"+month+".json", data);
                // fs.writeFileSync("./src/Data/Deaths/Deaths"+month+".json", data);
                // streamEvents.end();
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
                // fs.writeFileSync("./src/Data/Events/Events"+month+".json", data);
                // fs.writeFileSync("./src/Data/Births/Births"+month+".json", data);
                // fs.writeFileSync("./src/Data/Deaths/Deaths"+month+".json", data);
                // streamBirths.end();
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
                // fs.writeFileSync("./src/Data/Events/Events"+month+".json", data);
                // fs.writeFileSync("./src/Data/Births/Births"+month+".json", data);
                // fs.writeFileSync("./src/Data/Deaths/Deaths"+month+".json", data);
                // streamDeaths.end();
            }
            stream3.write(data + ",");
            stream3.close();
            console.log("Imported Deaths Data");
            
                
                
            // stream.end();
            // result1.forEach(element => {
            //     var monthDayDate = element.date;
            //     // console.log(monthDayDate);
            //     var split = element.date.split(" ");
            //     var day = split[1];
            //     var month;
            //     switch (split[0].substring(0, 3)) {
            //         case "Jan":
            //             // console.log("01 month");
            //             month = "01";
            //             break;
            //         case "Feb":
            //             month = "02";
            //             break;
            //         case "Mar":
            //             month = "03";
            //             break;
            //         case "Apr":
            //             month = "04";
            //             break;
            //         case "May":
            //             month = "05";
            //             break;
            //         case "Jun":
            //             month = "06";
            //             break;
            //         case "July":
            //             month = "07";
            //             break;
            //         case "Aug":
            //             month = "08";
            //             break;
            //         case "Sep":
            //             month = "09";
            //             break;
            //         case "Oct":
            //             month = "10";
            //             break;
            //         case "Nov":
            //             month = "11";
            //             break;
            //         case "Dec":
            //             month = "12";
            //             break;
            //     }
            //     // console.log(split);
            //     // var Events = element.data.Events;
            //     // var Events = element.data.Births;
            //     var Events = element.data.Deaths;
            //     // console.log(element.data.Events)
            //     // var jsonObject;
            //     var jsonObject = [];
            //     var jsonData;
            //     Events.forEach(nestedElement => {

            //         var year = nestedElement.year;
            //         if (year.length <4) {
            //             year = "0"+year
            //         }
            //         // console.log(month);
            //         // console.log(day);
            //         // console.log(year);
            //         var details = nestedElement.text;

            //         // jsonData = "{"+year+"-"+month+"-"+day+","+details+"}";
            //         jsonData = {
            //             Date: year+"-"+month+"-"+day,
            //             Details:details
            //         }
            //         jsonObject.push(jsonData);
            //         // console.log(jsonData);


            //         // jsonObject = {
            //         //     Date:date,
            //         //     Details:details
            //         // }
            //         // console.log(year);
            //         // console.log(nestedElement.text);
            //     });
            //     var data = JSON.stringify(jsonObject);
            //     // fs.writeFileSync("./src/Data/Events/Events"+month+day+".json", data);
            //     // fs.writeFileSync("./src/Data/Births/Births"+month+day+".json", data);
            //     fs.writeFileSync("./src/Data/Deaths/Deaths"+month+day+".json", data);
            // });
            // for (let i = 0; i < result1.length; i++) {
            //     const key = result1[i];
            //     console.log(key.date);

            // }
            // console.log(result1);
            // console.log(result1.date)
            // ollection.findOne({last_updated: new Date('2014-01-22T14:56:59.301Z')}
            // var result2 = await db.collection(collection).find({"Date":{$gte: new Date(year+"-"+month+"-"+day)}});
            // var result3 = await db.collection(collection).find({Events:date}).toArray();
            // db.getCollection('sensorevents').find({from:{$gt: new ISODate('2015-08-30 16:50:24.481Z')}})
            // console.log("Result3");
            // console.log(result3);
            // console.log("Results"+result3);
            // for (let index = 0; index < result3.Events.length; index++) {
            //     const element = result3.Events[index];
            //     console.log("Element"+element);

            // }

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


            // res.send(result3);
            // console.log("Result Array: "+result.Details);
            // var redirectURL = "/ThisDayInTime/"+month+"/"+day+"/"+year
            // res.redirect("/");
            // res.render("template", model);
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
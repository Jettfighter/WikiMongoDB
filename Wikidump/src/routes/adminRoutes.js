var express = require('express');
var fs = require('fs');
var mongoClient = require('mongodb').MongoClient;

var router = express.Router();

var url = "mongodb://localhost:27017";
var databaseName = "TestDataBase";

router.route("/loadData").get(
    function(req, res){
        var fileData = JSON.parse(fs.readFileSync("./src/data/testData.json", "utf8"));
        console.log(fileData);

        // IIFE Weirdness
        (async function mongo(){
            try{
                var client = await mongoClient.connect(url);
                var db = client.db(databaseName);
        
                var result1 = await db.collection("TestCollection").insertMany(fileData.Dates);
                
                
                res.json(result1);
                console.log(result1);
            }catch(err){
                res.send(err);
                console.log(err);
            }finally{
                client.close();
            }
        }());
    }
);

router.route("/dropData").get(
    function(req, res){
        // var fileData = JSON.parse(fs.readFileSync("./src/data/data.json", "utf8"));
        // console.log(fileData);

        // IIFE Weirdness
        (async function mongo(){
            try{
                var client = await mongoClient.connect(url);
                var db = client.db(databaseName);
        
                db.dropDatabase(databaseName)
                
                res.send("Data dropped!");
            }catch(err){
                res.send(err);
            }finally{
                client.close();
            }
        }());
    }
);

module.exports = router;
var express = require('express');
var router = require("./src/routes/routes.js")
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":true}));

app.use("/", router);
app.use(express.static(__dirname + "/public"));
var adminRoutes = require('./src/routes/adminRoutes');
app.use("/admin/", adminRoutes);


app.set('views', './src/routes/views');
app.set('view engine', 'pug');

app.listen(3000, function () {
    console.log("Express Listening on Port 3000");
});
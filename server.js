var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var db = require('./models');
var port = process.env.port || 3001;

var app = express();

// SERVER STATIC CONTENT FOT THE APP FROM THE "PUBLIC " 
//DIRECTORY IN THE APPLICATION DIRECTORY

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false}));

// override with POST having method=DELETE
app.use(methodOverride("_method"));

//vset handlebars 
var exphbs = require("express-handlebars"); 

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes and give the server acess to them

var routes = require("./controllers/burger_controller.js");

// route to home page
app.use("/", routes);

// app.use("/update", routes);
// app.use("/create", routes);

// console.log if listening on port
db.sequelize.sync().then(function(){
	app.listen(port, function() {
  		console.log("Listening on PORT " + port);
	});	
});






var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var routes = require('./routes/routes.js');
var bodyparser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get('/', routes.homeHandler);
app.post('/register', routes.registerUserHandler);

app.listen(port, function(){
  console.log("server started at port ", port);
})

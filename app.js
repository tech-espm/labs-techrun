var path = require('path');
const http = require('http');
var session = require('express-session');
const express = require('express');

var app = express();
var server = http.Server(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/main.js');
app.use('/', routes);

server.listen(process.env.PORT || 3000, process.env.IP || "10.10.34.199", function () {
    var addr = server.address();
    console.log("Connected to ", addr.address + ":" + addr.port);
});

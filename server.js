var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;


app.use(express.static('assets'))

var server = app.listen(3030);
var options = {
  debug: true
}

app.use('/peer', ExpressPeerServer(server, options));


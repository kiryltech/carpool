
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var companion = require('./routes/companion');
var driver = require('./routes/driver');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/companion/get/:companionId', companion.get);
app.get('/companion/pickMe', companion.pickMe);
app.get('/driver/registerRoute', driver.registerRoute);
app.get('/driver/pickPassenger/:routeId/:companionId', driver.pickPassenger);
app.get('/driver/route/:routeId', driver.getRoute);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

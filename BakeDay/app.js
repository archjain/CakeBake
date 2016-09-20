var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
  console.log('Looking for URL : ' + req.url);
  next();
});

// Catches the error and logs it and then continues
// down the pipeline
app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
  next();
});


/// Error handlers
// Defines a custom 404 Page and we use app.use because
// the request didn't match a route (Must follow the routes)
app.use(function(req, res) {
  // Define the content type
  res.type('text/html');

  // The default status is 200
  res.status(404);

  // Point at the 404.handlebars view
  res.render('404');
});

module.exports = app;

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});
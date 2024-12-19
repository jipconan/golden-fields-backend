var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require("dotenv").config();
require("./client/db");

var indexRouter = require('./routes/index');
var agentsRouter = require('./routes/agents');
var propertiesRouter = require('./routes/properties');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/agents', agentsRouter);
app.use('/properties', propertiesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404)); // This line needed the createError import
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Send error as JSON
    res.status(err.status || 500);
    res.json({ 
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
  });

module.exports = app;

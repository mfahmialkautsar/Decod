const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const path = require('path');

function react(res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  react(res);
});
router.get('/encode', function(req, res, next) {
  react(res);
});
router.get('/decode', function(req, res, next) {
  react(res);
});

// middleware
router.use(express.static(path.join(__dirname, '..', 'build')));

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = router;

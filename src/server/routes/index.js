const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const path = require('path');
const render = require('../render');
const template = require('../template');

// middleware
router.use(express.static(path.resolve('build/client')));

/* GET home page. */
router.get(/.*/, (req, res) => {
  const { content } = render(req.url);
  const response = template('Decod', {}, content);
  res.send(response);
});

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  next(createError(404));
});

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message);
  res.send('error');
});

module.exports = router;

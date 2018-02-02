var express = require('express');
var multiplexer = require('./private/api/request_multiplexer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('adventure', { title: 'Storied' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET "/" page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ITGAM' ,author: 'David I. González'});
});

module.exports = router;

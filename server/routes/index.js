var express = require('express');
var router = express.Router();

/* GET "/" page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Instituto Tecnologíco Gustavo A. Madero' ,author: 'David Israel González Osorio 🤠'});
});

module.exports = router;

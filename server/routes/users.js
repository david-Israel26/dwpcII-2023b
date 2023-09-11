var express = require('express');
var router = express.Router();

//Primero se activa usersRouter con la peticion /users
/* GET /users */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET /users/author
router.get('/author', function(_, res) {
  //Mandando a llamar a la vista author
  res.render('author', {Author: 'David González'});
});


module.exports = router;

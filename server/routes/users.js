const express = require('express');

const router = express.Router();

//  Primero se activa usersRouter con la peticion /users
/* GET /users */
router.get('/', (res) => {
  res.send('respond with a resource');
});

//  GET /users/author
router.get('/author', (_, res) => {
  //  Mandando a llamar a la vista author
  res.render('author', {
    Author: 'David González',
  });
});

module.exports = router;

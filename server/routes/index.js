const express = require('express');

const router = express.Router();

/* GET "/" page */
router.get('/', (res) => {
  res.render('index', {
    title: 'Instituto Tecnologíco Gustavo A. Madero',
    author: 'David Israel González Osorio 🤠',
  });
});

module.exports = router;

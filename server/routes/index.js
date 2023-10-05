import express from 'express';

const router = express.Router();
/* GET (recurso raiz) */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Instituto Tecnologico Gustavo A. Madero',
    author: 'David Israel Gonzalez Osorio',
  }); /// render trae las vista y contesta con un html
});

export default router;

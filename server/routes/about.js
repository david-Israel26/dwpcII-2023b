//Importando elementos express y router
var express = require('express');
var router = express.Router();

//Creando respuesta about tec
router.get('/tec',function(_,response)
{
    //Mandando a llamar a la vista
    response.render('aboutTec')
});

//Creando respuesta sobre la api
router.get('/api/tec',function(_,response)
{
    response.json({
        name:"Instituto Tecnologico Gustavo A. Madero",
        description: "The National Technological Institute of Mexico is a Mexican public university system created on 23 July 2014 by presidential decree.",
        missions: "Coadyuvar a la formación integral del ser humano para el desarrollo de una sociedad justa y equitativa.",
        values: "Espíritu de servicio, Liderazgo, Trabajo en equipo, Calidad, Equidad, Identida, Sustentabilidad",
        image: "https://i.ibb.co/fHkdP7f/tec1.jpg"
    });
});

module.exports = router;
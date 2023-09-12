//Importando elementos express y router
var express = require('express');
var router = express.Router();

//Array de imagenes
var arrayImagenes = new Array();
arrayImagenes[0] = 'https://i.ibb.co/fHkdP7f/tec1.jpg';
arrayImagenes[1] = 'https://i.ibb.co/CP0bS42/tec2.jpg';
arrayImagenes[2] = 'https://fastly.4sqi.net/img/general/600x600/85150350_-6JWL7z9d3PUPBOgjMkF-Ewj-uZQsPlTiG0FgRYbT3o.jpg';

//Variable JSON
var infoJSON =  {name:"Instituto Tecnologico Gustavo A. Madero",
description: "El Tecnológico Nacional de México (TecNM) es una Institución de Educación Superior Tecnológica, órgano desconcentrado de la Secretaria de Educación Pública (SEP), que fue creada por decreto presidencial el 23 de julio de 2014. El Instituto Tecnológico de Gustavo A. Madero es uno de los 254 institutos y centros ubicados en todo el país, que tiene presencia en más de 600 localidades, en los 32 estados de todo el país. El Instituto Tecnológico de Gustavo A. Madero fue creado el 2 de septiembre del 2009 con una matrícula inicial de 157 estudiantes en las carreras de Ingeniería en Tecnologías de la Información y Comunicaciones e Ingeniería en Gestión Empresarial.El Instituto fue creado para formar profesionistas capaces de enlazar exitosamente a México con el mundo, a fin de propiciar el desarrollo tecnológico en distintas áreas en beneficio del ser humano, concentrado en planes y programas de estudio congruentes con la realidad del país, apegados a los estándares de calidad tanto nacionales como internacionales de las diversas disciplinas que se imparten en el tecnológico, para dar respuesta a la cobertura, pertinencia y calidad con vocación de servicio y contribuir con los sectores estratégicos para el desarrollo del país, sobretodo en el agroindustrial, aeroespacial, energético, ambiental así como en las tecnologías de la información y comunicaciones.",
missions: "“Formar con responsabilidad y excelencia a profesionistas capaces de enfrentar y resolver los retos que se presentan en el ámbito nacional e internacional.”",
values: "Respeto, Liderazgo, Perseverancia, Responsabilidad",
image: "https://i.ibb.co/CP0bS42/tec2.jpg"}

//Creando respuesta about tec
router.get('/tec',function(_,response)
{
    //Cada vez que la pagina se cargue, randonNumImage obtiene una lo que es el link de un elemento en el array
    var randomNumImage = arrayImagenes[Math.floor(Math.random() * arrayImagenes.length)];
    //Mandando a llamar a la vista aboutTec y usando las propiedades de handlebars se pasan los valores desde el json exceptuando
    //imagen la cual se obtiene de la variable randomNumImage
    response.render('aboutTec', {name:infoJSON.name,
        description:infoJSON.description,
        missions:infoJSON.missions,
        values:infoJSON.values,
        imagen:randomNumImage});
});

//Creando respuesta sobre la api
router.get('/api/tec',function(_,response)
{
    response.json(infoJSON);
});

module.exports = router;
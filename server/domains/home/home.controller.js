// Metodos de accion
// GET "/"
// GET "index"
const home = (request, response) => {
  const iconSet = ['🐤', '🤓', '🍇'];
  const icon = iconSet[Math.floor(Math.random() * 3)];
  response.render('index', {
    title: 'ProjNotes',
    icon,
    author: 'David Israel Gonzalez Osorio',
  });
};

// GET /about
const about = (request, response) => {
  response.send('🏗️ Pagina de About en construcción 👨‍🦱');
};

// Controlador Home
export default {
  home,
  about,
};

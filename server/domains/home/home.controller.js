// Metodos de accion
// GET "/"
// GET "index"
const home = (request, response) => {
  const iconSet = ['🐤', '🤓', '🍇','🐈','🐶'];
  const icon = iconSet[Math.floor(Math.random() * 3)];
  response.render('home/homeView', { icon });
};

// GET /about
const about = (request, response) => {
  response.render('home/aboutView', { appVersion: '1.0.0'});
};

// Controlador Home
export default {
  home,
  about,
};

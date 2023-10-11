// Metodos de accion
// GET "/"
// GET "index"
const home = (request, response) => {
  const iconSet = ['🐤', '🤓', '🍇'];
  const icon = iconSet[Math.floor(Math.random() * 3)];
  response.render('index', {
    title: 'DWPC II-2023',
    icon,
    author: 'David Israel Gonzalez Osorio',
  });
};

// Controlador Home
export default {
  home,
};

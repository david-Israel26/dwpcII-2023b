// Metodos de accion
// GET project/dashboard
const showDashboard = (request, response) => {
  response.send('🏗️ En construccion rutas para mostrar proyectos');
};

// GET project/add
const add = (request, response) => {
  response.render('project/addView');
};

// Consultando POST /project/add
const addPost = (request, response) => {
  // Extrayendo la informacion del formulario
  // Request body - Viene de dos middleware en app.js lo cual rescata los
  // elementos del body del formulario
  const { name, description } = request.body;
  // Regresando al cliente la informacion recabada
  response.status(200).json({
    name,
    description,
  });
};

// Controlador User
export default {
  // Action Methods
  showDashboard,
  add,
  addPost,
};

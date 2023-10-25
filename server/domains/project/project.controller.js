// Metodos de accion
// GET project/dashboard
const showDashboard = (request, response) => {
  response.send('🏗️ En construccion rutas para mostrar proyectos');
};
// GET project/add-form
const addForm = (request, response) => {
  response.send('🏗️ En construccion rutas para añadir projectos');
};

// Controlador Home
export default {
  showDashboard,
  addForm,
};

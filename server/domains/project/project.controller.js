// Metodos de accion
// GET project/dashboard
const showDashboard = (request, response) => {
  response.send('🏗️ En construccion rutas para mostrar proyectos');
};
// GET project/add-form
const addForm = (request, response) => {
  response.render('project/addView');
};
// Controlador Home
export default {
  showDashboard,
  addForm,
};

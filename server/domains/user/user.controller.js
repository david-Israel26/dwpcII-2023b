// Importando el logger de winston
import log from '../../config/winston';

// Metodos de accion
// GET "user/login"
const login = (request, response) => {
  log.info('Sirviendo el formulario de login');
  response.render('user/login');
};

// GET "user/logout"
const logout = (request, response) => {
  response.send("👍CHAMBEANDO EN ESTA RUTA '/user/logout' 🍻");
};
// GET "user/register"
const register = (request, response) => {
  log.info('Enviando el formulario de registro');
  response.render('user/register');
};

// Estableciendo el metodo POST para registros
const registerPost = (request, response) => {
  const { validData, errorData } = request;
  log.info('Se procesa el formulario de registro');
  response.json({
    validData,
    errorData,
  });
};

// Controlador Login
export default {
  login,
  logout,
  register,
  registerPost,
};

// Metodos de accion
// GET "user/login"
const login = (request, response) => {
  response.send("👍CHAMBEANDO EN ESTA RUTA '/user/login' 🍻");
};
// GET "user/logout"
const logout = (request, response) => {
  response.send("👍CHAMBEANDO EN ESTA RUTA '/user/logout' 🍻");
};
// GET "user/register"
const register = (request, response) => {
  response.send("👍CHAMBEANDO EN ESTA RUTA '/user/register' 🍻");
};
// Controlador Login
export default {
  login,
  logout,
  register,
};

// Importando el router de express
import { Router } from 'express';

// Importando el controlador
// Renombrar el simbolo con F2
import userController from './user.controller';

// Importando el validador de usuario
import userValidator from './user.validator';

// Importando ValidateFactory
import ValidateFactory from '../../services/validateFactory';

// Creando una instancia en el enrutador
const router = new Router();

// Enrutamos
// GET Lo siguiente accede a "/user/login"
router.get(['/login'], userController.login);

// GET "/user/logout"
router.get(['/logout'], userController.logout);

// GET "/user/register"
router.get(['/register'], userController.register);

// Ruta para el POST de usuarios
router.post(
  '/register',
  ValidateFactory(userValidator.signUp),
  userController.registerPost
);

// Exportar el tramo de ruta
export default router;

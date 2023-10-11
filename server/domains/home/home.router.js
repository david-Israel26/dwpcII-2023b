// Importando el router de express
import { Router } from 'express';

// Importando el controlador
import homeController from './home.controller';

// Creando una instancia en el enrutador
const router = new Router();

// Enrutamos
// GET "/"
// GET "/home"
// GET "/index"
router.get(['/', '/home', '/index'], homeController.home);

// Exportar el tramo de ruta
export default router;

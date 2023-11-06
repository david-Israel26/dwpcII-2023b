// Importando el router de express
import { Router } from 'express';

// Importando el controlador
import projectController from './project.controller';

// Creando una instancia en el enrutador
const router = new Router();

// Enrutamos
// GET /project
router.get(['/'], projectController.showDashboard);

// GET /project/add
router.get(['/add'], projectController.add);

// POST /project/add
router.post('/add', projectController.addPost);

// GET /project/projects
router.get(['/projects'], projectController.showDashboard);

// Exportar el tramo de ruta
export default router;

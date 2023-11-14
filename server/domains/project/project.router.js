// Importando el router de express
import { Router } from 'express';

// Importando el controlador
import projectController from './project.controller';

// Importando factory de validacion
import ValidateFactory from '../../services/validateFactory';

// Importando el validador de proyectos
import projectValidator from './project.validator';

// Creando una instancia en el enrutador
const router = new Router();

// Enrutamos
// GET /project
router.get(['/'], projectController.showDashboard);

// GET /project/add
router.get(['/add'], projectController.add);

// POST /project/add
// Post middleware de validacion
router.post(
  '/add',
  ValidateFactory({
    schema: projectValidator.projectSchema,
    getObject: projectValidator.getProject,
  }),
  projectController.addPost
);

// GET /project/projects
router.get(['/projects'], projectController.showDashboard);

// Exportar el tramo de ruta
export default router;

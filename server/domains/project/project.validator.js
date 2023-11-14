// Importando TODO de un objeto
import * as Yup from 'yup';

// Creando un esquema de validacion que solo sea un objeto
// Esquema para los dos campos name y description
// Reglas de validacion
const projectSchema = Yup.object().shape({
  // Requerir que el campo tenga valor
  name: Yup.string().required('Se requiere un nombre de proyecto'),
  // Maximo de 500 caracteres y elemento requerido que tenga valor
  description: Yup.string()
    .max(500, 'La descripción no debe tener mas de 500 caracteres!')
    .required('Se requiere una descripción de proyecto'),
});

// Middleware de extracción o desestructuracion de los datos name
// y description
const getProject = (request) => {
  // Extrayendo datos de la petición
  const { name, description } = request.body;
  // Regresando el objeto del proyecto
  return {
    name,
    description,
  };
};

// Exportando por defecto los dos elementos
// Esquema y funcion
export default {
  projectSchema,
  getProject,
};

// Variables de entorno Importando el DotEnv
const dotenv = require('dotenv');

// Invocación a la funcion config de la instancia
// dotenv - En caso de no encontrarse se genera una falla silenciosa
dotenv.config();
// Imprimiendo varible de entorno
console.log(process.env.PORT);

// Creando objetos de configuración
const defaultConfig = {
  PORT: process.env.PORT || 3000,
  IP: process.env.IP || '0.0.0.0',
};

const devConfig = {
  CONFIG_VALUE: 100,
};

const testConfig = {
  CONFIG_VALUE: 200,
};

const prodConfig = {
  CONFIG_VALUE: 300,
};

// Creando una funcion
function getEnvConfig(env) {
  switch (env) {
    case 'production':
      return prodConfig;
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      break;
  }
  return {};
}

// Exportando el objeto de configuracion
export default {
  // Spread defaultConfig
  ...defaultConfig,
  ...getEnvConfig(process.env.NODE_ENV),
};

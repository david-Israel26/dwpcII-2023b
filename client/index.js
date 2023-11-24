// cargando los estilos
import './styles/style.css';

// Importando los estilos de Materialize CSS
import 'materialize-css/dist/css/materialize.css';

// Importando los scripts de Materialize
import 'materialize-css/dist/js/materialize';

// Importando script para borrar projectos
import deleteProject from '../server/domains/project/project.dashboard';

// Iniciando scripts para interactividad
M.AutoInit();

// Cargando script en caso de que la URL sea '/project/dashboard'
if (window.location.pathname === '/project/showDashboard') {
  window.deleteProject = deleteProject;
}

//  Mensaje en la consola
//  eslint-disable-next-line no-console
console.log('🎉 Estilos cargados correctamente 🎉');

import * as Yup from 'yup';

// Creando un esquema de validacion
const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Se require un nombre'),
  lastname: Yup.string().required('Se requiere un apellido'),
  mail: Yup.string().email().required('Se requiere un correo electronico'),
  password: Yup.string()
    .min(6)
    .required('Se requiere una contraseña mayor de 6 caracteres'),
  cpassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Las contraseñas no coinciden'
  ),
});

// Responsable de extraer los datos de registro
const signUpGetter = (request) => {
  // Desestructurando la informacion - request.body solicitar los elementos del documento HTML
  const { firstName, lastname, mail, password, cpassword } = request.body;
  // Se regresa el objeto signup
  return {
    firstName,
    lastname,
    mail,
    password,
    cpassword,
  };
};

const signUp = {
  schema: signUpSchema,
  getObject: signUpGetter,
};

export default { signUp };

// Importando Mongoose
import mongoose from 'mongoose';
// Al terminar la validacion del correo
// Se valida el password - npm i validator@13.11.0
import validator from 'validator';
// Al terminar de agregar el timestamp se importa
// la encriptacion de la contraseña con bcrypt (npm install bcrypt)
import bcrypt from 'bcrypt';
// Al terminar la encriptacion se genera el token de confirmacion
import crypto from 'crypto';
// Desestructurando la funcion Schema
const { Schema } = mongoose;
// Creando el esquema
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastname: { type: String, required: true },
    // Custom validator de mongoose - Email
    mail: {
      type: String,
      unique: true,
      required: [true, 'Es necesario ingresar email'],
      // Propiedad validate para validador personalizado
      validate: {
        validator(mail) {
          // eslint-disable-next-line no-useless-escape
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(mail);
        },
        message: `{VALUE} no es un email valido`,
      },
    },
    password: {
      type: String,
      required: [true, 'Es necesario ingresar una contraseña'],
      trim: true,
      minLength: [6, 'La contraseña debe ser mayor a los 6 caracteres'],
      validate: {
        validator(password) {
          if (process.env.NODE_ENV === 'development') {
            return true;
          }
          return validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
          });
        },
        message: 'Es necesario ingresar una contraseña "fuerte"',
      },
    },
    emailConfirmationToken: String,
    emailConfirmationAt: Date,
  },
  // Marca de tiempo - Se agregan dos propiedades
  // createdAt: fecha de creacion del documento - updatedAt: actualizacion del documento
  { timestamps: true }
);

// Metodos de instancia
UserSchema.methods = {
  // Metodo para encriptar la contraseña
  hashPassword() {
    return bcrypt.hashSync(this.password, 10);
  },
  // Generacion de un token con crypto
  generateConfirmationToken() {
    return crypto.randomBytes(64).toString('hex');
  },
};

// Finalmente se crea un Hook (Ejecucion de operaciones antes/despues de que un elemento
// sea eliminado o guardado)
// Encriptacion de la contraseña antes de guardar en la coleccion
UserSchema.pre('save', function presave(next) {
  // Encripta la contraseña
  if (this.isModified('password')) {
    this.password = this.hashPassword();
  }
  return next();
});

// Compilando el modelo y exportandolo
export default mongoose.model('user', UserSchema);

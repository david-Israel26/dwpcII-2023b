// Importando mongoose
import mongoose from 'mongoose';
// Desestructurando la funcion Schema
// Extraer una funcion, variable, entidad de un codigo nombrando
const { Schema } = mongoose;

// Construyendo un esquema (elemento que describe la forma de mis datos)
// Lo que relaciona a schema va como la constante definida.
// Un Schema toma un objeto vacio ( {} )
const ProjectSchema = new Schema({
  // Elementos de mi documento
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Compilando el Schema para generar un modelo
// mongoose usara una funcion donde recibira un nombre del modelo
// como segundo parametro recibira un Schema
export default mongoose.model('project', ProjectSchema);

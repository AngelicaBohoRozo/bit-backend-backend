import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  frecuencia: {
  type: String,
  enum: ['Diario', 'Semanal', 'Mensual'],
  required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
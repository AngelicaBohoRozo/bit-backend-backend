import Habit from '../models/Habit.js';

export const registrarHabito = async (req, res) => {
  try {
    const { nombre, categoria, frecuencia } = req.body;

    if (!nombre || !categoria || !frecuencia) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevoHabito = new Habit({
      nombre,
      categoria,
      frecuencia,
      usuario: req.usuario.id, // Este valor viene del middleware de autenticación
    });

    await nuevoHabito.save();
    res.status(201).json(nuevoHabito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar hábito' });
  }
};
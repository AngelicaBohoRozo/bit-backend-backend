import express from 'express';
import Habit from '../models/habitModel.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('req.usuario:', req.usuario);

    const { nombre, categoria, descripcion, frecuencia } = req.body;

    // Validación
    if (!nombre || !categoria || !frecuencia) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Crear nuevo hábito
    const nuevoHabito = new Habit({
      nombre,
      categoria,
      descripcion,
      frecuencia,
      usuario: req.usuario._id
    });

    const habitGuardado = await nuevoHabito.save();
    res.status(201).json(habitGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar hábito' });
  }
});

export default router;
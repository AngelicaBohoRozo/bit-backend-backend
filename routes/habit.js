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

// ... rutas existentes

// 🟢 Ruta GET para obtener los hábitos del usuario autenticado
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.usuario._id;

    const habitos = await Habit.find({ usuario: userId });
    res.status(200).json(habitos);
  } catch (error) {
    console.error('Error al obtener hábitos:', error);
    res.status(500).json({ message: 'Error al obtener hábitos' });
  }
});

// Obtener hábitos del usuario autenticado
router.get('/', authMiddleware, async (req, res) => {
  try {
    const habitos = await Habit.find({ usuario: req.usuario._id }).sort({ creadoEn: -1 });
    res.json(habitos);
  } catch (error) {
    console.error('Error al obtener hábitos:', error);
    res.status(500).json({ message: 'Error al obtener los hábitos' });
  }
});

export default router;


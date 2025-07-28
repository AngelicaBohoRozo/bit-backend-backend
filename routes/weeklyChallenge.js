import express from 'express';
import WeeklyChallenge from '../models/weeklyChallengeModel.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Obtener solo los retos activos de la semana (sin autenticación)
router.get('/active', async (req, res) => {
  try {
    const today = new Date();
    const activeChallenges = await WeeklyChallenge.find({
      startDate: { $lte: today },
      endDate: { $gte: today },
    });

    res.json(activeChallenges);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener retos activos', error });
  }
});

// Crear un nuevo reto semanal (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    const newChallenge = new WeeklyChallenge({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId: req.user._id,
    });

    const savedChallenge = await newChallenge.save();
    res.status(201).json(savedChallenge);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear reto semanal', error });
  }
});

// Obtener retos del usuario filtrados por estado (completado o no)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = { userId: req.user._id };

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    const challenges = await WeeklyChallenge.find(filter);
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los retos', error });
  }
});

// Marcar un reto como completado
router.put('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const challenge = await WeeklyChallenge.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Reto no encontrado' });
    }

    challenge.completed = true;
    await challenge.save();

    res.json({ message: 'Reto marcado como completado', challenge });
  } catch (error) {
    res.status(500).json({ message: 'Error al marcar el reto', error });
  }
});

// Desmarcar un reto como completado
router.put('/:id/uncomplete', authMiddleware, async (req, res) => {
  try {
    const challenge = await WeeklyChallenge.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Reto no encontrado' });
    }

    challenge.completed = false;
    await challenge.save();

    res.json({ message: 'Reto desmarcado como completado', challenge });
  } catch (error) {
    res.status(500).json({ message: 'Error al desmarcar el reto', error });
  }
});

// Obtener el progreso del usuario en porcentaje
router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await WeeklyChallenge.countDocuments({ userId });
    const completed = await WeeklyChallenge.countDocuments({ userId, completed: true });

    const progressPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({
      total,
      completed,
      progressPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al calcular progreso', error });
  }
});

export default router;
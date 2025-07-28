const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');

//  Crear un hábito
router.post('/', async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear el hábito', details: error.message });
  }
});

// Obtener todos los hábitos
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los hábitos', details: error.message });
  }
});

//  Actualizar un hábito por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar el hábito', details: error.message });
  }
});

//  Eliminar un hábito por ID
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hábito eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el hábito', details: error.message });
  }
});


// GET /api/habits
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 
    const habits = await Habit.find({ userId }); // Solo los del usuario autenticado
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los hábitos' });
  }
});

module.exports = router;
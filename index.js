// 1️⃣ Cargar variables de entorno ANTES de leer process.env
import dotenv from 'dotenv';
dotenv.config();

console.log('JWT_SECRET:', process.env.JWT_SECRET); 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// 2️⃣ Importar routers
import userRoutes from './routes/user.js';
import weeklyChallengeRoutes from './routes/weeklyChallenge.js';
import habitRoutes from './routes/habit.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Servidor API EcoTrack funcionando');
});

// 3️⃣ Middlewares globales
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

// 4️⃣ Rutas
app.use('/api/users', userRoutes);
app.use('/api/weekly-challenges', weeklyChallengeRoutes);
app.use('/api/habits', habitRoutes);

// 5️⃣ Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

console.log('⏳ Intentando conectar a MongoDB…');

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);


  app.get('/ping', (req, res) => {
  if (mongoose.connection.readyState === 1) { 
    res.status(200).send('✅ MongoDB está conectado');
  } else {
    res.status(500).send('❌ MongoDB no está conectado');
  }
});
  });